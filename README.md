# Travel & Accommodation Community Blog

A production-ready, full-stack travel blog application built with Next.js 14 (App Router), Supabase, Tailwind CSS, and Shadcn UI.

## Features

- 🔐 **Authentication**: Email/password login and signup with Supabase Auth
- 📝 **Post Creation**: Create travel posts with cover images, categories (Place/Hotel/Cafe), and rich content
- 🏠 **Home Feed**: Responsive masonry grid layout displaying all travel posts
- 💬 **Comments**: Comment system with authentication
- 🖼️ **Image Upload**: Secure image upload to Supabase Storage with size validation
- 🎨 **Beautiful UI**: Modern design with Tailwind CSS and Shadcn UI components
- ⚡ **Performance**: Next.js Image optimization, server-side rendering, and loading states
- 🛡️ **Security**: Row Level Security (RLS) policies, server actions, and proper error handling

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Setup Instructions

### 1. Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)

### 2. Install Dependencies

```bash
npm install
```

### 3. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Copy and run the entire SQL script from `supabase-setup.sql`
4. Get your project URL and anon key from Settings > API

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Update `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 5. Update Next.js Config

Update `next.config.js` to use your actual Supabase domain:

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-actual-project.supabase.co',
      port: '',
      pathname: '/storage/v1/object/public/**',
    },
  ],
},
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── actions/
│   │   ├── comments.ts      # Server actions for comments
│   │   └── posts.ts         # Server actions for posts
│   ├── auth/
│   │   ├── login/           # Login page
│   │   └── signup/          # Signup page
│   ├── create/              # Post creation page
│   ├── post/[id]/           # Single post view with comments
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── loading.tsx          # Global loading state
│   ├── error.tsx            # Global error boundary
│   └── page.tsx             # Home feed
├── components/
│   └── ui/                  # Shadcn UI components
├── lib/
│   ├── supabase/
│   │   ├── client.ts        # Client-side Supabase client
│   │   └── server.ts        # Server-side Supabase client
│   └── utils.ts             # Utility functions
├── types/
│   └── database.ts          # TypeScript interfaces
└── supabase-setup.sql       # Database setup script
```

## Database Schema

The application uses the following tables:

- **profiles**: User profile information (extends auth.users)
- **posts**: Travel posts with content, images, and metadata
- **comments**: Comments on posts
- **storage**: travel_images bucket for post cover images

All tables have Row Level Security (RLS) policies enabled:
- Public read access for posts and comments
- Authenticated users can create their own posts and comments
- Users can only update/delete their own content

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Make sure to add these in your hosting platform:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Features Overview

### Authentication
- Email/password signup
- Email/password login
- Automatic profile creation
- Session management via Supabase Auth

### Posts
- Create posts with title, content, location, and category
- Upload cover images (max 10MB, supported formats: JPG, PNG, GIF, WebP)
- Three categories: Place, Hotel, Cafe
- Delete own posts
- Responsive card layout

### Comments
- Add comments to any post
- Delete own comments
- Real-time updates
- User avatars and timestamps

### UI/UX
- Loading states for all async operations
- Error boundaries with fallback UI
- Toast notifications for user feedback
- Responsive design (mobile-first)
- Smooth animations and transitions

## Error Handling

The application implements comprehensive error handling:

- Try-catch blocks around all Supabase operations
- Error boundaries at route level
- Graceful fallback UI for failed operations
- User-friendly error messages
- Toast notifications for action feedback

## Security

- Row Level Security (RLS) on all database tables
- Server Actions for data mutations
- No direct database access from client
- Environment variables for sensitive data
- File upload validation (size and type)
- Authentication checks for protected actions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please check the Supabase documentation at [supabase.com/docs](https://supabase.com/docs).
