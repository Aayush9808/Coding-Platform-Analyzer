# 🚀 Deployment Guide

## ✅ What We've Done So Far

1. ✅ Fixed all export features (PDF, Excel, Share Link)
2. ✅ Git repository initialized
3. ✅ First commit created with all code

## 📋 Next Steps to Deploy

### Step 1: Push to GitHub

1. **Create a new GitHub repository**:
   - Go to https://github.com/new
   - Repository name: `platform-analyser` (or any name you like)
   - Description: "Comprehensive coding platform analysis tool"
   - Choose Public or Private
   - **DO NOT** initialize with README (we already have one)
   - Click "Create repository"

2. **Push your code** (run these commands):
   ```bash
   cd "c:\Users\aayus\Platform Analyser"
   git remote add origin https://github.com/YOUR_USERNAME/platform-analyser.git
   git branch -M main
   git push -u origin main
   ```

   Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 2: Test Exports Locally

Before deploying, let's test the exports:

1. **Start both servers**:
   ```bash
   start-all.bat
   ```

2. **Test in browser** (http://localhost:3000):
   - Enter some usernames (e.g., LeetCode: kamyuc, CodeForces: tourist)
   - Click "Analyze Profiles"
   - Wait for analysis to complete
   - Test each export button:
     - ✅ PDF Export - should download a PDF file
     - ✅ Excel Export - should download an Excel file
     - ✅ Share Link - should show "Link copied!" notification

### Step 3: Deploy Backend (Choose One)

#### Option A: Render.com (Recommended - Free Tier)

1. Go to https://render.com and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: platform-analyser-backend
   - **Region**: Choose nearest to you
   - **Branch**: main
   - **Root Directory**: backend
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app:app --host 0.0.0.0 --port $PORT`
5. Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://your-atlas-connection-string
   PYTHON_VERSION=3.11
   ```
6. Click "Create Web Service"
7. Copy the deployed URL (e.g., `https://platform-analyser-backend.onrender.com`)

#### Option B: Railway.app (Alternative)

1. Go to https://railway.app and sign up
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Railway will auto-detect Python
5. Add environment variables in Settings
6. Deploy!

### Step 4: Setup MongoDB Atlas (Free)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a free cluster (M0 Sandbox)
4. Create database user:
   - Username: `platform_user`
   - Password: (generate strong password)
5. Add IP to whitelist: `0.0.0.0/0` (allow from anywhere)
6. Get connection string:
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your actual password
7. Add to backend environment variables on Render/Railway

### Step 5: Deploy Frontend (Vercel - Free)

1. Go to https://vercel.com and sign up with GitHub
2. Click "Add New" → "Project"
3. Import your repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
   ```
   (Use the URL from Step 3)
6. Click "Deploy"
7. Your site will be live at: `https://platform-analyser.vercel.app` (or custom domain)

### Step 6: Update Frontend API URL

After deploying backend, update the frontend to use production API:

1. Create `frontend/.env.production`:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
   ```

2. Update `frontend/src/services/api.ts` if needed:
   ```typescript
   const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
   ```

3. Commit and push changes:
   ```bash
   git add .
   git commit -m "Add production API URL"
   git push
   ```

Vercel will auto-deploy the update!

### Step 7: Final Testing

Test your deployed app:

1. Visit your Vercel URL
2. Try analyzing some profiles
3. Test all 3 export buttons
4. Verify everything works!

## 🎉 You're Live!

Your Platform Analyser is now deployed and accessible worldwide!

**Share your links**:
- Frontend: `https://your-app.vercel.app`
- GitHub: `https://github.com/YOUR_USERNAME/platform-analyser`

## 🔧 Troubleshooting

### Backend not responding
- Check Render/Railway logs
- Verify MongoDB connection string
- Ensure environment variables are set

### Frontend can't connect to backend
- Check CORS settings in `backend/app.py`
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check browser console for errors

### Exports not working
- Clear browser cache
- Check browser console for errors
- Verify all dependencies are installed

## 📞 Need Help?

If you encounter any issues:
1. Check the logs on Render/Vercel
2. Verify all environment variables
3. Test locally first to isolate the issue

Good luck! 🚀
