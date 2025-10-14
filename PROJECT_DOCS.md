# 🎓 Platform Analyser - Complete Project Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Features](#features)
5. [File Structure](#file-structure)
6. [API Documentation](#api-documentation)
7. [Setup Instructions](#setup-instructions)
8. [Usage Guide](#usage-guide)
9. [Contributing](#contributing)
10. [License](#license)

---

## 🎯 Project Overview

**Platform Analyser** is an advanced, full-stack web application designed to help competitive programmers track and analyze their coding progress across multiple platforms in one unified dashboard. The application features AI-powered duplicate detection to identify the same problems across different platforms, providing accurate statistics and insights.

### Problem Statement
Competitive programmers often maintain profiles on multiple platforms (LeetCode, CodeForces, GeeksforGeeks, HackerRank), making it difficult to:
- Track overall progress across all platforms
- Identify duplicate problems solved on multiple platforms
- Get a unified view of coding statistics
- Analyze strengths and weaknesses

### Solution
A comprehensive analytics dashboard that:
- Aggregates data from all major coding platforms
- Uses AI/NLP to detect duplicate problems
- Provides visual analytics and insights
- Offers platform-specific and overall summaries
- Runs in real-time with caching for performance

---

## 🏗️ Architecture

### High-Level Architecture

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Frontend  │ ◄─────► │   Backend    │ ◄─────► │  External   │
│  (Next.js)  │   API   │  (Express)   │   API   │  Platforms  │
└─────────────┘         └──────────────┘         └─────────────┘
                               │
                        ┌──────┴──────┐
                        │             │
                   ┌────▼────┐   ┌────▼────┐
                   │ MongoDB │   │  Redis  │
                   │         │   │ (Cache) │
                   └─────────┘   └─────────┘
```

### Component Architecture

**Frontend Layer**
- Next.js React Application
- Tailwind CSS for styling
- Recharts for data visualization
- Axios for API communication

**Backend Layer**
- Express.js REST API
- Platform scrapers (LeetCode, CodeForces, GFG, HackerRank)
- AI duplicate detection service
- Data aggregation service

**Data Layer**
- MongoDB for persistent storage
- Redis for caching and performance
- External platform APIs

**AI/ML Layer**
- Natural (NLP library)
- TF-IDF vectorization
- Cosine similarity algorithm
- String similarity matching

---

## 💻 Technology Stack

### Frontend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.x | UI framework |
| Next.js | 14.x | React framework with SSR |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.x | Utility-first CSS |
| Recharts | 2.x | Data visualization |
| Axios | 1.x | HTTP client |
| React Hot Toast | 2.x | Notifications |

### Backend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18.x | Runtime environment |
| Express.js | 4.x | Web framework |
| MongoDB | 5.x | NoSQL database |
| Mongoose | 8.x | MongoDB ODM |
| Redis | 4.x | Caching layer |
| Natural | 6.x | NLP library |
| Axios | 1.x | HTTP requests |
| Cheerio | 1.x | HTML parsing |
| Puppeteer | 21.x | Headless browser |
| Winston | 3.x | Logging |

### DevOps & Tools
| Technology | Purpose |
|------------|---------|
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |
| Git | Version control |
| ESLint | Code linting |
| Jest | Testing framework |

---

## ✨ Features

### Core Features

1. **Multi-Platform Integration** ✅
   - LeetCode (GraphQL API)
   - CodeForces (REST API)
   - GeeksforGeeks (Web scraping)
   - HackerRank (API)

2. **AI-Powered Duplicate Detection** 🤖
   - NLP-based text analysis
   - TF-IDF vectorization
   - Cosine similarity algorithm
   - 75% similarity threshold
   - Automatic deduplication

3. **Unified Analytics Dashboard** 📊
   - Overall statistics across all platforms
   - Difficulty-wise breakdown (Easy, Medium, Hard)
   - Platform-specific analysis
   - Unique vs duplicate problem count
   - Visual charts and graphs

4. **Performance Optimization** ⚡
   - Redis caching (1-hour TTL)
   - Concurrent API requests
   - Rate limiting protection
   - Response compression
   - Error handling and retry logic

5. **User Experience** 🎨
   - Responsive design (mobile, tablet, desktop)
   - Dark mode support
   - Real-time loading states
   - Toast notifications
   - Intuitive UI/UX

6. **Developer Features** 🛠️
   - RESTful API design
   - Comprehensive error handling
   - Logging system (Winston)
   - Docker containerization
   - Environment configuration
   - API documentation

---

## 📁 File Structure

```
Platform Analyser/
│
├── backend/                        # Backend Express.js Application
│   ├── src/
│   │   ├── config/                # Configuration files
│   │   │   ├── database.js       # MongoDB connection
│   │   │   ├── redis.js          # Redis connection & helpers
│   │   │   └── logger.js         # Winston logger setup
│   │   │
│   │   ├── controllers/           # Request handlers
│   │   │   ├── analyserController.js    # Analysis endpoints
│   │   │   └── platformController.js    # Platform endpoints
│   │   │
│   │   ├── services/              # Business logic
│   │   │   ├── scrapers/         # Platform scrapers
│   │   │   │   ├── leetcodeScraper.js
│   │   │   │   ├── codeforcesScraper.js
│   │   │   │   ├── gfgScraper.js
│   │   │   │   └── hackerrankScraper.js
│   │   │   ├── analyserService.js      # Main analysis logic
│   │   │   └── duplicateDetector.js    # AI duplicate detection
│   │   │
│   │   ├── routes/                # API routes
│   │   │   ├── index.js          # Root router
│   │   │   ├── analyser.js       # Analysis routes
│   │   │   └── platforms.js      # Platform routes
│   │   │
│   │   ├── middleware/            # Express middleware
│   │   │   ├── errorHandler.js   # Error handling
│   │   │   └── rateLimiter.js    # Rate limiting
│   │   │
│   │   └── index.js              # Main server file
│   │
│   ├── logs/                      # Log files
│   ├── .env.example              # Environment variables template
│   ├── .gitignore               # Git ignore rules
│   ├── package.json             # Dependencies
│   └── Dockerfile               # Docker configuration
│
├── frontend/                      # Frontend Next.js Application
│   ├── public/                   # Static assets
│   ├── src/
│   │   ├── components/           # React components
│   │   │   ├── Header.tsx       # Navigation header
│   │   │   ├── Footer.tsx       # Footer
│   │   │   ├── InputForm.tsx    # Profile input form
│   │   │   ├── Dashboard.tsx    # Main dashboard
│   │   │   ├── StatsOverview.tsx      # Statistics cards
│   │   │   ├── PlatformCards.tsx      # Platform-specific cards
│   │   │   ├── ChartsSection.tsx      # Charts & graphs
│   │   │   └── DuplicateAnalysis.tsx  # AI detection display
│   │   │
│   │   ├── pages/               # Next.js pages
│   │   │   ├── _app.tsx        # App wrapper
│   │   │   ├── _document.tsx   # Document structure
│   │   │   └── index.tsx       # Home page
│   │   │
│   │   ├── services/            # API services
│   │   │   └── api.ts          # API client
│   │   │
│   │   └── styles/             # Stylesheets
│   │       └── globals.css     # Global styles
│   │
│   ├── .env.local.example      # Environment variables
│   ├── next.config.js          # Next.js configuration
│   ├── tailwind.config.js      # Tailwind CSS config
│   ├── tsconfig.json           # TypeScript config
│   ├── package.json            # Dependencies
│   └── Dockerfile              # Docker configuration
│
├── docker-compose.yml           # Docker Compose orchestration
├── .gitignore                  # Git ignore rules
├── package.json                # Root dependencies
├── setup.bat                   # Windows setup script
├── start.bat                   # Windows start script
├── README.md                   # Project overview
├── SETUP_GUIDE.md             # Detailed setup instructions
├── RESUME_GUIDE.md            # Resume/interview guide
└── PROJECT_DOCS.md            # This file
```

---

## 🔌 API Documentation

### Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

### Endpoints

#### 1. Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-01-15T10:00:00.000Z",
  "uptime": 3600,
  "environment": "development"
}
```

---

#### 2. Analyze Profiles
Analyze user profiles across multiple platforms.

```http
POST /api/analyser/analyze
```

**Request Body:**
```json
{
  "profiles": {
    "leetcode": "username_or_url",
    "codeforces": "username_or_url",
    "gfg": "username_or_url",
    "hackerrank": "username_or_url"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "platforms": {
      "leetcode": {
        "platform": "leetcode",
        "username": "user123",
        "profile": {...},
        "stats": {
          "easy": 150,
          "medium": 200,
          "hard": 50,
          "total": 400
        }
      },
      "codeforces": {...},
      "gfg": {...},
      "hackerrank": {...}
    },
    "overall": {
      "stats": {
        "easy": 300,
        "medium": 400,
        "hard": 100,
        "total": 800,
        "unique": 560
      },
      "uniqueProblems": 560,
      "duplicates": 240,
      "platformsAnalyzed": 4,
      "metrics": {...}
    },
    "duplicateAnalysis": {
      "totalProblems": 800,
      "estimatedUniqueProblems": 560,
      "estimatedDuplicates": 240,
      "overlapRate": "30%"
    },
    "timestamp": "2025-01-15T10:00:00.000Z"
  }
}
```

---

#### 3. Get Supported Platforms
Get list of all supported platforms.

```http
GET /api/platforms
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "leetcode",
      "name": "LeetCode",
      "url": "https://leetcode.com",
      "urlFormat": "https://leetcode.com/username",
      "supported": true
    },
    {...}
  ]
}
```

---

#### 4. Fetch Individual Platform
Fetch data from a single platform.

```http
POST /api/platforms/:platform
```

**Supported platforms:** `leetcode`, `codeforces`, `gfg`, `hackerrank`

**Request Body:**
```json
{
  "username": "your_username"
}
```

**Response:**
```json
{
  "success": true,
  "platform": "leetcode",
  "data": {
    "platform": "leetcode",
    "username": "user123",
    "profile": {...},
    "stats": {...}
  }
}
```

---

### Error Responses

**400 Bad Request:**
```json
{
  "success": false,
  "error": "Invalid input. Expected profiles object with platform URLs."
}
```

**404 Not Found:**
```json
{
  "success": false,
  "error": "User not found"
}
```

**429 Too Many Requests:**
```json
{
  "success": false,
  "error": "Too many requests from this IP, please try again later."
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": "Internal server error message"
}
```

---

## 🚀 Setup Instructions

### Quick Setup (Windows)

1. **Run Setup Script:**
```bash
setup.bat
```

2. **Start Servers:**
```bash
start.bat
```

3. **Access Application:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### Manual Setup

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions.

### Docker Setup

```bash
docker-compose up -d
```

---

## 📖 Usage Guide

### For Users

1. **Open Application:** Navigate to http://localhost:3000
2. **Enter Profiles:** Input your usernames or profile URLs
3. **Analyze:** Click "Analyze My Profiles"
4. **View Results:** Explore your analytics dashboard
5. **Export:** Download reports or share your profile

### For Developers

1. **API Testing:** Use Postman or curl to test endpoints
2. **Logs:** Check `backend/logs/` for detailed logs
3. **Cache:** Monitor Redis for cached data
4. **Database:** Use MongoDB Compass for database inspection

---

## 🤝 Contributing

### How to Contribute

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Coding Standards

- Use ESLint for code linting
- Follow TypeScript best practices
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation

---

## 📄 License

MIT License - See LICENSE file for details

---

## 👨‍💻 Author

Built by [Your Name]
- GitHub: [@yourusername]
- LinkedIn: [your-linkedin]
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- LeetCode, CodeForces, GeeksforGeeks, HackerRank for data
- Open source community for amazing libraries
- Contributors and testers

---

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Email: support@platformanalyser.com
- Documentation: See README and SETUP_GUIDE

---

**Happy Coding! 🚀**
