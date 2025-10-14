"""
Platform Analyser - FastAPI Backend
Main application with CORS, MongoDB, and analysis endpoints
"""

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Dict, List, Union, Optional, Any
from pymongo import MongoClient
import os
from datetime import datetime
import uvicorn
from services import analyzer_service

# FastAPI app
app = FastAPI(
    title="Platform Analyser API",
    description="Multi-platform coding profile analyzer with AI insights",
    version="2.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "https://coding-platform-analyzer.vercel.app",
        "https://*.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DATABASE_NAME = "platform_analyser"

try:
    mongo_client = MongoClient(MONGO_URI)
    db = mongo_client[DATABASE_NAME]
    analyses_collection = db["analyses"]
    print(f"✅ Connected to MongoDB at {MONGO_URI}")
except Exception as e:
    print(f"❌ MongoDB connection failed: {e}")
    db = None
    analyses_collection = None


# Request models
class AnalyseRequest(BaseModel):
    model_config = {"json_schema_extra": {
        "example": {
            "profiles": {
                "leetcode": ["AayushShrivastav", "username2"],
                "codeforces": "tourist",
                "gfg": "ashrivas537s"
            }
        }
    }}
    
    profiles: Dict[str, Union[str, List[str]]]


# Response model
class AnalysisResponse(BaseModel):
    platforms: Dict[str, Any]
    overall: Dict[str, Any]
    duplicateAnalysis: Optional[Dict[str, Any]]
    aiInsights: Optional[Dict[str, Any]]
    timestamp: str


# ============================================================================
# ROUTES
# ============================================================================

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "running",
        "service": "Platform Analyser API",
        "version": "2.0.0",
        "backend": "Python/FastAPI",
        "timestamp": datetime.now().isoformat()
    }


@app.get("/health")
async def health_check():
    """Detailed health check"""
    mongo_status = "connected" if db is not None else "disconnected"
    
    return {
        "status": "healthy",
        "database": mongo_status,
        "supportedPlatforms": ["leetcode", "codeforces", "gfg"],
        "timestamp": datetime.now().isoformat()
    }


@app.post("/api/analyse", response_model=AnalysisResponse)
async def analyze_profiles(request: AnalyseRequest):
    """
    Analyze coding profiles from multiple platforms
    
    Supports:
    - LeetCode
    - CodeForces
    - GeeksforGeeks (GFG)
    
    Can accept:
    - Single username per platform: {"leetcode": "username"}
    - Multiple usernames per platform: {"leetcode": ["user1", "user2"]}
    - URLs or usernames
    """
    try:
        profiles = request.profiles
        
        if not profiles:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No profiles provided"
            )
        
        # Validate platforms
        supported_platforms = {'leetcode', 'codeforces', 'gfg'}
        invalid_platforms = set(profiles.keys()) - supported_platforms
        
        if invalid_platforms:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Unsupported platforms: {', '.join(invalid_platforms)}. Supported: {', '.join(supported_platforms)}"
            )
        
        print(f"📊 Analyzing profiles: {profiles}")
        
        # Perform analysis
        analysis_result = analyzer_service.analyze_multiple_platforms(profiles)
        
        # Save to MongoDB
        if analyses_collection is not None:
            try:
                analysis_doc = {
                    **analysis_result,
                    "createdAt": datetime.now()
                }
                analyses_collection.insert_one(analysis_doc)
                print("💾 Analysis saved to MongoDB")
            except Exception as e:
                print(f"⚠️ Failed to save to MongoDB: {e}")
        
        return analysis_result
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Analysis error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Analysis failed: {str(e)}"
        )


@app.get("/api/platforms")
async def get_supported_platforms():
    """Get list of supported platforms"""
    return {
        "platforms": [
            {
                "id": "leetcode",
                "name": "LeetCode",
                "description": "Practice coding problems and prepare for interviews",
                "urlFormat": "https://leetcode.com/u/{username}"
            },
            {
                "id": "codeforces",
                "name": "CodeForces",
                "description": "Competitive programming contests and practice",
                "urlFormat": "https://codeforces.com/profile/{username}"
            },
            {
                "id": "gfg",
                "name": "GeeksforGeeks",
                "description": "Practice data structures and algorithms",
                "urlFormat": "https://www.geeksforgeeks.org/user/{username}"
            }
        ]
    }


@app.get("/api/history")
async def get_analysis_history(limit: int = 10):
    """Get recent analysis history from MongoDB"""
    if analyses_collection is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database not available"
        )
    
    try:
        analyses = list(
            analyses_collection
            .find({}, {"_id": 0})
            .sort("createdAt", -1)
            .limit(limit)
        )
        return {"analyses": analyses, "count": len(analyses)}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch history: {str(e)}"
        )


# Error handlers
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={
            "error": "Not Found",
            "message": "The requested endpoint does not exist",
            "path": str(request.url)
        }
    )


@app.exception_handler(500)
async def internal_error_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal Server Error",
            "message": "An unexpected error occurred",
            "details": str(exc)
        }
    )


# ============================================================================
# STARTUP
# ============================================================================

if __name__ == "__main__":
    print("\n" + "="*60)
    print("🚀 Platform Analyser - Python Backend Starting...")
    print("="*60)
    print(f"📍 API: http://localhost:5000")
    print(f"📖 Docs: http://localhost:5000/docs")
    print(f"🗄️  MongoDB: {MONGO_URI}")
    print(f"🌐 Platforms: LeetCode, CodeForces, GeeksforGeeks")
    print("="*60 + "\n")
    
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=5000,
        reload=True,
        log_level="info"
    )
