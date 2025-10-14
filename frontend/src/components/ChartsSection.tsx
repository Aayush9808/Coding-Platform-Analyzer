import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface ChartsSectionProps {
  data: any
}

export default function ChartsSection({ data }: ChartsSectionProps) {
  // Prepare difficulty distribution data
  const difficultyData = [
    { name: 'Easy', value: data.overall.stats.easy, color: '#10b981' },
    { name: 'Medium', value: data.overall.stats.medium, color: '#f59e0b' },
    { name: 'Hard', value: data.overall.stats.hard, color: '#ef4444' }
  ]

  // Prepare platform comparison data
  const platformData = Object.entries(data.platforms)
    .filter(([_, platformData]: [string, any]) => platformData.stats && !platformData.error)
    .map(([platform, platformData]: [string, any]) => ({
      name: platform.toUpperCase(),
      Easy: platformData.stats.easy || 0,
      Medium: platformData.stats.medium || 0,
      Hard: platformData.stats.hard || 0,
      Total: platformData.stats.total || 0
    }))

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold">Visual Analytics</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Difficulty Distribution Pie Chart */}
        <div className="card">
          <h4 className="text-xl font-semibold mb-4">Difficulty Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={difficultyData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {difficultyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Platform Comparison Bar Chart */}
        <div className="card">
          <h4 className="text-xl font-semibold mb-4">Platform Comparison</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={platformData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Easy" fill="#10b981" />
              <Bar dataKey="Medium" fill="#f59e0b" />
              <Bar dataKey="Hard" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Stats Table */}
      <div className="card overflow-x-auto">
        <h4 className="text-xl font-semibold mb-4">Detailed Statistics</h4>
        <table className="w-full text-left">
          <thead className="border-b-2 border-gray-300 dark:border-gray-600">
            <tr>
              <th className="pb-3 pr-4">Platform</th>
              <th className="pb-3 pr-4 text-center">Easy</th>
              <th className="pb-3 pr-4 text-center">Medium</th>
              <th className="pb-3 pr-4 text-center">Hard</th>
              <th className="pb-3 text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {platformData.map((platform, index) => (
              <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 pr-4 font-semibold">{platform.name}</td>
                <td className="py-3 pr-4 text-center text-green-600 dark:text-green-400">{platform.Easy}</td>
                <td className="py-3 pr-4 text-center text-yellow-600 dark:text-yellow-400">{platform.Medium}</td>
                <td className="py-3 pr-4 text-center text-red-600 dark:text-red-400">{platform.Hard}</td>
                <td className="py-3 text-center font-bold">{platform.Total}</td>
              </tr>
            ))}
            <tr className="font-bold bg-gray-100 dark:bg-gray-800">
              <td className="py-3 pr-4">TOTAL</td>
              <td className="py-3 pr-4 text-center text-green-600 dark:text-green-400">{data.overall.stats.easy}</td>
              <td className="py-3 pr-4 text-center text-yellow-600 dark:text-yellow-400">{data.overall.stats.medium}</td>
              <td className="py-3 pr-4 text-center text-red-600 dark:text-red-400">{data.overall.stats.hard}</td>
              <td className="py-3 text-center text-primary-600 dark:text-primary-400">{data.overall.stats.total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
