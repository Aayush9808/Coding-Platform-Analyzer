interface AIInsightsProps {
  insights: any
}

export default function AIInsights({ insights }: AIInsightsProps) {
  if (!insights) return null;

  const { summary, strengths, weaknesses, recommendations, performanceScore, platformComparison, nextSteps, motivationalMessage } = insights;

  return (
    <div className="space-y-6">
      {/* Header with Motivational Message */}
      <div className="card bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">🤖 AI-Powered Insights</h2>
            <p className="text-white/90">{motivationalMessage}</p>
          </div>
          {performanceScore && (
            <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="text-4xl font-bold">{performanceScore.score}</div>
              <div className="text-sm opacity-90">Score</div>
              <div className="text-2xl font-bold mt-1">{performanceScore.grade}</div>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4">📊 Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{summary.totalProblems}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Problems</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{summary.uniqueProblems}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Unique Problems</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{summary.platforms}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Platforms</div>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{summary.level}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Skill Level</div>
            </div>
          </div>
          <p className="mt-4 text-gray-700 dark:text-gray-300">{summary.message}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Strengths */}
        {strengths && strengths.length > 0 && (
          <div className="card">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-2xl mr-2">💪</span>
              Your Strengths
            </h3>
            <div className="space-y-3">
              {strengths.map((strength: any, index: number) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-2xl">{strength.icon}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-green-800 dark:text-green-300">{strength.area}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{strength.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Weaknesses */}
        {weaknesses && weaknesses.length > 0 && (
          <div className="card">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-2xl mr-2">🎯</span>
              Areas for Improvement
            </h3>
            <div className="space-y-3">
              {weaknesses.map((weakness: any, index: number) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <span className="text-2xl">{weakness.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-orange-800 dark:text-orange-300">{weakness.area}</div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        weakness.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        weakness.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                      }`}>
                        {weakness.priority}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{weakness.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <span className="text-2xl mr-2">💡</span>
            Personalized Recommendations
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {recommendations.map((rec: any, index: number) => (
              <div key={index} className="p-4 border-2 border-blue-200 dark:border-blue-800 rounded-lg hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{rec.icon}</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{rec.type}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    rec.impact === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                    rec.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                    {rec.impact} Impact
                  </span>
                </div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{rec.action}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{rec.reason}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Platform Comparison */}
      {platformComparison && platformComparison.platforms && platformComparison.platforms.length > 0 && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <span className="text-2xl mr-2">📊</span>
            Platform Performance
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4">Platform</th>
                  <th className="text-center py-3 px-4">Total</th>
                  <th className="text-center py-3 px-4">Easy</th>
                  <th className="text-center py-3 px-4">Medium</th>
                  <th className="text-center py-3 px-4">Hard</th>
                  <th className="text-center py-3 px-4">Hard %</th>
                  <th className="text-center py-3 px-4">Rating</th>
                </tr>
              </thead>
              <tbody>
                {platformComparison.platforms.map((platform: any, index: number) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4 font-semibold uppercase">{platform.platform}</td>
                    <td className="text-center py-3 px-4 font-bold">{platform.total}</td>
                    <td className="text-center py-3 px-4 text-green-600 dark:text-green-400">{platform.easy}</td>
                    <td className="text-center py-3 px-4 text-yellow-600 dark:text-yellow-400">{platform.medium}</td>
                    <td className="text-center py-3 px-4 text-red-600 dark:text-red-400">{platform.hard}</td>
                    <td className="text-center py-3 px-4">{platform.hardPercentage}%</td>
                    <td className="text-center py-3 px-4">{platform.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {platformComparison.insights && platformComparison.insights.length > 0 && (
            <div className="mt-4 space-y-2">
              {platformComparison.insights.map((insight: string, index: number) => (
                <div key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                  <span className="mr-2">•</span>
                  <span>{insight}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Next Steps */}
      {nextSteps && nextSteps.length > 0 && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <span className="text-2xl mr-2">🎯</span>
            Your Personalized Roadmap
          </h3>
          <div className="space-y-4">
            {nextSteps.map((step: any, index: number) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {step.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-bold text-gray-900 dark:text-gray-100">{step.action}</div>
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                    <span className="font-semibold">Goal:</span> {step.goal}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Timeframe:</span> {step.timeframe}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Performance Score Breakdown */}
      {performanceScore && performanceScore.breakdown && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4">📈 Performance Score Breakdown</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{performanceScore.breakdown.volume}/30</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Volume</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{performanceScore.breakdown.difficulty}/35</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Difficulty</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{performanceScore.breakdown.diversity}/20</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Diversity</div>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{performanceScore.breakdown.uniqueness}/15</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Uniqueness</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
