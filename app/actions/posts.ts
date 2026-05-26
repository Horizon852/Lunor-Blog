'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { PostCategory } from '@/types/database';

export async function createPost(formData: FormData) {
  try {
    const supabase = await createClient();
    
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const location = formData.get('location') as string;
    const category = formData.get('category') as PostCategory;
    const coverImage = formData.get('coverImage') as File;
    const coverImageFileName = formData.get('coverImageFileName') as string;
    const coverImagePath = formData.get('coverImagePath') as string;

    if (!title || !content || !location || !category) {
      throw new Error('Missing required fields');
    }

    const { data: post, error: postError } = await supabase
      .from('posts')
      .insert({
        user_id: user.id,
        title,
        content,
        location,
        category,
        cover_image_url: coverImageFileName,
        cover_image_path: coverImagePath,
      })
      .select()
      .single();

    if (postError) throw postError;

    revalidatePath('/');
    revalidatePath('/create');

    return { success: true, post };
  } catch (error) {
    console.error('Error creating post:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to create post' };
  }
}

export async function deletePost(postId: string) {
  try {
    const supabase = await createClient();
    
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    // First, get the post to check ownership and get image path
    const { data: post, error: fetchError } = await supabase
      .from('posts')
      .select('*')
      .eq('id', postId)
      .single();

    if (fetchError) throw fetchError;
    if (post.user_id !== user.id) {
      throw new Error('You can only delete your own posts');
    }

    // Delete the image from storage if it exists
    if (post.cover_image_path) {
      const { error: storageError } = await supabase
        .storage
        .from('travel_images')
        .remove([post.cover_image_path]);

      if (storageError) {
        console.error('Error deleting image from storage:', storageError);
      }
    }

    // Delete the post
    const { error: deleteError } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId);

    if (deleteError) throw deleteError;

    revalidatePath('/');
    revalidatePath(`/post/${postId}`);

    return { success: true };
  } catch (error) {
    console.error('Error deleting post:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to delete post' };
  }
}

export async function uploadImage(file: File): Promise<{ success: boolean; path?: string; fileName?: string; error?: string }> {
  try {
    const supabase = await createClient();
    
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    const { error: uploadError } = await supabase
      .storage
      .from('travel_images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase
      .storage
      .from('travel_images')
      .getPublicUrl(filePath);

    return { success: true, path: filePath, fileName: publicUrl };
  } catch (error) {
    console.error('Error uploading image:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to upload image' };
  }
}
