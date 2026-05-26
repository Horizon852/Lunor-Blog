'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function createComment(formData: FormData) {
  try {
    const supabase = await createClient();
    
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const postId = formData.get('postId') as string;
    const content = formData.get('content') as string;

    if (!postId || !content) {
      throw new Error('Missing required fields');
    }

    const { data: comment, error: commentError } = await supabase
      .from('comments')
      .insert({
        post_id: postId,
        user_id: user.id,
        content,
      })
      .select(`
        *,
        profiles (
          id,
          username,
          full_name,
          avatar_url
        )
      `)
      .single();

    if (commentError) throw commentError;

    revalidatePath(`/post/${postId}`);

    return { success: true, comment };
  } catch (error) {
    console.error('Error creating comment:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to create comment' };
  }
}

export async function deleteComment(commentId: string, postId: string) {
  try {
    const supabase = await createClient();
    
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    // First, get the comment to check ownership
    const { data: comment, error: fetchError } = await supabase
      .from('comments')
      .select('*')
      .eq('id', commentId)
      .single();

    if (fetchError) throw fetchError;
    if (comment.user_id !== user.id) {
      throw new Error('You can only delete your own comments');
    }

    // Delete the comment
    const { error: deleteError } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);

    if (deleteError) throw deleteError;

    revalidatePath(`/post/${postId}`);

    return { success: true };
  } catch (error) {
    console.error('Error deleting comment:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to delete comment' };
  }
}
