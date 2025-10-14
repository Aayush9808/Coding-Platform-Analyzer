interface StatsOverviewProps {
  stats: any
}

export default function StatsOverview({ stats }: StatsOverviewProps) {
  const statCards = [
    {
      title: 'Total Problems',
      value: stats.stats.total,
      icon: '📝',
      color: 'from-purple-500 to-pink-500',
      description: 'Across all platforms'
    },
    {
      title: 'Unique Problems',
      value: stats.stats.unique,
      icon: '⭐',
      color: 'from-blue-500 to-cyan-500',
      description: 'After deduplication'
    },
    {
      title: 'Easy',
      value: stats.stats.easy,
      icon: '🟢',
      color: 'from-green-400 to-emerald-500',
      description: 'Difficulty level'
    },
    {
      title: 'Medium',
      value: stats.stats.medium,
      icon: '🟡',
      color: 'from-yellow-400 to-orange-500',
      description: 'Difficulty level'
    },
    {
      title: 'Hard',
      value: stats.stats.hard,
      icon: '🔴',
      color: 'from-red-500 to-pink-600',
      description: 'Difficulty level'
    },
    {
      title: 'Duplicates Found',
      value: stats.duplicates,
      icon: '🔄',
      color: 'from-gray-500 to-gray-700',
      description: 'Same problems detected'
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {statCards.map((card, index) => (
        <div
          key={index}
          className="card hover:scale-105 transition-transform duration-200 cursor-pointer"
        >
          <div className="text-center">
            <div className="text-4xl mb-2">{card.icon}</div>
            <div className={`text-3xl font-bold bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>
              {card.value}
            </div>
            <div className="text-sm font-semibold mt-2">{card.title}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {card.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
