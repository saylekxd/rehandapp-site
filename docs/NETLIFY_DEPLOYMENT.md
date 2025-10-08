# Netlify Deployment Guide

This guide will help you deploy your Next.js application to Netlify successfully.

## Files Added for Netlify Deployment

✅ `netlify.toml` - Main Netlify configuration file
✅ `public/_redirects` - Client-side routing redirects
✅ `.nvmrc` - Node.js version specification

## Deployment Steps

### 1. Connect Repository
1. Log in to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Connect your Git repository
4. Select your repository

### 2. Build Settings
The build settings are automatically configured in `netlify.toml`:
- **Build command**: `npm run build`
- **Publish directory**: `out`
- **Node version**: 18

### 3. Environment Variables
No backend environment variables are required for the landing page.

#### Optional Variables
```
NEXT_PUBLIC_SITE_URL=https://your-site-name.netlify.app
NEXT_PUBLIC_CAL_COM_API_KEY=your_cal_com_api_key_here (if using Cal.com)
```

### 4. Domain Configuration
1. Once deployed, configure your custom domain in Netlify settings
2. Update `NEXT_PUBLIC_SITE_URL` environment variable with your final domain

## Configuration Details

### netlify.toml Features
- **Static Export**: Configured for Next.js static export
- **Security Headers**: X-Frame-Options, CSP, XSS protection
- **Caching**: Optimized cache headers for static assets
- **Redirects**: SPA routing and internationalization support
- **API Routes**: Netlify Functions support (if needed)

### _redirects File
- Handles client-side routing for single-page application behavior
- Supports internationalization routes (/en/*, /pl/*)
- Redirects for static pages like privacy policy

### Security Headers
The configuration includes security headers:
- Content Security Policy
- XSS Protection
- Frame Options
- Content Type Options

## Troubleshooting

### Build Issues
- Ensure all dependencies are in `package.json`
- Check that `output: 'export'` is set in `next.config.js`
- Verify Node.js version compatibility

### Runtime Issues
- Check environment variables are set correctly (if any)
- Check browser console for CSP violations

### Routing Issues
- Ensure `_redirects` file is in the `public` directory
- Check `netlify.toml` redirect rules
- Verify client-side navigation works

## Performance Optimization

The configuration includes:
- Long-term caching for static assets
- Compressed static files
- Optimized image handling (unoptimized for static export)

## Next Steps After Deployment

1. Test all routes and functionality
2. Configure custom domain
3. Set up form handling (if needed)
4. Configure analytics (if needed)

For any issues, check the Netlify deploy logs and browser console for detailed error messages. 