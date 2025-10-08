# Netflix Clone - Deployment Guide

This guide will help you deploy both the frontend and backend of your Netflix clone to various platforms.

## Prerequisites

- GitHub account
- MongoDB Atlas account (for database)
- Node.js installed locally
- Git installed

## Backend Deployment

### Option 1: Render (Recommended)

1. **Prepare your backend:**
   ```bash
   cd backend
   npm install
   ```

2. **Create a GitHub repository and push your code:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/netflix-clone.git
   git push -u origin main
   ```

3. **Deploy to Render:**
   - Go to [render.com](https://render.com)
   - Sign up/Login with GitHub
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select your repository and branch
   - Configure:
     - **Name**: netflix-clone-backend
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Node Version**: 18.x

4. **Set Environment Variables in Render:**
   ```
   NODE_ENV=production
   PORT=10000
   FRONTEND_URL=https://your-frontend-url.com
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/netflix-clone
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d
   MAX_FILE_SIZE=5242880
   UPLOAD_PATH=./uploads
   ADMIN_EMAIL=admin@netflix-clone.com
   ADMIN_PASSWORD=admin123
   ```

5. **Deploy and get your backend URL**

### Option 2: Railway

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway:**
   ```bash
   railway login
   ```

3. **Deploy:**
   ```bash
   cd backend
   railway init
   railway up
   ```

4. **Set environment variables:**
   ```bash
   railway variables set NODE_ENV=production
   railway variables set MONGODB_URI=your-mongodb-uri
   # ... set other variables
   ```

### Option 3: Heroku

1. **Install Heroku CLI:**
   ```bash
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login and create app:**
   ```bash
   heroku login
   cd backend
   heroku create netflix-clone-backend
   ```

3. **Set environment variables:**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your-mongodb-uri
   # ... set other variables
   ```

4. **Deploy:**
   ```bash
   git push heroku main
   ```

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd "Netflix Clone"
   vercel
   ```

3. **Set Environment Variables:**
   - Go to Vercel dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add: `REACT_APP_API_URL=https://your-backend-url.com/api`

### Option 2: Netlify

1. **Build your project:**
   ```bash
   cd "Netflix Clone"
   # If using a build tool, run the build command
   ```

2. **Deploy:**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop your project folder
   - Or connect your GitHub repository

3. **Set Environment Variables:**
   - Go to Site Settings → Environment Variables
   - Add: `REACT_APP_API_URL=https://your-backend-url.com/api`

### Option 3: GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json:**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     },
     "homepage": "https://yourusername.github.io/netflix-clone"
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

## MongoDB Atlas Setup

1. **Create MongoDB Atlas Account:**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free

2. **Create a Cluster:**
   - Choose AWS, Google Cloud, or Azure
   - Select a region close to your users
   - Choose M0 (Free tier) for development

3. **Create Database User:**
   - Go to Database Access
   - Add New User
   - Create username and password
   - Give "Read and write to any database" permissions

4. **Whitelist IP Addresses:**
   - Go to Network Access
   - Add IP Address
   - Add 0.0.0.0/0 for all IPs (or specific IPs for security)

5. **Get Connection String:**
   - Go to Clusters
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

## Environment Variables Reference

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-url.com
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/netflix-clone
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
ADMIN_EMAIL=admin@netflix-clone.com
ADMIN_PASSWORD=admin123
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

## Testing Your Deployment

1. **Backend Health Check:**
   ```bash
   curl https://your-backend-url.com/api/health
   ```

2. **Test API Endpoints:**
   ```bash
   # Register a user
   curl -X POST https://your-backend-url.com/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
   ```

3. **Frontend Connection:**
   - Open your frontend URL
   - Check browser console for any errors
   - Test the contact form and other features

## Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Make sure `FRONTEND_URL` is set correctly in backend
   - Check that the frontend URL matches exactly

2. **Database Connection Issues:**
   - Verify MongoDB Atlas connection string
   - Check IP whitelist in MongoDB Atlas
   - Ensure database user has correct permissions

3. **File Upload Issues:**
   - Check file size limits
   - Verify upload directory permissions
   - Ensure proper file type validation

4. **Environment Variables:**
   - Double-check all environment variables are set
   - Restart the application after changing variables
   - Use the correct variable names (case-sensitive)

### Logs and Debugging:

1. **Render:**
   - Go to your service dashboard
   - Click on "Logs" tab

2. **Railway:**
   ```bash
   railway logs
   ```

3. **Heroku:**
   ```bash
   heroku logs --tail
   ```

## Security Considerations

1. **Environment Variables:**
   - Never commit `.env` files to version control
   - Use strong, unique passwords and secrets
   - Rotate secrets regularly

2. **Database Security:**
   - Use strong database passwords
   - Whitelist only necessary IP addresses
   - Enable MongoDB Atlas security features

3. **API Security:**
   - Use HTTPS in production
   - Implement rate limiting
   - Validate all inputs
   - Use proper CORS settings

## Monitoring and Maintenance

1. **Set up monitoring:**
   - Use services like UptimeRobot for uptime monitoring
   - Set up error tracking with Sentry
   - Monitor database performance

2. **Regular maintenance:**
   - Update dependencies regularly
   - Monitor logs for errors
   - Backup database regularly
   - Review security settings

## Cost Optimization

1. **Free Tier Limits:**
   - Render: 750 hours/month free
   - Railway: $5/month after free trial
   - Heroku: $7/month for hobby dyno
   - MongoDB Atlas: 512MB free storage

2. **Optimization Tips:**
   - Use CDN for static assets
   - Optimize images
   - Implement caching
   - Monitor resource usage

## Support

If you encounter issues:

1. Check the logs first
2. Verify environment variables
3. Test locally before deploying
4. Check platform-specific documentation
5. Create an issue in the repository

## Next Steps

After successful deployment:

1. Set up a custom domain
2. Configure SSL certificates
3. Set up monitoring and alerts
4. Implement CI/CD pipeline
5. Add more features and optimizations

Happy deploying! 🚀

