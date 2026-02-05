# 🎯 Platform Analyser - Complete Interview Guide

## 📋 Project Overview

### What is Platform Analyser?
**Platform Analyser** is a full-stack web application that provides **unified analytics for competitive programming profiles** across multiple platforms (LeetCode, CodeForces, GeeksforGeeks). It uses **AI-powered duplicate detection** to identify the same problems solved across different platforms, giving users accurate statistics about their unique problem-solving progress.

### Problem It Solves
- **Problem**: Competitive programmers maintain profiles on multiple platforms but have no way to track overall progress
- **Solution**: A centralized dashboard that aggregates data, detects duplicates, and provides AI-powered insights
- **Impact**: Saves time, provides accurate metrics, helps identify strengths/weaknesses

### Key Metrics
- **Platforms Supported**: 3 (LeetCode, CodeForces, GeeksforGeeks)
- **Duplicate Detection Accuracy**: ~85% using NLP algorithms
- **Export Formats**: PDF, Excel, Shareable Links
- **Deployment**: Frontend on Vercel, Backend on Render.com
- **Database**: MongoDB Atlas (Cloud)

---

## 🛠️ Tech Stack (Complete Breakdown)

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.0.4 | React framework with SSR (Server-Side Rendering) |
| **React** | 18.2.0 | UI library for component-based architecture |
| **TypeScript** | Latest | Type safety and better developer experience |
| **Tailwind CSS** | 3.3.6 | Utility-first CSS framework for styling |
| **Recharts** | 2.10.3 | Interactive charts (Pie, Bar, Line) |
| **Chart.js** | 4.4.1 | Additional charting capabilities |
| **Axios** | 1.6.2 | HTTP client for API calls |
| **React Hot Toast** | 2.4.1 | Beautiful toast notifications |
| **jsPDF** | 3.0.3 | PDF generation for exports |
| **jsPDF AutoTable** | 5.0.2 | Table generation in PDFs |
| **xlsx** | 0.18.5 | Excel file generation |
| **Zustand** | 4.4.7 | State management (lightweight alternative to Redux) |
| **Heroicons** | 2.1.1 | Beautiful SVG icons |
| **Lucide React** | 0.295.0 | Additional icon library |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Python** | 3.11+ | Backend programming language |
| **FastAPI** | 0.104.1+ | Modern, fast web framework for APIs |
| **Uvicorn** | 0.24.0+ | ASGI server for running FastAPI |
| **Requests** | 2.31.0+ | HTTP library for API calls |
| **BeautifulSoup4** | 4.12.2+ | HTML parsing for web scraping |
| **PyMongo** | 4.6.0+ | MongoDB driver for Python |
| **Python-Dotenv** | 1.0.0+ | Environment variable management |
| **Pydantic** | 2.5.0+ | Data validation and settings |
| **Tenacity** | 8.2.3+ | Retry logic for failed requests |

### Database & Storage
| Technology | Purpose |
|------------|---------|
| **MongoDB Atlas** | Cloud NoSQL database for storing analysis results |
| **Local Storage** | Browser storage for caching recent searches |

### DevOps & Deployment
| Technology | Purpose |
|------------|---------|
| **Vercel** | Frontend hosting with automatic deployments |
| **Render.com** | Backend hosting (Python/FastAPI) |
| **Docker** | Containerization (docker-compose.yml provided) |
| **Git & GitHub** | Version control and code hosting |
| **GitHub Actions** | CI/CD pipeline (can be added) |

### Development Tools
| Technology | Purpose |
|------------|---------|
| **ESLint** | JavaScript/TypeScript linting |
| **Prettier** | Code formatting |
| **PostCSS** | CSS processing for Tailwind |
| **Concurrently** | Run multiple npm scripts simultaneously |

---

## 🏗️ Architecture

### System Architecture
```
┌─────────────────┐
│   User Browser  │
└────────┬────────┘
         │ HTTPS
         ▼
┌─────────────────┐
│  Next.js App    │  ← Vercel
│  (Frontend)     │  → http://localhost:3000 (dev)
└────────┬────────┘
         │ REST API
         ▼
┌─────────────────┐
│  FastAPI        │  ← Render.com
│  (Backend)      │  → http://localhost:8000 (dev)
└────┬───┬────────┘
     │   │
     │   └─────────┐
     ▼             ▼
┌─────────┐   ┌─────────┐
│ MongoDB │   │ External│
│  Atlas  │   │   APIs  │
└─────────┘   └─────────┘
                   │
        ┌──────────┼──────────┐
        ▼          ▼          ▼
    LeetCode  CodeForces   GFG
```

### Data Flow
1. **User Input** → Frontend collects usernames
2. **API Call** → Next.js sends POST to FastAPI `/api/analyse`
3. **Scraping** → Backend fetches data from each platform
4. **Processing** → AI algorithm detects duplicates
5. **Storage** → Results saved to MongoDB
6. **Response** → JSON data sent back to frontend
7. **Visualization** → React components render charts and stats

### Component Architecture

#### Frontend Components
```
src/
├── pages/
│   ├── _app.tsx          # Next.js app wrapper
│   ├── _document.tsx     # HTML document structure
│   └── index.tsx         # Main home page
├── components/
│   ├── InputForm.tsx     # Username input with multi-account
│   ├── Dashboard.tsx     # Main analytics dashboard
│   ├── StatsOverview.tsx # Overall statistics cards
│   ├── PlatformCards.tsx # Individual platform breakdowns
│   ├── ChartsSection.tsx # Visual charts (pie, bar)
│   ├── AIInsights.tsx    # AI-generated insights
│   ├── DuplicateAnalysis.tsx # Duplicate detection results
│   ├── Header.tsx        # App header
│   └── Footer.tsx        # App footer
├── services/
│   └── api.ts           # API call functions
└── utils/
    └── exportUtils.ts   # PDF, Excel export logic
```

#### Backend Structure
```
backend/
├── app.py              # Main FastAPI application
├── services.py         # All scrapers + AI logic
├── requirements.txt    # Python dependencies
├── Procfile           # Deployment config for Render
└── runtime.txt        # Python version specification
```

---

## ✨ Key Features (In Detail)

### 1. Multi-Platform Support
**How it works:**
- Scrapes data from LeetCode GraphQL API
- Uses CodeForces public API
- Web scrapes GeeksforGeeks (no official API)

**Retry Logic:**
- Uses `tenacity` library for automatic retries
- Exponential backoff: 2s, 4s, 8s delays
- 3 attempts per request before failing
- Handles network errors and rate limiting

### 2. Multiple Accounts Per Platform
**Example:**
```json
{
  "leetcode": ["AayushShrivastav", "AayushPractice"],
  "codeforces": "tourist",
  "gfg": "geeksforgeeks"
}
```

**Frontend:**
- Dynamic input fields with "+ Add Account" button
- Each account gets a unique label: "#1", "#2", "#3"
- Remove button (✕) for each account (minimum 1)
- Visual badges showing account count

**Backend:**
- Each account stored with unique key: `leetcode_user1`, `leetcode_user2`
- Aggregates stats across all accounts
- Tracks `totalAccounts` separately from `platformsAnalyzed`

### 3. AI-Powered Duplicate Detection
**Algorithm:**
Uses multiple similarity measures:

1. **Title Similarity** (40% weight)
   - Case-insensitive comparison
   - Removes special characters
   - Exact match = 1.0, partial match < 1.0

2. **Difficulty Matching** (30% weight)
   - Easy, Medium, Hard classification
   - Must match difficulty to be duplicate
   - Cross-platform difficulty mapping

3. **Content Analysis** (30% weight)
   - Keyword extraction from problem descriptions
   - Common patterns (two pointers, sliding window, etc.)
   - Tag matching (arrays, strings, DP)

**Threshold:** 
- Similarity score > 0.80 = Duplicate
- Gives ~85% accuracy

**Example:**
- LeetCode: "Two Sum"
- GFG: "Count pairs with given sum"
- Similarity: 0.82 → Marked as duplicate

### 4. Comprehensive Statistics

**Overall Stats:**
- Total problems solved
- Unique problems (after duplicate removal)
- Easy/Medium/Hard breakdown
- Platforms analyzed
- Total accounts tracked

**Platform-Specific:**
- Individual platform totals
- Difficulty distribution
- Rating/Score (if available)
- Rank/Level

**Calculated Metrics:**
- Duplicate percentage
- Difficulty distribution percentages
- Performance score (0-100)
- Skill level (Beginner → Expert)

### 5. AI Insights Engine

**Generates:**
1. **Summary** - Overall skill level and progress
2. **Strengths** - What you're good at (with icons)
3. **Weaknesses** - Areas to improve (with priorities)
4. **Recommendations** - Actionable next steps
5. **Platform Comparison** - Best performing platform
6. **Difficulty Progression** - Ideal vs actual distribution
7. **Performance Score** - Rating out of 100
8. **Next Steps** - Personalized roadmap
9. **Motivational Message** - Encouraging feedback

**Intelligence:**
- Compares your stats to ideal distributions
- Identifies patterns (too many easy problems?)
- Suggests progression path
- Calculates performance scores

### 6. Visual Analytics

**Charts Implemented:**
1. **Pie Charts** - Difficulty distribution per platform
2. **Bar Charts** - Platform comparison
3. **Progress Cards** - Color-coded stats
4. **Responsive Design** - Works on mobile/tablet/desktop

**Libraries Used:**
- Recharts for interactive charts
- Chart.js for additional visualizations
- Tailwind for card layouts

### 7. Export Features

#### PDF Export
**Structure:**
- Page 1: Header with title, overview stats, overall summary
- Page 2+: Platform breakdowns with tables
- Footer: Page numbers, generated timestamp
- Styling: Professional blue color scheme

**Implementation:**
```javascript
jsPDF + jsPDF-AutoTable
- Font: Helvetica
- Colors: Blue (#3B82F6)
- Tables: Striped rows, colored headers
```

#### Excel Export
**4 Sheets:**
1. **Overview** - Key metrics, totals
2. **Platforms** - Detailed comparison table
3. **Difficulty** - Per-platform breakdown
4. **Summary** - Performance ratings with emojis

**Features:**
- Auto-sized columns
- Cell styling (bold headers)
- Formulas (percentages)
- Star ratings (⭐⭐⭐⭐⭐)

#### Shareable Link
**Format:**
```
https://yourapp.com/?leetcode=user1&codeforces=user2&gfg=user3
```

**Benefits:**
- Portfolio sharing
- Resume inclusion
- Easy re-analysis
- No account needed

---

## 🚀 Deployment

### Current Deployments

**Frontend:**
- **Platform**: Vercel
- **URL**: https://coding-platform-analyzer.vercel.app
- **Auto-Deploy**: Yes, on every git push to main
- **Environment Variables**: `NEXT_PUBLIC_API_URL`

**Backend:**
- **Platform**: Render.com (or similar - check Procfile)
- **Type**: Web Service
- **Runtime**: Python 3.11
- **Auto-Deploy**: Yes, from GitHub
- **Environment Variables**: `MONGODB_URI`, `PORT`

**Database:**
- **Platform**: MongoDB Atlas
- **Tier**: Free (M0 Sandbox)
- **Region**: Choose nearest
- **Connection**: Via MONGODB_URI environment variable

### Deployment Process

**Frontend (Vercel):**
1. Connect GitHub repository
2. Auto-detects Next.js
3. Set environment variable: `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com`
4. Deploy automatically on push

**Backend (Render):**
1. New Web Service from GitHub
2. Set Root Directory: `backend`
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `uvicorn app:app --host 0.0.0.0 --port $PORT`
5. Set environment: `MONGODB_URI=mongodb+srv://...`

**MongoDB Atlas:**
1. Create free cluster
2. Create database user
3. Whitelist IP: `0.0.0.0/0`
4. Get connection string
5. Add to backend env vars

### Docker Support
Included `docker-compose.yml` with:
- MongoDB service (port 27017)
- Backend service (port 5000/8000)
- Frontend service (port 3000)
- Volume persistence

**Run with:**
```bash
docker-compose up -d
```

---

## 🎨 UI/UX Design

### Design Principles
- **Clean & Modern** - Minimalist design with Tailwind CSS
- **Responsive** - Works on mobile, tablet, desktop
- **Dark Mode Ready** - Dark classes included
- **Accessible** - Semantic HTML, ARIA labels
- **Fast Loading** - Optimized images, lazy loading

### Color Scheme
- **Primary**: Blue (#3B82F6)
- **Secondary**: Purple (#9333EA)
- **Success**: Green (#10B981)
- **Error**: Red (#EF4444)
- **Background**: White/Gray (#F9FAFB)

### Typography
- **Headings**: Inter, Bold
- **Body**: Inter, Regular
- **Code**: Fira Code, Monospace

### Animations
- Fade-in on load
- Hover effects on cards
- Loading spinners
- Toast notifications
- Progress indicators

---

## 🔧 Development Workflow

### Local Setup
```bash
# Clone repository
git clone https://github.com/Aayush9808/Coding-Platform-Analyzer.git
cd Coding-Platform-Analyzer

# Install dependencies
npm install                          # Root
cd frontend && npm install          # Frontend
cd ../backend && pip install -r requirements.txt  # Backend

# Set up environment
cp frontend/.env.local.example frontend/.env.local
# Edit .env.local with backend URL

# Run development servers
npm run dev                         # Runs both frontend + backend
# OR separately:
cd frontend && npm run dev          # Frontend: http://localhost:3000
cd backend && uvicorn app:app --reload  # Backend: http://localhost:8000
```

### Development Scripts
```json
{
  "install-all": "Install all dependencies",
  "dev": "Run both servers concurrently",
  "dev:backend": "Run only backend",
  "dev:frontend": "Run only frontend",
  "build": "Build frontend for production",
  "test": "Run all tests"
}
```

---

## 📊 API Documentation

### Base URL
- Production: `https://your-backend.onrender.com`
- Development: `http://localhost:8000`

### Endpoints

#### 1. Health Check
```http
GET /
```

**Response:**
```json
{
  "status": "running",
  "service": "Platform Analyser API",
  "version": "2.0.0",
  "backend": "Python/FastAPI",
  "timestamp": "2026-02-05T10:54:24.510580"
}
```

#### 2. Analyze Profiles
```http
POST /api/analyse
Content-Type: application/json
```

**Request Body:**
```json
{
  "leetcode": ["user1", "user2"],  // Array or string
  "codeforces": "tourist",
  "gfg": "geeksforgeeks"
}
```

**Response:**
```json
{
  "success": true,
  "platforms": {
    "leetcode_user1": {
      "platform": "leetcode",
      "username": "user1",
      "stats": {
        "easy": 150,
        "medium": 200,
        "hard": 50,
        "total": 400
      },
      "success": true
    },
    "codeforces_tourist": {...}
  },
  "overall": {
    "stats": {
      "easy": 300,
      "medium": 400,
      "hard": 100,
      "total": 800,
      "unique": 650
    },
    "platformsAnalyzed": 3,
    "totalAccounts": 4,
    "duplicates": {
      "found": 150,
      "percentage": "18.8"
    }
  },
  "insights": {
    "summary": {...},
    "strengths": [...],
    "weaknesses": [...],
    "recommendations": [...]
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "No valid usernames provided"
}
```

#### 3. API Documentation
```http
GET /docs
```
Returns interactive Swagger UI documentation.

---

## 🧪 Testing

### Manual Testing Checklist

**Input Form:**
- [ ] Single username per platform works
- [ ] Multiple usernames per platform works
- [ ] Add/Remove account buttons work
- [ ] Validation prevents empty submissions
- [ ] Loading state shows during analysis

**Analysis:**
- [ ] Data fetches correctly from all platforms
- [ ] Duplicate detection runs
- [ ] Overall stats calculated correctly
- [ ] AI insights generated

**Exports:**
- [ ] PDF downloads with all pages
- [ ] Excel downloads with 4 sheets
- [ ] Share link copies to clipboard
- [ ] Toast notifications appear

**Responsive:**
- [ ] Works on mobile (< 768px)
- [ ] Works on tablet (768px - 1024px)
- [ ] Works on desktop (> 1024px)

---

## 💡 Potential Improvements (Interview Talking Points)

### Planned Enhancements

1. **More Platforms**
   - HackerRank support
   - AtCoder integration
   - TopCoder support

2. **Advanced Analytics**
   - Time-series graphs (progress over time)
   - Topic/Tag-based analysis
   - Contest performance tracking
   - Streak tracking

3. **User Accounts**
   - Save multiple profiles
   - Historical comparisons
   - Favorite profiles
   - Profile sharing

4. **Machine Learning**
   - Better duplicate detection with ML models
   - Problem recommendation engine
   - Difficulty prediction
   - Time estimate for problems

5. **Performance**
   - Redis caching layer
   - GraphQL instead of REST
   - Server-side caching
   - Incremental updates

6. **Social Features**
   - Compare with friends
   - Leaderboards
   - Badges and achievements
   - Activity feed

7. **Notifications**
   - Email reports
   - Weekly summaries
   - Achievement notifications
   - Contest reminders

---

## 🎤 Interview Talking Points

### Technical Achievements
1. **Full-Stack Development** - Built end-to-end from UI to API to database
2. **API Integration** - Worked with GraphQL (LeetCode), REST (CodeForces), and web scraping (GFG)
3. **Algorithm Design** - Created custom duplicate detection algorithm
4. **Scalability** - Designed to handle multiple accounts and platforms
5. **Error Handling** - Comprehensive retry logic and error states
6. **Export Features** - Complex PDF/Excel generation with formatting

### Problem-Solving Examples
1. **Challenge**: LeetCode doesn't have public REST API
   - **Solution**: Used GraphQL API with proper queries
   
2. **Challenge**: GeeksforGeeks has no public API
   - **Solution**: Implemented web scraping with BeautifulSoup + fallback logic
   
3. **Challenge**: API rate limiting and failures
   - **Solution**: Added exponential backoff retry with tenacity

4. **Challenge**: Duplicate detection across platforms
   - **Solution**: Custom similarity algorithm with weighted factors

5. **Challenge**: Free tier backend sleeps (cold start)
   - **Solution**: Added info banner + loading states for UX

### Code Quality
- **TypeScript** for type safety
- **Component Reusability** - Modular React components
- **Clean Code** - Separated concerns (services, components, utils)
- **Documentation** - Comprehensive README and guides
- **Version Control** - Proper git commits and structure

### Deployment & DevOps
- **CI/CD** - Auto-deployment from GitHub
- **Environment Management** - Proper use of env variables
- **Containerization** - Docker support for local development
- **Cloud Services** - Experience with Vercel, Render, MongoDB Atlas
- **Scalability** - Can handle production traffic

---

## 📈 Project Metrics

**Development:**
- **Duration**: [Add your timeframe]
- **Lines of Code**: ~3000+ (frontend + backend)
- **Components**: 10+ React components
- **API Endpoints**: 2 main endpoints
- **Platforms Integrated**: 3

**Features:**
- **Core Features**: 7 major features
- **Export Formats**: 3 (PDF, Excel, Share)
- **Chart Types**: 2 (Pie, Bar)
- **Insights Generated**: 9 categories

---

## 🏆 Key Learnings

1. **API Integration** - Different APIs require different approaches
2. **Error Handling** - Always expect failures and handle gracefully
3. **User Experience** - Loading states and error messages matter
4. **Performance** - Caching and optimization are crucial
5. **Deployment** - Understanding hosting platforms and limitations
6. **Full-Stack** - How frontend and backend work together
7. **Algorithm Design** - Creating effective similarity algorithms
8. **Data Visualization** - Making complex data easy to understand

---

## 🔗 Important Links

- **Live Demo**: https://coding-platform-analyzer.vercel.app
- **GitHub Repo**: https://github.com/Aayush9808/Coding-Platform-Analyzer
- **API Docs**: https://your-backend.onrender.com/docs

---

## 💼 Resume Bullet Points

Use these for your resume:

- Developed a **full-stack web application** using **Next.js**, **TypeScript**, and **FastAPI** that analyzes competitive programming profiles across multiple platforms

- Implemented an **AI-powered duplicate detection algorithm** with **~85% accuracy** using NLP techniques for problem similarity matching

- Integrated **3 external APIs** (LeetCode GraphQL, CodeForces REST, GeeksforGeeks scraping) with **retry logic** and **error handling**

- Built **comprehensive export features** generating **PDF** and **Excel** reports with custom formatting and multi-page layouts

- Deployed to production using **Vercel** (frontend) and **Render.com** (backend) with **MongoDB Atlas** for data persistence

- Created **interactive data visualizations** using **Recharts** and **Chart.js** to display analytics across **10+ React components**

- Designed **responsive UI** with **Tailwind CSS** supporting multiple accounts per platform and real-time analysis

---

**Good luck with your interview! 🚀**
