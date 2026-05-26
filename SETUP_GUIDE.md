# Quick Setup Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Supabase
1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project (takes about 2 minutes)
3. Go to the SQL Editor in your Supabase dashboard
4. Copy the entire contents of `supabase-setup.sql`
5. Paste it into the SQL Editor and run it
6. Go to Settings > API to get your credentials

### Step 3: Configure Environment Variables
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-from-settings
```

### Step 4: Update Image Domain
Edit `next.config.js` and replace `your-project.supabase.co` with your actual Supabase project URL.

### Step 5: Run the Application
```bash
npm run dev
```

Visit http://localhost:3000

## 📁 What Has Been Created

### Configuration Files
- ✅ `next.config.js` - Next.js configuration with image optimization
- ✅ `tailwind.config.ts` - Tailwind CSS configuration
- ✅ `tsconfig.json` - TypeScript configuration
- ✅ `postcss.config.js` - PostCSS configuration
- ✅ `package.json` - Dependencies and scripts
- ✅ `.env.local.example` - Environment variables template
- ✅ `.gitignore` - Git ignore rules

### Database Setup
- ✅ `supabase-setup.sql` - Complete SQL script with:
  - Table creation (profiles, posts, comments)
  - Storage bucket setup (travel_images)
  - Row Level Security (RLS) policies
  - Indexes and triggers
  - User profile automation

### Core Utilities
- ✅ `lib/supabase/server.ts` - Server-side Supabase client
- ✅ `lib/supabase/client.ts` - Client-side Supabase client
- ✅ `lib/utils.ts` - Utility functions (cn helper)
- ✅ `middleware.ts` - Supabase auth middleware

### TypeScript Types
- ✅ `types/database.ts` - Complete TypeScript interfaces for all database tables

### UI Components (Shadcn UI)
- ✅ Button
- ✅ Card
- ✅ Input
- ✅ Label
- ✅ Textarea
- ✅ Avatar
- ✅ Select
- ✅ Toast (with useToast hook)
- ✅ Toaster component

### Application Pages
- ✅ `app/page.tsx` - Home feed with masonry grid
- ✅ `app/auth/login/page.tsx` - Login page
- ✅ `app/auth/signup/page.tsx` - Signup page
- ✅ `app/create/page.tsx` - Post creation with image upload
- ✅ `app/post/[id]/page.tsx` - Single post view
- ✅ `app/post/[id]/comment-section.tsx` - Comments component
- ✅ `app/post/[id]/delete-post-button.tsx` - Delete post component

### Server Actions
- ✅ `app/actions/posts.ts` - Create/delete posts, upload images
- ✅ `app/actions/comments.ts` - Create/delete comments

### Error & Loading States
- ✅ `app/error.tsx` - Global error boundary
- ✅ `app/loading.tsx` - Global loading state
- ✅ `app/not-found.tsx` - 404 page
- ✅ Route-specific error.tsx and loading.tsx for all pages

### Layout & Styling
- ✅ `app/layout.tsx` - Root layout with Toaster
- ✅ `app/globals.css` - Global styles with CSS variables

### Documentation
- ✅ `README.md` - Comprehensive documentation
- ✅ `SETUP_GUIDE.md` - Quick setup instructions

## 🎯 Key Features Implemented

### Authentication
- Email/password signup with profile auto-creation
- Email/password login
- Session management
- Protected routes

### Posts
- Create posts with cover images
- Three categories: Place, Hotel, Cafe
- Image upload to Supabase Storage
- Delete own posts
- Responsive card layout on home feed

### Comments
- Add comments to posts
- Delete own comments
- Real-time updates
- User avatars

### Error Handling
- Comprehensive try-catch blocks
- Error boundaries at every route
- Graceful fallback UI
- User-friendly error messages
- Toast notifications

### Performance
- Next.js Image optimization
- Server-side rendering
- Loading states for async operations
- Efficient data fetching

## 🔒 Security Features

- Row Level Security (RLS) on all tables
- Server Actions for data mutations
- No direct database access from client
- File upload validation (size and type)
- Authentication checks for protected actions
- Environment variables for sensitive data

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click Deploy

## 📝 Next Steps

After setup:

1. Create an account at `/auth/signup`
2. Create your first post at `/create`
3. Share the link with others!

## 🐛 Troubleshooting

### Images not loading?
- Check that `next.config.js` has your correct Supabase domain
- Verify the storage bucket is public
- Check RLS policies on storage.objects

### Authentication not working?
- Verify your Supabase URL and anon key are correct
- Check that you ran the SQL setup script
- Ensure email confirmation is disabled in Supabase (for development)

### Build errors?
- Run `npm install` to ensure all dependencies are installed
- Check that Node.js version is 18+
- Clear `.next` folder and rebuild

## 🎨 Customization

### Colors
Edit `app/globals.css` to modify the color scheme.

### Styling
All components use Tailwind CSS classes. Modify directly in component files.

### Features
Add new features by:
1. Creating new server actions in `app/actions/`
2. Adding new UI components in `components/ui/`
3. Creating new pages in `app/`

## 📞 Support

For Supabase-specific issues: [supabase.com/docs](https://supabase.com/docs)
For Next.js issues: [nextjs.org/docs](https://nextjs.org/docs)

---

**Built with ❤️ using Next.js, Supabase, and Shadcn UI**
