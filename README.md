# 🚀 Platform Analyser - Multi-Platform Coding Analytics Dashboard

## Overview
A comprehensive web application that aggregates and analyzes coding profiles across multiple competitive programming platforms (LeetCode, GeeksforGeeks, CodeForces, HackerRank, etc.) with AI-powered duplicate question detection.

## 🎯 Key Features

### 1. **Multi-Platform Integration**
- LeetCode
- GeeksforGeeks (GFG)
- CodeForces
- HackerRank
- CodeChef
- AtCoder

### 2. **Intelligent Analytics**
- **Overall Summary**: Aggregated statistics across all platforms
- **Platform-Specific Analysis**: Detailed breakdown for each platform
- **Difficulty Distribution**: Easy, Medium, Hard question counts
- **Progress Tracking**: Submission history and streaks
- **Topic-wise Analysis**: Data Structures, Algorithms, etc.

### 3. **AI-Powered Duplicate Detection**
- Uses NLP (Natural Language Processing) to identify similar questions across platforms
- Cosine similarity with TF-IDF vectorization
- Optional: Integration with OpenAI/Gemini API for enhanced matching
- Unified question count (e.g., "N-Queens" problem counted once across all platforms)

### 4. **Visual Analytics**
- Interactive charts and graphs
- Comparative analysis between platforms
- Time-series progress tracking
- Heatmaps for submission patterns

## 🏗️ Tech Stack

### Frontend
- **Framework**: React.js with Next.js
- **Styling**: Tailwind CSS
- **Charts**: Recharts / Chart.js
- **State Management**: React Context / Redux
- **UI Components**: shadcn/ui

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (user data, cached results)
- **Caching**: Redis
- **Web Scraping**: Puppeteer, Cheerio, Axios
- **AI/ML**: 
  - TensorFlow.js / Python microservice
  - Natural (NLP library)
  - OpenAI API (optional)

### DevOps & Tools
- **API Documentation**: Swagger
- **Testing**: Jest, Supertest
- **Deployment**: Docker, Vercel/Netlify (Frontend), Railway/Heroku (Backend)
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
Platform-Analyser/
├── frontend/                  # Next.js React Application
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Dashboard/
│   │   │   ├── PlatformCard/
│   │   │   ├── Charts/
│   │   │   └── Analytics/
│   │   ├── pages/           # Next.js pages
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API service layer
│   │   ├── utils/           # Utility functions
│   │   └── styles/          # Global styles
│   └── package.json
│
├── backend/                  # Express.js API
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   │   ├── scrapers/   # Platform scrapers
│   │   │   │   ├── leetcode.js
│   │   │   │   ├── gfg.js
│   │   │   │   ├── codeforces.js
│   │   │   │   └── ...
│   │   │   ├── analyzer.js  # Data aggregation
│   │   │   └── duplicateDetector.js  # AI matching
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Auth, validation, etc.
│   │   ├── config/          # Configuration files
│   │   └── utils/           # Helper functions
│   ├── tests/               # Unit & integration tests
│   └── package.json
│
├── ml-service/              # Python microservice (optional)
│   ├── app.py
│   ├── models/
│   │   └── question_matcher.py
│   └── requirements.txt
│
├── docker-compose.yml
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB
- Redis (optional, for caching)
- Python 3.9+ (for ML service)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Platform-Analyser
```

2. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

3. **Install Backend Dependencies**
```bash
cd backend
npm install
```

4. **Setup Environment Variables**

Create `.env` files in both frontend and backend directories:

**Backend `.env`:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/platform-analyser
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key (optional)
NODE_ENV=development
```

**Frontend `.env.local`:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

5. **Start Development Servers**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

6. **Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📊 Core Features Implementation

### 1. User Profile Analysis
Users input profile URLs:
```
LeetCode: https://leetcode.com/username
CodeForces: https://codeforces.com/profile/username
GeeksforGeeks: https://auth.geeksforgeeks.org/user/username
```

### 2. Data Aggregation
- Fetch solved questions from each platform
- Extract: problem name, difficulty, topics, submission date
- Cache results to minimize API calls

### 3. Duplicate Detection Algorithm
```javascript
// Pseudocode
1. Extract all problem titles from all platforms
2. Preprocess text (lowercase, remove special chars)
3. Calculate TF-IDF vectors
4. Compute cosine similarity between all pairs
5. If similarity > threshold (0.85), mark as duplicate
6. Create unified problem list
```

### 4. Analytics Dashboard
- **Overall Stats**: Total unique problems, difficulty breakdown
- **Platform Comparison**: Side-by-side comparison
- **Progress Visualization**: Charts showing growth over time
- **Recommendations**: Weak areas, suggested problems

## 🎨 UI/UX Features

- **Dark/Light Mode**
- **Responsive Design** (Mobile-first)
- **Real-time Updates**
- **Export Reports** (PDF/CSV)
- **Share Analytics** (Public profile links)

## 🔐 Security Features

- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration
- Secure authentication (JWT)
- API key management

## 📈 Future Enhancements

- [ ] Contest calendar integration
- [ ] Peer comparison (compare with friends)
- [ ] AI-powered problem recommendations
- [ ] Browser extension for quick access
- [ ] Mobile app (React Native)
- [ ] Email notifications for milestones
- [ ] Integration with more platforms (LintCode, SPOJ)

## 🤝 Contributing

Contributions are welcome! Please read CONTRIBUTING.md for details.

## 📝 License

MIT License

## 👨‍💻 Author

Built by [Your Name] - [LinkedIn/GitHub Profile]

---

**Note**: This project is for educational purposes. Respect platform APIs and terms of service when scraping data.
