# Netflix Clone - Complete Full Stack Application

A fully functional Netflix clone with modern frontend and robust backend API, featuring user authentication, content management, contact system, and file uploads.

## 🚀 Quick Start (Easiest Way)

### Windows Users
1. **Double-click `start-all.bat`** - This will automatically:
   - Install all dependencies
   - Set up the database
   - Start both frontend and backend servers
   - Open the application in your browser

### Mac/Linux Users
1. **Run the setup script:**
   ```bash
   chmod +x start-all.sh
   ./start-all.sh
   ```

## 📋 Prerequisites

Before running, make sure you have:

1. **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** - [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## 🛠️ Manual Setup

If the automated setup doesn't work:

### Step 1: Backend Setup
```bash
cd backend
npm install
npm start
```

### Step 2: Frontend Setup
```bash
# In a new terminal
node serve.js
```

### Step 3: Open Application
- Frontend: `http://localhost:8000`
- Backend API: `http://localhost:5000/api`

## 🌟 Features

### Frontend Features
- ✅ **Responsive Design** - Works on all devices
- ✅ **Modern UI** - Netflix-inspired design
- ✅ **Interactive Elements** - FAQ accordion, modals, animations
- ✅ **Contact Form** - Integrated with backend
- ✅ **Email Validation** - Real-time validation
- ✅ **Smooth Animations** - CSS transitions and effects

### Backend Features
- ✅ **User Authentication** - JWT-based auth system
- ✅ **Content Management** - CRUD operations for posts
- ✅ **Contact System** - Form handling with admin panel
- ✅ **File Upload** - Image upload with validation
- ✅ **Database** - MongoDB with Mongoose
- ✅ **Security** - Rate limiting, CORS, validation
- ✅ **API Documentation** - Comprehensive REST API

## 📁 Project Structure

```
Netflix Clone/
├── Frontend Files
│   ├── index.html          # Main HTML file
│   ├── style.css           # Stylesheet
│   ├── script.js           # Frontend JavaScript
│   ├── api.js              # API client
│   └── serve.js            # Frontend server
├── backend/                # Backend application
│   ├── server.js           # Main server file
│   ├── start.js            # Startup script
│   ├── models/             # Database models
│   ├── controllers/        # Route controllers
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   └── scripts/            # Utility scripts
├── Setup Scripts
│   ├── start-all.bat       # Windows startup
│   ├── start-all.sh        # Mac/Linux startup
│   └── setup.bat/.sh       # Backend only
└── Documentation
    ├── README.md           # This file
    ├── QUICK_START.md      # Quick setup guide
    └── DEPLOYMENT_GUIDE.md # Production deployment
```

## 🔧 Configuration

### Backend Configuration
Edit `backend/config.env`:
```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:8000
MONGODB_URI=mongodb://localhost:27017/netflix-clone
JWT_SECRET=your-secret-key
```

### Frontend Configuration
The frontend automatically connects to `http://localhost:5000/api`

## 🧪 Testing the Application

### 1. Test Contact Form
- Click "Contact Us" button
- Fill out the form
- Submit and verify success message

### 2. Test Email Validation
- Click "Get Started" buttons
- Enter invalid email (should show error)
- Enter valid email (should work)

### 3. Test FAQ Accordion
- Click on FAQ questions
- Verify smooth expand/collapse animations

### 4. Test Responsive Design
- Resize browser window
- Test on mobile devices
- Verify all elements are responsive

### 5. Test Backend API
- Visit `http://localhost:5000/api/health`
- Should return server status

## 🔍 Troubleshooting

### Common Issues

**Backend won't start:**
- Make sure MongoDB is running
- Check if port 5000 is available
- Verify all dependencies are installed

**Frontend won't load:**
- Make sure backend is running first
- Check if port 8000 is available
- Clear browser cache

**Database connection fails:**
- Start MongoDB service
- Check connection string in `backend/config.env`
- For MongoDB Atlas, use your connection string

**API calls failing:**
- Check browser console for errors
- Verify backend is running on port 5000
- Check CORS settings

### Getting Help

1. Check the console for error messages
2. Verify all prerequisites are installed
3. Make sure ports 5000 and 8000 are available
4. Check the `backend/README.md` for detailed API docs

## 🚀 Deployment

For production deployment, see `DEPLOYMENT_GUIDE.md` which covers:
- Render
- Railway
- Heroku
- Vercel
- Netlify
- MongoDB Atlas

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get profile (Protected)

### Content Endpoints
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create post (Protected)
- `PUT /api/posts/:id` - Update post (Protected)

### Contact Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/contact/admin` - Get contacts (Admin)

### File Upload
- `POST /api/upload/image` - Upload image (Protected)

## 🎯 Next Steps

1. **Customize Design** - Modify colors, fonts, layout
2. **Add Content** - Create more posts and pages
3. **Deploy** - Use the deployment guide
4. **Extend Features** - Add user dashboard, admin panel

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Netflix for design inspiration
- All open-source contributors
- Font Awesome for icons
- Google Fonts for typography

---

**Ready to start? Just run `start-all.bat` (Windows) or `./start-all.sh` (Mac/Linux) and you're good to go! 🚀**
