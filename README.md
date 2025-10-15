# 🚀 Platform Analyser

A comprehensive web application for analyzing coding profiles across multiple competitive programming platforms. Get unified statistics, track your progress, and discover duplicate problems you've solved.

**� Live Demo:** [https://coding-platform-analyzer.vercel.app](https://coding-platform-analyzer.vercel.app)

**🔗 API Backend:** [https://platform-analyser-backend.onrender.com](https://platform-analyser-backend.onrender.com)

---

## ✨ Features

- **Multi-Platform Support** - Analyze LeetCode, CodeForces, and GeeksforGeeks profiles in one place
- **Unified Statistics** - See your total problems solved across all platforms
- **Duplicate Detection** - Find which problems you've solved multiple times on different platforms
- **AI-Powered Insights** - Get personalized feedback on your coding journey
- **Visual Analytics** - Beautiful charts showing your progress and difficulty distribution
- **Export Options** - Download your statistics as PDF or Excel, or share with a link

## 🎯 Supported Platforms

- ✅ LeetCode
- ✅ CodeForces
- ✅ GeeksforGeeks (GFG)

## �️ Tech Stack

**Frontend:**
- Next.js 14 with TypeScript
- Tailwind CSS for styling
- Recharts for data visualization
- jsPDF & xlsx for exports

**Backend:**
- Python with FastAPI
- MongoDB Atlas for data storage
- Beautiful Soup for web scraping
- Sentence Transformers for AI analysis

**Deployment:**
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- MongoDB (local or Atlas)

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/Aayush9808/Coding-Platform-Analyzer.git
cd Coding-Platform-Analyzer
```

2. **Setup Backend**
```bash
cd backend
pip install -r requirements.txt
python app.py
```

3. **Setup Frontend**
```bash
cd frontend
npm install
npm run dev
```

4. **Environment Variables**

Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Backend uses MongoDB connection from environment or defaults to localhost.

## � Screenshots

Visit the live demo to see it in action!

## 🎯 How It Works

1. Enter your usernames for LeetCode, CodeForces, and/or GeeksforGeeks
2. Click "Analyze Profiles" and wait while we fetch your data
3. View your unified statistics, platform breakdowns, and AI insights
4. Export or share your results

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## � License

MIT License - feel free to use this project for learning or personal use.

## 👨‍� Created By

**Aayush Shrivastav**

Built with ❤️ using React, Next.js, Python & AI

---

⭐ If you find this project useful, please consider giving it a star!
