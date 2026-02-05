interface PlatformCardsProps {
  platforms: any
}

export default function PlatformCards({ platforms }: PlatformCardsProps) {
  const platformInfo: any = {
    leetcode: {
      name: 'LeetCode',
      icon: '💻',
      color: 'border-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    codeforces: {
      name: 'CodeForces',
      icon: '🔷',
      color: 'border-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    gfg: {
      name: 'GeeksforGeeks',
      icon: '💚',
      color: 'border-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    hackerrank: {
      name: 'HackerRank',
      icon: '🟢',
      color: 'border-emerald-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold">Platform-Specific Analysis</h3>
      
      {/* GFG Error Notice */}
      {platforms.gfg && platforms.gfg.error && (
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-lg">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">💚</span>
            <div className="flex-1">
              <h4 className="font-bold text-yellow-900 dark:text-yellow-100 mb-1">GeeksforGeeks (GFG) - Service Unavailable</h4>
              <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
                {platforms.gfg.error}
              </p>
              <p className="text-xs text-yellow-700 dark:text-yellow-300">
                <strong>Technical Details:</strong> GeeksforGeeks deprecated their public API (practiceapi.geeksforgeeks.org/api/vr/user-stats) in February 2026. 
                The endpoint now returns 404 Not Found. This affects all third-party integrations, not just this application.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(platforms).map(([platformKey, platformData]: [string, any]) => {
          const info = platformInfo[platformKey]
          if (!info || platformData.error) return null

          return (
            <div
              key={platformKey}
              className={`card border-l-4 ${info.color} ${info.bgColor}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-4xl">{info.icon}</span>
                  <div>
                    <h4 className="text-xl font-bold">{info.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      @{platformData.username}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-600">
                    {platformData.stats?.total || 0}
                  </div>
                  <div className="text-xs text-gray-500">Total Solved</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <div className="text-lg font-bold text-green-700 dark:text-green-400">
                    {platformData.stats?.easy || 0}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Easy</div>
                </div>
                <div className="text-center p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <div className="text-lg font-bold text-yellow-700 dark:text-yellow-400">
                    {platformData.stats?.medium || 0}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Medium</div>
                </div>
                <div className="text-center p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <div className="text-lg font-bold text-red-700 dark:text-red-400">
                    {platformData.stats?.hard || 0}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Hard</div>
                </div>
              </div>

              {platformData.profile && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {platformData.profile.ranking && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      🏆 Ranking: <span className="font-semibold">{platformData.profile.ranking}</span>
                    </p>
                  )}
                  {platformData.profile.rating && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ⭐ Rating: <span className="font-semibold">{platformData.profile.rating}</span>
                    </p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
