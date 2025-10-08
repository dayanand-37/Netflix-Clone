# Netflix Clone - Quick Start Guide

Get your Netflix clone up and running in minutes!

## 🚀 Prerequisites

Before starting, make sure you have:

1. **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** - [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
3. **Git** (optional) - [Download here](https://git-scm.com/)

## ⚡ Quick Setup (Windows)

1. **Double-click `setup.bat`** - This will automatically:
   - Install all dependencies
   - Create necessary directories
   - Seed the database
   - Start the backend server

2. **Open `index.html`** in your browser

## ⚡ Quick Setup (Mac/Linux)

1. **Run the setup script:**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

2. **Open `index.html`** in your browser

## 🔧 Manual Setup

If the automated setup doesn't work, follow these steps:

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Start MongoDB
- **Local MongoDB**: Start the MongoDB service
- **MongoDB Atlas**: Use the connection string in `backend/config.env`

### Step 3: Start Backend Server
```bash
cd backend
npm start
```

### Step 4: Open Frontend
Open `index.html` in your browser or serve it with a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using Live Server (VS Code extension)
# Right-click on index.html and select "Open with Live Server"
```

## 🌐 Access Points

Once running, you can access:

- **Frontend**: `http://localhost:8000` (or your local server)
- **Backend API**: `http://localhost:5000/api`
- **Health Check**: `http://localhost:5000/api/health`
- **API Documentation**: See `backend/README.md`

## 🧪 Test the Application

1. **Test Contact Form**:
   - Click "Contact Us" button
   - Fill out the form
   - Submit and check for success message

2. **Test Email Validation**:
   - Click "Get Started" buttons
   - Enter an email address
   - Test validation

3. **Test FAQ Accordion**:
   - Click on FAQ questions
   - Verify smooth animations

4. **Test Responsive Design**:
   - Resize browser window
   - Test on mobile devices

## 🔍 Troubleshooting

### Backend Won't Start

**Error: "Cannot connect to MongoDB"**
- Make sure MongoDB is running
- Check the connection string in `backend/config.env`
- For local MongoDB: `mongodb://localhost:27017/netflix-clone`
- For MongoDB Atlas: Use your Atlas connection string

**Error: "Port 5000 already in use"**
- Change the port in `backend/config.env`
- Or kill the process using port 5000

**Error: "Module not found"**
- Run `cd backend && npm install`

### Frontend Issues

**API calls failing**
- Make sure backend is running on port 5000
- Check browser console for errors
- Verify CORS settings in backend

**Styling issues**
- Clear browser cache
- Check if all CSS files are loading

### Database Issues

**Seeding fails**
- Make sure MongoDB is running
- Check database connection
- Run `cd backend && npm run seed` manually

## 📱 Features to Test

### Frontend Features
- ✅ Responsive design
- ✅ FAQ accordion
- ✅ Contact form modal
- ✅ Email validation
- ✅ Smooth animations
- ✅ Mobile optimization

### Backend Features
- ✅ User authentication
- ✅ Contact form handling
- ✅ File upload
- ✅ API endpoints
- ✅ Database operations
- ✅ Security features

## 🎯 Next Steps

1. **Customize the design** - Modify colors, fonts, layout
2. **Add more content** - Create more posts and pages
3. **Deploy to production** - See `DEPLOYMENT_GUIDE.md`
4. **Add features** - User dashboard, admin panel, etc.

## 📞 Need Help?

If you encounter issues:

1. Check the console for error messages
2. Verify all prerequisites are installed
3. Make sure ports 5000 and 8000 are available
4. Check the `backend/README.md` for detailed API docs

## 🎉 Success!

If everything is working, you should see:
- Backend server running on port 5000
- Frontend accessible in your browser
- Contact form working
- FAQ accordion animating
- Responsive design on all devices

**Congratulations! Your Netflix clone is now running! 🚀**
