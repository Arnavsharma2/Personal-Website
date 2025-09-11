# Deployment Guide

This guide explains how to deploy your personal website with visit tracking to production.

## Quick Deploy to Vercel (Recommended)

### 1. Push to GitHub
```bash
git add .
git commit -m "Add admin authentication"
git push origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Deploy (no configuration needed)

### 3. Access Your Site
- **Main Site**: `https://your-site-name.vercel.app`
- **Admin Panel**: `https://your-site-name.vercel.app/admin`
- **Test API**: `https://your-site-name.vercel.app/test-api`

## Admin Access

### Default Credentials
- **Password**: `admin123`
- **Environment Variable**: Set `ADMIN_PASSWORD` in Vercel for production

### Setting Production Password
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add: `ADMIN_PASSWORD` = `your-secure-password`

## Alternative Deployments

### Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Admin URL: `https://your-site.netlify.app/admin`

### Your Own Server
1. Build the project: `npm run build`
2. Start production server: `npm start`
3. Configure reverse proxy (nginx/Apache)
4. Set up SSL certificate
5. Admin URL: `https://yourdomain.com/admin`

## Data Storage

### Development
- Data stored in `data/visits.json`
- File is ignored by git for privacy

### Production Considerations
- **Vercel/Netlify**: File storage works but data resets on redeploy
- **For persistent data**: Consider using a database (MongoDB, PostgreSQL, etc.)

## Security Notes

1. **Admin Panel**: Protected with password authentication
2. **Data Privacy**: IP addresses and visit data stored locally only
3. **No External Services**: All tracking is self-hosted
4. **Environment Variables**: Use for sensitive configuration

## Monitoring

### Check Visit Statistics
1. Visit your admin panel: `https://your-site.com/admin`
2. Enter admin password
3. View real-time visit statistics

### Test API Endpoints
1. Visit: `https://your-site.com/test-api`
2. Click "Test API Endpoints"
3. Verify all endpoints are working

## Troubleshooting

### Admin Panel Not Loading
- Check if ad blockers are blocking the API
- Try incognito/private browsing mode
- Verify environment variables are set

### No Visit Data
- Visit the main site first to generate data
- Check browser console for errors
- Verify API endpoints are working

### Production Issues
- Check Vercel/Netlify logs
- Verify environment variables
- Test API endpoints directly
