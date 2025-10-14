"""
Platform Analyser - Backend Services
All scrapers, AI insights, and analysis logic in one file
"""

import requests
from bs4 import BeautifulSoup
from datetime import datetime
from typing import Dict, List, Optional, Any
import re
import math
from tenacity import retry, stop_after_attempt, wait_exponential


# ============================================================================
# SCRAPERS
# ============================================================================

class LeetCodeScraper:
    """LeetCode GraphQL API Scraper"""
    
    def __init__(self):
        self.base_url = "https://leetcode.com/graphql"
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Content-Type': 'application/json'
        })
    
    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
    def fetch_user_data(self, username: str) -> Dict:
        """Fetch LeetCode user data"""
        try:
            # Query for user profile
            profile_query = {
                "query": """
                    query getUserProfile($username: String!) {
                        matchedUser(username: $username) {
                            username
                            profile {
                                realName
                                userAvatar
                                reputation
                            }
                            submitStats {
                                acSubmissionNum {
                                    difficulty
                                    count
                                }
                            }
                        }
                    }
                """,
                "variables": {"username": username}
            }
            
            response = self.session.post(self.base_url, json=profile_query, timeout=15)
            response.raise_for_status()
            data = response.json()
            
            user_data = data.get('data', {}).get('matchedUser')
            if not user_data:
                raise Exception(f"User {username} not found")
            
            # Parse submission stats
            ac_submissions = user_data.get('submitStats', {}).get('acSubmissionNum', [])
            
            stats = {'easy': 0, 'medium': 0, 'hard': 0, 'total': 0}
            for submission in ac_submissions:
                difficulty = submission.get('difficulty', '').lower()
                count = submission.get('count', 0)
                
                if difficulty == 'easy':
                    stats['easy'] = count
                elif difficulty == 'medium':
                    stats['medium'] = count
                elif difficulty == 'hard':
                    stats['hard'] = count
                elif difficulty == 'all':
                    stats['total'] = count
            
            profile = user_data.get('profile', {})
            
            return {
                'platform': 'leetcode',
                'username': username,
                'name': profile.get('realName', username),
                'avatar': profile.get('userAvatar', ''),
                'stats': stats,
                'reputation': profile.get('reputation', 0),
                'success': True
            }
            
        except Exception as e:
            print(f"LeetCode error for {username}: {str(e)}")
            return {
                'platform': 'leetcode',
                'username': username,
                'error': str(e),
                'success': False
            }


class CodeForcesScraper:
    """CodeForces API Scraper"""
    
    def __init__(self):
        self.base_url = "https://codeforces.com/api"
        self.session = requests.Session()
    
    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
    def fetch_user_data(self, username: str) -> Dict:
        """Fetch CodeForces user data"""
        try:
            # Fetch user info
            user_url = f"{self.base_url}/user.info?handles={username}"
            user_response = self.session.get(user_url, timeout=15)
            user_response.raise_for_status()
            user_data = user_response.json()
            
            if user_data.get('status') != 'OK':
                raise Exception(f"User {username} not found")
            
            user_info = user_data['result'][0]
            
            # Fetch submissions
            submissions_url = f"{self.base_url}/user.status?handle={username}&from=1&count=10000"
            submissions_response = self.session.get(submissions_url, timeout=15)
            submissions_response.raise_for_status()
            submissions_data = submissions_response.json()
            
            if submissions_data.get('status') != 'OK':
                raise Exception("Failed to fetch submissions")
            
            # Count accepted submissions by difficulty
            submissions = submissions_data['result']
            solved_problems = set()
            difficulty_count = {'easy': 0, 'medium': 0, 'hard': 0}
            
            for submission in submissions:
                if submission.get('verdict') == 'OK':
                    problem = submission.get('problem', {})
                    problem_id = f"{problem.get('contestId')}_{problem.get('index')}"
                    
                    if problem_id not in solved_problems:
                        solved_problems.add(problem_id)
                        
                        # Classify by rating
                        rating = problem.get('rating', 0)
                        if rating < 1400:
                            difficulty_count['easy'] += 1
                        elif rating < 1900:
                            difficulty_count['medium'] += 1
                        else:
                            difficulty_count['hard'] += 1
            
            total = len(solved_problems)
            
            return {
                'platform': 'codeforces',
                'username': username,
                'name': user_info.get('firstName', '') + ' ' + user_info.get('lastName', ''),
                'avatar': user_info.get('avatar', ''),
                'stats': {
                    'easy': difficulty_count['easy'],
                    'medium': difficulty_count['medium'],
                    'hard': difficulty_count['hard'],
                    'total': total
                },
                'rating': user_info.get('rating', 0),
                'rank': user_info.get('rank', 'unrated'),
                'success': True
            }
            
        except Exception as e:
            print(f"CodeForces error for {username}: {str(e)}")
            return {
                'platform': 'codeforces',
                'username': username,
                'error': str(e),
                'success': False
            }


class GFGScraper:
    """GeeksforGeeks Web Scraper"""
    
    def __init__(self):
        self.base_url = "https://www.geeksforgeeks.org"
        self.api_url = "https://practiceapi.geeksforgeeks.org/api"
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
    
    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
    def fetch_user_data(self, username: str) -> Dict:
        """Fetch GFG user data"""
        try:
            # Try API first
            api_url = f"{self.api_url}/vr/user-stats"
            params = {'userName': username}
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'application/json',
                'Referer': f"{self.base_url}/user/{username}/"
            }
            
            response = self.session.get(api_url, params=params, headers=headers, timeout=15)
            response.raise_for_status()
            data = response.json()
            
            if data.get('results'):
                results = data['results']
                
                # GFG has different difficulty categories
                stats = {
                    'easy': int(results.get('school', 0)),
                    'medium': int(results.get('basic', 0)) + int(results.get('easy', 0)) + int(results.get('medium', 0)),
                    'hard': int(results.get('hard', 0)),
                    'total': int(results.get('total_problems_solved', 0))
                }
                
                return {
                    'platform': 'gfg',
                    'username': username,
                    'name': results.get('user_name', username),
                    'avatar': results.get('profile_image_url', ''),
                    'stats': stats,
                    'score': results.get('score', 0),
                    'institution': results.get('institution', ''),
                    'success': True
                }
            
            # Fallback: Web scraping
            return self._scrape_profile(username)
            
        except Exception as e:
            print(f"GFG error for {username}: {str(e)}")
            # Try web scraping as fallback
            try:
                return self._scrape_profile(username)
            except:
                return {
                    'platform': 'gfg',
                    'username': username,
                    'error': str(e),
                    'success': False
                }
    
    def _scrape_profile(self, username: str) -> Dict:
        """Scrape GFG profile page"""
        url = f"{self.base_url}/user/{username}/"
        response = self.session.get(url, timeout=15)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Try to find problem count
        total = 0
        for elem in soup.find_all(['div', 'span'], class_=re.compile('problem|score|solved', re.I)):
            text = elem.get_text()
            numbers = re.findall(r'\d+', text)
            if numbers:
                total = max(total, int(numbers[0]))
        
        # Estimate distribution
        stats = {
            'easy': int(total * 0.45),
            'medium': int(total * 0.40),
            'hard': int(total * 0.15),
            'total': total
        }
        
        return {
            'platform': 'gfg',
            'username': username,
            'name': username,
            'avatar': '',
            'stats': stats,
            'success': True
        }


# ============================================================================
# AI INSIGHTS SERVICE
# ============================================================================

class AIInsightsService:
    """AI-Powered Insights Engine"""
    
    @staticmethod
    def generate_insights(analysis_data: Dict) -> Dict:
        """Generate comprehensive AI insights"""
        platforms = analysis_data.get('platforms', {})
        overall = analysis_data.get('overall', {})
        stats = overall.get('stats', {})
        
        total = stats.get('total', 0)
        unique = stats.get('unique', 0)
        platforms_count = overall.get('platformsAnalyzed', 0)
        
        # Skill level
        if total >= 500:
            level = 'Expert'
        elif total >= 300:
            level = 'Advanced'
        elif total >= 150:
            level = 'Intermediate'
        elif total >= 50:
            level = 'Developing'
        else:
            level = 'Beginner'
        
        return {
            'summary': AIInsightsService._generate_summary(overall, level),
            'strengths': AIInsightsService._identify_strengths(platforms, overall),
            'weaknesses': AIInsightsService._identify_weaknesses(platforms, overall),
            'recommendations': AIInsightsService._generate_recommendations(platforms, overall),
            'platformComparison': AIInsightsService._compare_platforms(platforms),
            'difficultyProgression': AIInsightsService._analyze_difficulty(overall),
            'performanceScore': AIInsightsService._calculate_score(platforms, overall),
            'nextSteps': AIInsightsService._suggest_next_steps(overall),
            'motivationalMessage': AIInsightsService._motivational_message(total)
        }
    
    @staticmethod
    def _generate_summary(overall: Dict, level: str) -> Dict:
        stats = overall.get('stats', {})
        total = stats.get('total', 0)
        unique = stats.get('unique', 0)
        platforms = overall.get('platformsAnalyzed', 0)
        accounts = overall.get('totalAccounts', platforms)
        
        account_text = f"across {accounts} accounts" if accounts > 1 else ""
        
        return {
            'level': level,
            'message': f"You've solved {total} problems {account_text} on {platforms} platform(s), with {unique} unique problems. You're at a {level} level!",
            'totalProblems': total,
            'uniqueProblems': unique,
            'platforms': platforms,
            'accounts': accounts
        }
    
    @staticmethod
    def _identify_strengths(platforms: Dict, overall: Dict) -> List[Dict]:
        strengths = []
        stats = overall.get('stats', {})
        total = stats.get('total', 1)
        
        easy_pct = (stats.get('easy', 0) / total) * 100
        medium_pct = (stats.get('medium', 0) / total) * 100
        hard_pct = (stats.get('hard', 0) / total) * 100
        
        if hard_pct > 20:
            strengths.append({
                'area': 'Problem Complexity',
                'description': f"Strong at tackling hard problems ({hard_pct:.1f}% of your solutions)",
                'icon': '🏆'
            })
        
        if medium_pct > 50:
            strengths.append({
                'area': 'Intermediate Skills',
                'description': f"Excellent grasp of medium-level problems ({medium_pct:.1f}%)",
                'icon': '💪'
            })
        
        if overall.get('platformsAnalyzed', 0) >= 2:
            strengths.append({
                'area': 'Platform Diversity',
                'description': f"Active on {overall.get('platformsAnalyzed')} platforms - great exposure!",
                'icon': '🌐'
            })
        
        if total >= 200:
            strengths.append({
                'area': 'Consistency',
                'description': f"Impressive volume with {total}+ problems solved",
                'icon': '🔥'
            })
        
        return strengths if strengths else [{
            'area': 'Getting Started',
            'description': "You're building your coding foundation - keep going!",
            'icon': '🌱'
        }]
    
    @staticmethod
    def _identify_weaknesses(platforms: Dict, overall: Dict) -> List[Dict]:
        weaknesses = []
        stats = overall.get('stats', {})
        total = stats.get('total', 1)
        
        hard_pct = (stats.get('hard', 0) / total) * 100
        medium_pct = (stats.get('medium', 0) / total) * 100
        
        if hard_pct < 5 and total > 50:
            weaknesses.append({
                'area': 'Hard Problems',
                'description': 'Limited exposure to hard-level problems. Try challenging yourself!',
                'icon': '🎯',
                'priority': 'high'
            })
        
        if medium_pct < 30 and total > 30:
            weaknesses.append({
                'area': 'Medium Problems',
                'description': 'Focus on medium-difficulty problems to level up',
                'icon': '📈',
                'priority': 'medium'
            })
        
        if overall.get('platformsAnalyzed', 0) == 1:
            weaknesses.append({
                'area': 'Platform Diversity',
                'description': 'Consider solving problems on multiple platforms for broader exposure',
                'icon': '🌍',
                'priority': 'low'
            })
        
        if total < 50:
            weaknesses.append({
                'area': 'Problem Volume',
                'description': 'Build consistency by solving more problems regularly',
                'icon': '📊',
                'priority': 'high'
            })
        
        return weaknesses if weaknesses else [{
            'area': 'Keep Improving',
            'description': "You're doing well! Keep challenging yourself with harder problems",
            'icon': '✨',
            'priority': 'low'
        }]
    
    @staticmethod
    def _generate_recommendations(platforms: Dict, overall: Dict) -> List[Dict]:
        recommendations = []
        stats = overall.get('stats', {})
        total = stats.get('total', 0)
        hard_pct = (stats.get('hard', 0) / total * 100) if total > 0 else 0
        medium_pct = (stats.get('medium', 0) / total * 100) if total > 0 else 0
        
        if medium_pct > 60 and hard_pct < 15:
            recommendations.append({
                'type': 'Difficulty Progression',
                'action': 'Start tackling hard problems',
                'reason': "You're comfortable with medium problems - time to level up!",
                'impact': 'High',
                'icon': '🚀'
            })
        elif stats.get('easy', 0) > stats.get('medium', 0) + stats.get('hard', 0):
            recommendations.append({
                'type': 'Challenge Yourself',
                'action': 'Shift focus to medium and hard problems',
                'reason': "You've mastered easy problems - increase the difficulty",
                'impact': 'High',
                'icon': '⬆️'
            })
        
        if total < 100:
            recommendations.append({
                'type': 'Build Consistency',
                'action': 'Solve at least 3-5 problems daily',
                'reason': 'Regular practice is key to improvement',
                'impact': 'High',
                'icon': '📅'
            })
        
        if total > 200:
            recommendations.append({
                'type': 'Specialize',
                'action': 'Focus on specific problem types (DP, Graphs, etc.)',
                'reason': 'You have a strong foundation - time to master specific domains',
                'impact': 'Medium',
                'icon': '🎓'
            })
        
        if total > 150:
            recommendations.append({
                'type': 'Interview Ready',
                'action': 'Practice mock interviews and timed contests',
                'reason': 'You have sufficient problem-solving experience',
                'impact': 'High',
                'icon': '💼'
            })
        
        return recommendations
    
    @staticmethod
    def _compare_platforms(platforms: Dict) -> Dict:
        comparison = []
        
        for platform_key, data in platforms.items():
            if not data.get('success') or not data.get('stats'):
                continue
            
            base_platform = platform_key.split('_')[0]
            stats = data['stats']
            total = stats.get('total', 0)
            
            if total == 0:
                continue
            
            comparison.append({
                'platform': base_platform,
                'accountKey': platform_key,
                'total': total,
                'easy': stats.get('easy', 0),
                'medium': stats.get('medium', 0),
                'hard': stats.get('hard', 0),
                'hardPercentage': f"{(stats.get('hard', 0) / total * 100):.1f}" if total > 0 else "0.0",
                'rating': AIInsightsService._platform_rating(stats)
            })
        
        comparison.sort(key=lambda x: x['total'], reverse=True)
        
        insights = []
        if len(comparison) > 1:
            top = comparison[0]
            insights.append(f"{top['platform'].upper()} is your strongest platform with {top['total']} problems")
        
        return {
            'platforms': comparison,
            'topPlatform': comparison[0]['platform'] if comparison else None,
            'insights': insights
        }
    
    @staticmethod
    def _platform_rating(stats: Dict) -> str:
        total = stats.get('total', 0)
        hard_pct = (stats.get('hard', 0) / total * 100) if total > 0 else 0
        
        if total >= 200 and hard_pct > 20:
            return '⭐⭐⭐⭐⭐'
        elif total >= 150 and hard_pct > 15:
            return '⭐⭐⭐⭐'
        elif total >= 100 and hard_pct > 10:
            return '⭐⭐⭐'
        elif total >= 50:
            return '⭐⭐'
        return '⭐'
    
    @staticmethod
    def _analyze_difficulty(overall: Dict) -> Dict:
        stats = overall.get('stats', {})
        total = stats.get('total', 1)
        
        distribution = {
            'easy': {
                'count': stats.get('easy', 0),
                'percentage': f"{(stats.get('easy', 0) / total * 100):.1f}"
            },
            'medium': {
                'count': stats.get('medium', 0),
                'percentage': f"{(stats.get('medium', 0) / total * 100):.1f}"
            },
            'hard': {
                'count': stats.get('hard', 0),
                'percentage': f"{(stats.get('hard', 0) / total * 100):.1f}"
            }
        }
        
        # Determine level
        if total >= 300:
            level = 'expert'
        elif total >= 150:
            level = 'advanced'
        elif total >= 50:
            level = 'intermediate'
        else:
            level = 'beginner'
        
        ideal = {
            'beginner': {'easy': 60, 'medium': 30, 'hard': 10},
            'intermediate': {'easy': 40, 'medium': 45, 'hard': 15},
            'advanced': {'easy': 25, 'medium': 50, 'hard': 25},
            'expert': {'easy': 15, 'medium': 50, 'hard': 35}
        }
        
        return {
            'current': distribution,
            'ideal': ideal[level],
            'level': level,
            'analysis': []
        }
    
    @staticmethod
    def _calculate_score(platforms: Dict, overall: Dict) -> Dict:
        stats = overall.get('stats', {})
        total = stats.get('total', 0)
        
        # Volume score (max 30)
        if total >= 500:
            volume = 30
        elif total >= 300:
            volume = 25
        elif total >= 150:
            volume = 20
        elif total >= 50:
            volume = 15
        else:
            volume = min(total / 5, 10)
        
        # Difficulty score (max 35)
        hard_pct = (stats.get('hard', 0) / total * 100) if total > 0 else 0
        medium_pct = (stats.get('medium', 0) / total * 100) if total > 0 else 0
        
        if hard_pct > 25:
            hard_score = 15
        elif hard_pct > 15:
            hard_score = 10
        elif hard_pct > 5:
            hard_score = 5
        else:
            hard_score = 0
        
        if 40 < medium_pct < 60:
            medium_score = 20
        elif medium_pct > 30:
            medium_score = 15
        else:
            medium_score = 10
        
        difficulty = hard_score + medium_score
        
        # Diversity score (max 20)
        platform_count = overall.get('platformsAnalyzed', 0)
        diversity = min(platform_count * 7, 20)
        
        # Uniqueness score (max 15)
        unique_pct = (stats.get('unique', 0) / total * 100) if total > 0 else 0
        if unique_pct > 85:
            uniqueness = 15
        elif unique_pct > 70:
            uniqueness = 10
        else:
            uniqueness = 5
        
        score = min(int(volume + difficulty + diversity + uniqueness), 100)
        
        # Grade
        if score >= 90:
            grade = 'A+'
        elif score >= 85:
            grade = 'A'
        elif score >= 80:
            grade = 'A-'
        elif score >= 75:
            grade = 'B+'
        elif score >= 70:
            grade = 'B'
        elif score >= 65:
            grade = 'B-'
        elif score >= 60:
            grade = 'C+'
        else:
            grade = 'C'
        
        return {
            'score': score,
            'grade': grade,
            'breakdown': {
                'volume': int(volume),
                'difficulty': int(difficulty),
                'diversity': int(diversity),
                'uniqueness': int(uniqueness)
            }
        }
    
    @staticmethod
    def _suggest_next_steps(overall: Dict) -> List[Dict]:
        stats = overall.get('stats', {})
        total = stats.get('total', 0)
        steps = []
        
        if total < 50:
            steps.extend([
                {
                    'step': 1,
                    'action': 'Solve 50 easy problems',
                    'goal': 'Build strong fundamentals',
                    'timeframe': '2-3 weeks',
                    'icon': '🎯'
                },
                {
                    'step': 2,
                    'action': 'Learn basic data structures',
                    'goal': 'Arrays, Strings, Hash Tables',
                    'timeframe': '1 week',
                    'icon': '📚'
                }
            ])
        elif total < 150:
            steps.extend([
                {
                    'step': 1,
                    'action': 'Solve 100 medium problems',
                    'goal': 'Master intermediate concepts',
                    'timeframe': '4-6 weeks',
                    'icon': '📈'
                },
                {
                    'step': 2,
                    'action': 'Practice patterns',
                    'goal': 'Two Pointers, Sliding Window, Binary Search',
                    'timeframe': '2 weeks',
                    'icon': '🧩'
                }
            ])
        elif total < 300:
            steps.extend([
                {
                    'step': 1,
                    'action': 'Tackle 50 hard problems',
                    'goal': 'Advanced problem-solving',
                    'timeframe': '6-8 weeks',
                    'icon': '🚀'
                },
                {
                    'step': 2,
                    'action': 'Join contests regularly',
                    'goal': 'Build speed and accuracy',
                    'timeframe': 'Weekly',
                    'icon': '🏆'
                }
            ])
        else:
            steps.extend([
                {
                    'step': 1,
                    'action': 'Specialize in weak areas',
                    'goal': 'Master DP, Graphs, Trees',
                    'timeframe': '4-6 weeks',
                    'icon': '🎓'
                },
                {
                    'step': 2,
                    'action': 'Mock interviews',
                    'goal': 'Prepare for tech interviews',
                    'timeframe': 'Ongoing',
                    'icon': '💼'
                }
            ])
        
        return steps
    
    @staticmethod
    def _motivational_message(total: int) -> str:
        if total >= 500:
            return '🌟 Phenomenal! You\'re in the top tier of problem solvers. Keep pushing boundaries!'
        elif total >= 300:
            return '🔥 Impressive progress! You\'re well on your way to mastery. Stay consistent!'
        elif total >= 150:
            return '💪 Great momentum! You\'re building solid skills. Keep the streak going!'
        elif total >= 50:
            return '🌱 You\'re growing fast! Every problem solved makes you stronger. Don\'t stop now!'
        else:
            return '🚀 Every expert was once a beginner. You\'ve started your journey - keep coding!'


# ============================================================================
# ANALYZER SERVICE
# ============================================================================

class AnalyzerService:
    """Main analyzer service coordinating all scrapers and insights"""
    
    def __init__(self):
        self.scrapers = {
            'leetcode': LeetCodeScraper(),
            'codeforces': CodeForcesScraper(),
            'gfg': GFGScraper()
        }
    
    def parse_username(self, url_or_username: str, platform: str) -> str:
        """Extract username from URL or return username"""
        if not url_or_username:
            return ""
        
        # Remove whitespace
        url_or_username = url_or_username.strip()
        
        # Platform-specific URL parsing
        if platform == 'leetcode':
            match = re.search(r'leetcode\.com/(?:u/)?([^/\?]+)', url_or_username)
            if match:
                return match.group(1)
        elif platform == 'codeforces':
            match = re.search(r'codeforces\.com/profile/([^/\?]+)', url_or_username)
            if match:
                return match.group(1)
        elif platform == 'gfg':
            match = re.search(r'geeksforgeeks\.org/user/([^/\?]+)', url_or_username)
            if match:
                return match.group(1)
        
        return url_or_username
    
    def analyze_multiple_platforms(self, profiles: Dict[str, Any]) -> Dict:
        """Analyze profiles from multiple platforms with multiple accounts support"""
        results = {
            'platforms': {},
            'overall': {
                'stats': {'easy': 0, 'medium': 0, 'hard': 0, 'total': 0, 'unique': 0},
                'uniqueProblems': 0,
                'duplicates': 0,
                'platformsAnalyzed': 0,
                'totalAccounts': 0
            },
            'duplicateAnalysis': None,
            'timestamp': datetime.now().isoformat()
        }
        
        # Fetch data from each platform
        for platform, urls_or_usernames in profiles.items():
            if not urls_or_usernames or platform not in self.scrapers:
                continue
            
            # Handle both single string and array
            username_list = urls_or_usernames if isinstance(urls_or_usernames, list) else [urls_or_usernames]
            username_list = [u for u in username_list if u and u.strip()]
            
            if not username_list:
                continue
            
            # Fetch data for each username
            for url_or_username in username_list:
                username = self.parse_username(url_or_username, platform)
                
                try:
                    data = self.scrapers[platform].fetch_user_data(username)
                    
                    # Store with unique key for multiple accounts
                    account_key = f"{platform}_{username}" if len(username_list) > 1 else platform
                    results['platforms'][account_key] = data
                    results['overall']['platformsAnalyzed'] += 1
                    results['overall']['totalAccounts'] += 1
                    
                    # Add to overall stats
                    if data.get('success') and data.get('stats'):
                        stats = data['stats']
                        results['overall']['stats']['easy'] += stats.get('easy', 0)
                        results['overall']['stats']['medium'] += stats.get('medium', 0)
                        results['overall']['stats']['hard'] += stats.get('hard', 0)
                        results['overall']['stats']['total'] += stats.get('total', 0)
                
                except Exception as e:
                    print(f"Error analyzing {platform} for {username}: {str(e)}")
                    account_key = f"{platform}_{username}" if len(username_list) > 1 else platform
                    results['platforms'][account_key] = {
                        'platform': platform,
                        'username': username,
                        'error': str(e),
                        'success': False
                    }
        
        # Duplicate detection (simplified - 30% overlap estimate)
        total_problems = results['overall']['stats']['total']
        unique_problems = int(total_problems * 0.70)  # Assume 30% overlap
        
        results['overall']['stats']['unique'] = unique_problems
        results['overall']['uniqueProblems'] = unique_problems
        results['overall']['duplicates'] = total_problems - unique_problems
        
        results['duplicateAnalysis'] = {
            'totalProblems': total_problems,
            'estimatedUniqueProblems': unique_problems,
            'estimatedDuplicates': total_problems - unique_problems,
            'overlapPercentage': 30.0
        }
        
        # Generate AI insights
        try:
            results['aiInsights'] = AIInsightsService.generate_insights(results)
        except Exception as e:
            print(f"AI insights generation failed: {str(e)}")
            results['aiInsights'] = None
        
        return results


# Singleton instance
analyzer_service = AnalyzerService()
