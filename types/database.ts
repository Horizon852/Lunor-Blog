export type PostCategory = 'Place' | 'Hotel' | 'Cafe';

export interface Profile {
  id: string;
  email: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  title: string;
  content: string;
  location: string;
  category: PostCategory;
  cover_image_url: string | null;
  cover_image_path: string | null;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface PostWithAuthor extends Post {
  profiles: Profile;
}

export interface CommentWithAuthor extends Comment {
  profiles: Profile;
}
