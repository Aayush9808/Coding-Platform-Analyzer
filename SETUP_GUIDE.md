# 🚀 Platform Analyser - Setup Guide

## Complete Installation and Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Redis** (Optional, for caching) - [Download](https://redis.io/download)
- **Git** - [Download](https://git-scm.com/)

### Quick Start (For Development)

#### Step 1: Install Root Dependencies

```bash
cd "c:\Users\aayus\Platform Analyser"
npm install
```

#### Step 2: Setup Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env with your settings (MongoDB, Redis, API keys)
notepad .env
```

**Important**: Update the `.env` file with your actual values:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/platform-analyser
REDIS_URL=redis://localhost:6379
REDIS_ENABLED=true
```

#### Step 3: Setup Frontend

```bash
# Navigate to frontend
cd ..\frontend

# Install dependencies
npm install

# Create .env.local file
copy .env.local.example .env.local

# Edit .env.local
notepad .env.local
```

Update `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

#### Step 4: Start MongoDB

**Option A: Using MongoDB installed locally**
```bash
# Start MongoDB service (Windows)
net start MongoDB
```

**Option B: Using MongoDB Docker**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### Step 5: Start Redis (Optional but Recommended)

**Option A: Using Redis installed locally**
```bash
redis-server
```

**Option B: Using Redis Docker**
```bash
docker run -d -p 6379:6379 --name redis redis:alpine
```

#### Step 6: Run the Application

Open **3 separate terminals**:

**Terminal 1 - Backend**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend**
```bash
cd frontend
npm run dev
```

**Terminal 3 - Check if everything is running**
```bash
# Test backend health
curl http://localhost:5000/health

# Test API
curl http://localhost:5000/api
```

#### Step 7: Access the Application

Open your browser and go to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Docs**: http://localhost:5000/api

---

## 🐳 Using Docker (Recommended for Production)

### Run Everything with Docker Compose

```bash
# Navigate to project root
cd "c:\Users\aayus\Platform Analyser"

# Start all services (MongoDB, Redis, Backend, Frontend)
docker-compose up -d

# Check logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v
```

**Access:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: mongodb://localhost:27017
- Redis: redis://localhost:6379

---

## 📊 Testing the Application

### Manual Testing

1. **Open Frontend**: http://localhost:3000
2. **Enter Profile URLs**:
   - LeetCode: `https://leetcode.com/username` or just `username`
   - CodeForces: `https://codeforces.com/profile/username` or just `username`
   - GeeksforGeeks: `https://auth.geeksforgeeks.org/user/username` or just `username`
   - HackerRank: `https://www.hackerrank.com/username` or just `username`

3. **Click "Analyze My Profiles"**

4. **View Results**:
   - Overall statistics
   - Platform-specific analysis
   - AI duplicate detection
   - Visual charts

### API Testing with curl

```bash
# Test LeetCode scraper
curl -X POST http://localhost:5000/api/platforms/leetcode ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"your_username\"}"

# Test CodeForces scraper
curl -X POST http://localhost:5000/api/platforms/codeforces ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"your_username\"}"

# Test full analysis
curl -X POST http://localhost:5000/api/analyser/analyze ^
  -H "Content-Type: application/json" ^
  -d "{\"profiles\":{\"leetcode\":\"username\",\"codeforces\":\"username\"}}"
```

### API Testing with Postman

Import this collection into Postman:

**POST** `http://localhost:5000/api/analyser/analyze`
```json
{
  "profiles": {
    "leetcode": "your_leetcode_username",
    "codeforces": "your_codeforces_username",
    "gfg": "your_gfg_username",
    "hackerrank": "your_hackerrank_username"
  }
}
```

---

## 🔧 Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
```
❌ MongoDB Connection Error: connect ECONNREFUSED
```
**Solution**: Make sure MongoDB is running:
```bash
net start MongoDB
# OR
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**2. Redis Connection Error**
```
Redis Client Error
```
**Solution**: Either start Redis or disable it in `.env`:
```env
REDIS_ENABLED=false
```

**3. Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Change port in `.env` or kill the process:
```bash
# Find process
netstat -ano | findstr :5000

# Kill process (replace PID)
taskkill /PID <PID> /F
```

**4. Frontend Can't Connect to Backend**
```
Network Error
```
**Solution**: Make sure backend is running and check `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**5. Module Not Found Errors**
```
Cannot find module 'express'
```
**Solution**: Reinstall dependencies:
```bash
# In backend
cd backend
rmdir /s /q node_modules
npm install

# In frontend
cd ..\frontend
rmdir /s /q node_modules
npm install
```

**6. Platform Scraping Errors**

Some platforms may block automated requests. Solutions:
- Use valid usernames
- Add delays between requests
- Use rotating proxies (advanced)
- Some platforms like GFG may have limited data

---

## 🎨 Customization

### Adding New Platforms

1. Create new scraper in `backend/src/services/scrapers/`
2. Add route in `backend/src/routes/platforms.js`
3. Add controller in `backend/src/controllers/platformController.js`
4. Update frontend form in `frontend/src/components/InputForm.tsx`

### Changing Duplicate Detection Threshold

Edit `backend/src/services/duplicateDetector.js`:
```javascript
this.similarityThreshold = 0.75; // Change this value (0.0 - 1.0)
```

### Customizing UI Theme

Edit `frontend/tailwind.config.js` for colors and styling.

---

## 📈 Production Deployment

### Deploy Backend (Railway/Heroku)

1. Create account on Railway.app or Heroku
2. Connect your GitHub repository
3. Add environment variables
4. Deploy!

### Deploy Frontend (Vercel/Netlify)

1. Push code to GitHub
2. Import project on Vercel/Netlify
3. Add environment variable: `NEXT_PUBLIC_API_URL`
4. Deploy!

### Deploy Database

- **MongoDB Atlas**: Free tier available
- **Redis Cloud**: Free tier available

---

## 📚 Project Structure Overview

```
Platform Analyser/
├── backend/              # Express.js API
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── services/     # Business logic & scrapers
│   │   ├── routes/       # API routes
│   │   ├── config/       # Database, Redis, Logger
│   │   └── middleware/   # Error handling, rate limiting
│   └── package.json
│
├── frontend/             # Next.js React App
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Next.js pages
│   │   ├── services/     # API calls
│   │   └── styles/       # CSS styles
│   └── package.json
│
├── docker-compose.yml    # Docker orchestration
└── README.md            # This file!
```

---

## 🎓 For Your Resume

### How to Present This Project

**Project Title**: Multi-Platform Coding Analytics Dashboard with AI-Powered Duplicate Detection

**Key Highlights**:
- ✅ Full-stack MERN application (MongoDB, Express, React, Node.js)
- ✅ Integrated 4+ competitive programming platforms
- ✅ Implemented NLP-based duplicate detection algorithm
- ✅ Real-time data scraping and caching with Redis
- ✅ Responsive UI with data visualization (Chart.js/Recharts)
- ✅ RESTful API with rate limiting and error handling
- ✅ Docker containerization for easy deployment
- ✅ Production-ready with environment configuration

**Technologies Used**:
- **Frontend**: React, Next.js, TypeScript, Tailwind CSS, Recharts
- **Backend**: Node.js, Express.js, Axios, Cheerio, Puppeteer
- **AI/ML**: Natural (NLP), TF-IDF, Cosine Similarity
- **Database**: MongoDB, Redis
- **DevOps**: Docker, Docker Compose
- **APIs**: LeetCode GraphQL, CodeForces API, Web Scraping

---

## 🤝 Contributing

Feel free to fork, improve, and create pull requests!

---

## 📝 License

MIT License - feel free to use this project for your portfolio!

---

**Need Help?** Check the logs:
- Backend logs: `backend/logs/`
- Frontend console: Browser DevTools
- Docker logs: `docker-compose logs`

**Happy Coding! 🚀**
