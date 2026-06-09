# Personal Website

Next.js portfolio website featuring a profile hero, about, experience, project showcase, and contact sections, with lightweight visit tracking.

## What It Does

- Displays a personal profile, experience timeline, and project showcase with descriptions and images
- Smooth section animations and icon-based navigation
- Silent visit tracking with rate limiting and IP geolocation

## How It Works

1. **Frontend**: Next.js 14 (App Router) with React and TypeScript
2. **Sections**: `ProfileHero`, `About`, `Experience`, `ProjectsGrid`, and `Contact` rendered from `app/page.tsx`
3. **API Routes**: `/api/log-visit` records visits in memory with rate limiting and optional IP geolocation

## Dependencies

- `next` - React framework
- `framer-motion` - Animations
- `lucide-react` - Icons
- `geist` - Font
- `tailwindcss` - Styling
- `typescript` - Type safety

## Technical Details

- Framework: Next.js 14 (App Router)
- Deployment: Vercel or similar platform
- Features: portfolio sections, animated UI, visit tracking
