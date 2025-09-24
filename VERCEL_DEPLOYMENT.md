# Vercel Deployment Guide

This guide will help you deploy your personal website to Vercel hosting.

## Prerequisites

1. A GitHub account
2. A Vercel account (sign up at [vercel.com](https://vercel.com))
3. Your code pushed to a GitHub repository

## Environment Variables

Before deploying, you'll need to set up these environment variables in Vercel:

### Required Environment Variables

1. **ADMIN_PASSWORD** - Set a secure password for the admin panel
   - Default: `admin123` (change this!)
   - Example: `MySecurePassword123!`

2. **GEMINI_API_KEY** - Your Google Gemini API key
   - Get it from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Example: `AIzaSyB...` (your actual API key)

### Optional Environment Variables

3. **NODE_OPTIONS** - Memory optimization
   - Value: `--max-old-space-size=512`

4. **NEXT_TELEMETRY_DISABLED** - Disable Next.js telemetry
   - Value: `1`

## Deployment Steps

### 1. Push to GitHub

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a Next.js project

### 3. Configure Environment Variables

1. In your Vercel project dashboard, go to **Settings** → **Environment Variables**
2. Add the required environment variables:
   - `ADMIN_PASSWORD` = `your-secure-password`
   - `GEMINI_API_KEY` = `your-gemini-api-key`
   - `NODE_OPTIONS` = `--max-old-space-size=512`
   - `NEXT_TELEMETRY_DISABLED` = `1`

### 4. Deploy

1. Click **Deploy** (or it will auto-deploy)
2. Wait for the deployment to complete
3. Your site will be available at `https://your-project-name.vercel.app`

## Post-Deployment

### Access Your Site

- **Main Website**: `https://your-project-name.vercel.app`
- **Admin Panel**: `https://your-project-name.vercel.app/admin`
- **Test API**: `https://your-project-name.vercel.app/test-api`

### Admin Panel Access

1. Go to `https://your-project-name.vercel.app/admin`
2. Enter the admin password you set in environment variables
3. View visit statistics and manage the site

### Test the Chat Feature

1. Go to the main website
2. Scroll down to the "Chat with My Resume" section
3. Test the AI chat functionality

## Vercel-Specific Optimizations

This project has been optimized for Vercel with:

- ✅ **In-memory storage** - No file system dependencies
- ✅ **Dynamic API routes** - Properly configured for serverless
- ✅ **Memory management** - Optimized for Vercel's memory limits
- ✅ **Static file handling** - Resume text stored as static file
- ✅ **Environment variables** - Secure configuration management

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check that all environment variables are set
   - Ensure your GitHub repository is public or connected properly

2. **Admin Panel Not Working**
   - Verify `ADMIN_PASSWORD` environment variable is set
   - Check browser console for errors

3. **Chat Feature Not Working**
   - Verify `GEMINI_API_KEY` environment variable is set
   - Check API key is valid and has sufficient quota

4. **Memory Issues**
   - The app is optimized for Vercel's memory limits
   - Data resets on each function restart (this is normal)

### Monitoring

- Check Vercel's function logs in the dashboard
- Monitor memory usage via the `/api/memory-status` endpoint
- Use the admin panel to track visit statistics

## Security Notes

- ✅ Admin password is server-side verified only
- ✅ Rate limiting prevents abuse
- ✅ No sensitive data exposed via API
- ✅ Environment variables are secure

## Performance

- ✅ Optimized for Vercel's serverless architecture
- ✅ Static generation where possible
- ✅ Dynamic rendering only when needed
- ✅ Memory-efficient data storage

## Support

If you encounter issues:

1. Check the Vercel deployment logs
2. Verify all environment variables are set correctly
3. Test the API endpoints individually
4. Check the browser console for client-side errors

Your website should now be successfully deployed and running on Vercel! 🚀
