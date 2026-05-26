'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { deletePost } from '@/app/actions/posts';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Trash2, Loader2 } from 'lucide-react';

interface DeletePostButtonProps {
  postId: string;
  userId: string;
}

export default function DeletePostButton({ postId, userId }: DeletePostButtonProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ id: string } | null>(null);

  useState(() => {
    const loadCurrentUser = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setCurrentUser({ id: user.id });
        }
      } catch (error) {
        console.error('Error loading current user:', error);
      }
    };
    loadCurrentUser();
  });

  const handleDelete = async () => {
    if (!currentUser) {
      toast({
        variant: 'destructive',
        title: 'Authentication required',
        description: 'Please sign in to delete posts',
      });
      return;
    }

    if (currentUser.id !== userId) {
      toast({
        variant: 'destructive',
        title: 'Permission denied',
        description: 'You can only delete your own posts',
      });
      return;
    }

    setLoading(true);
    try {
      const result = await deletePost(postId);
      
      if (result.success) {
        toast({
          title: 'Post deleted',
          description: 'Your post has been removed',
        });
        router.push('/');
        router.refresh();
      } else {
        throw new Error(result.error || 'Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to delete post',
        description: error instanceof Error ? error.message : 'Please try again',
      });
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  if (!currentUser || currentUser.id !== userId) {
    return null;
  }

  return (
    <div className="flex gap-2">
      {showConfirm ? (
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowConfirm(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              'Confirm Delete'
            )}
          </Button>
        </>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowConfirm(true)}
          disabled={loading}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      )}
    </div>
  );
}
