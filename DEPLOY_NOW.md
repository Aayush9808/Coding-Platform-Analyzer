# Deployment Instructions

## ✅ Your Code is on GitHub!
Repository: https://github.com/Aayush9808/Coding-Platform-Analyzer

---

## 🚀 Deploy in 3 Steps (20 minutes)

### STEP 1: Deploy Backend (Render.com) - 7 minutes

1. **Go to Render**: https://render.com
   - Click "Get Started for Free"
   - Sign up with GitHub

2. **Create New Web Service**:
   - Click "New +" button (top right)
   - Select "Web Service"
   - Connect your GitHub account if asked
   - Find and select: `Aayush9808/Coding-Platform-Analyzer`
   - Click "Connect"

3. **Configure the Service**:
   ```
   Name: platform-analyser-backend
   Region: Singapore (or nearest to you)
   Branch: main
   Root Directory: backend
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn app:app --host 0.0.0.0 --port $PORT
   ```

4. **Choose Free Plan**:
   - Select "Free" tier (0$/month)

5. **Add Environment Variable**:
   - Click "Advanced" → "Add Environment Variable"
   - Key: `MONGODB_URI`
   - Value: `mongodb://localhost:27017` (we'll update this in Step 2)

6. **Click "Create Web Service"**

7. **Wait for deployment** (3-5 minutes)
   - You'll see logs building your app
   - When done, you'll see: "Your service is live 🎉"
   - **COPY YOUR BACKEND URL**: `https://platform-analyser-backend.onrender.com`

---

### STEP 2: Setup MongoDB Atlas - 5 minutes

1. **Go to MongoDB Atlas**: https://www.mongodb.com/cloud/atlas/register
   - Sign up (free account)
   - Choose "Shared" (free tier)

2. **Create Cluster**:
   - Cloud Provider: AWS
   - Region: Choose nearest (e.g., Mumbai, Singapore)
   - Cluster Name: PlatformAnalyser
   - Click "Create Cluster"

3. **Create Database User**:
   - Go to "Database Access" (left sidebar)
   - Click "Add New Database User"
   - Username: `platform_user`
   - Password: Click "Autogenerate Secure Password" → **COPY THIS PASSWORD**
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Allow Access from Anywhere**:
   - Go to "Network Access" (left sidebar)
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere"
   - Confirm with `0.0.0.0/0`
   - Click "Confirm"

5. **Get Connection String**:
   - Go to "Database" (left sidebar)
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like):
     ```
     mongodb+srv://platform_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with the password you copied
   - **SAVE THIS CONNECTION STRING**

6. **Update Render Backend**:
   - Go back to Render dashboard
   - Click on your "platform-analyser-backend" service
   - Go to "Environment" tab
   - Edit `MONGODB_URI` variable
   - Paste your MongoDB connection string
   - Click "Save Changes"
   - Service will auto-redeploy (wait 2 minutes)

---

### STEP 3: Deploy Frontend (Vercel) - 8 minutes

1. **Go to Vercel**: https://vercel.com/signup
   - Click "Continue with GitHub"
   - Authorize Vercel

2. **Import Project**:
   - Click "Add New" → "Project"
   - Find: `Aayush9808/Coding-Platform-Analyzer`
   - Click "Import"

3. **Configure Project**:
   ```
   Framework Preset: Next.js (auto-detected)
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **Add Environment Variable**:
   - Click "Environment Variables"
   - Add this:
     ```
     Name: NEXT_PUBLIC_API_URL
     Value: https://platform-analyser-backend.onrender.com
     ```
     (Use YOUR backend URL from Step 1)

5. **Click "Deploy"**

6. **Wait for deployment** (2-3 minutes)
   - You'll see build logs
   - When done: "🎉 Congratulations!"
   - **YOUR LIVE WEBSITE**: `https://coding-platform-analyzer.vercel.app`

---

## 🎉 YOU'RE LIVE!

Your website is now accessible worldwide at:
**https://coding-platform-analyzer.vercel.app**

### Test Your Live Site:
1. Go to your Vercel URL
2. Enter usernames (LeetCode: kamyuc, CodeForces: tourist)
3. Click "Analyze"
4. Test exports (PDF, Excel, Share Link)

---

## 🔧 Troubleshooting

### Backend Issues:
- Check Render logs: Dashboard → Your Service → "Logs" tab
- Verify MongoDB connection string is correct
- Check environment variables are set

### Frontend Issues:
- Check Vercel deployment logs
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check browser console (F12) for errors

### CORS Errors:
If you see CORS errors, update `backend/app.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://coding-platform-analyzer.vercel.app"],  # Add your Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Then commit and push:
```bash
git add backend/app.py
git commit -m "Update CORS for production"
git push
```

Render will auto-deploy the update!

---

## 📊 What You Have Now:

✅ GitHub Repository: https://github.com/Aayush9808/Coding-Platform-Analyzer
✅ Live Backend: https://platform-analyser-backend.onrender.com
✅ Live Frontend: https://coding-platform-analyzer.vercel.app
✅ Free MongoDB Database
✅ All exports working
✅ Professional portfolio project!

---

## 🎯 Next Steps:

1. Share your live website with friends!
2. Add custom domain (optional)
3. Star your own repo ⭐
4. Add to your resume/portfolio

**Congratulations! You built and deployed a full-stack web application! 🚀**
