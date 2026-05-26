import { createClient } from '@/lib/supabase/server';
import { PostWithAuthor, CommentWithAuthor } from '@/types/database';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import CommentSection from './comment-section';
import DeletePostButton from './delete-post-button';
import { MapPin, Calendar, Clock, ArrowLeft, MessageSquare } from 'lucide-react';

async function getPost(id: string): Promise<PostWithAuthor | null> {
  try {
    const supabase = await createClient();
    
    const { data: post, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles (
          id,
          username,
          full_name,
          avatar_url
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

function getCategoryColor(category: string): string {
  switch (category) {
    case 'Place':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Hotel':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Cafe':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

function getInitials(name: string | null): string {
  if (!name) return 'U';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TravelBlog
            </h1>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" asChild>
              <Link href="/">Back to Feed</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Feed
            </Link>
          </Button>

          {/* Post Content */}
          <Card className="mb-8 overflow-hidden">
            {/* Cover Image */}
            {post.cover_image_url ? (
              <div className="relative h-64 md:h-96 w-full">
                <Image
                  src={post.cover_image_url}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 75vw"
                />
              </div>
            ) : (
              <div className="h-64 md:h-96 bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                <MapPin className="h-24 w-24 text-white/80" />
              </div>
            )}

            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getCategoryColor(post.category)}`}>
                  {post.category}
                </span>
                <DeletePostButton postId={post.id} userId={post.user_id} />
              </div>
              
              <CardTitle className="text-3xl md:text-4xl mb-4">{post.title}</CardTitle>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{post.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <time dateTime={post.created_at}>
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 pt-4 border-t">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.profiles.avatar_url || undefined} />
                  <AvatarFallback>
                    {getInitials(post.profiles.full_name || post.profiles.username)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {post.profiles.full_name || post.profiles.username || 'Anonymous'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {post.profiles.username ? `@${post.profiles.username}` : 'Traveler'}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {post.content}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Comments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CommentSection postId={post.id} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
