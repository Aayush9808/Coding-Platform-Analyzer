interface DuplicateAnalysisProps {
  analysis: any
}

export default function DuplicateAnalysis({ analysis }: DuplicateAnalysisProps) {
  return (
    <div className="card bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-2 flex items-center">
            <span className="text-3xl mr-3">🤖</span>
            AI Duplicate Detection
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Intelligent analysis to identify same problems across platforms
          </p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
            {analysis.estimatedUniqueProblems}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Unique Problems</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {analysis.totalProblems}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Total Problems
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 dark:text-red-400">
              {analysis.estimatedDuplicates}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Duplicates Found
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {analysis.overlapRate}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Overlap Rate
            </div>
          </div>
        </div>
      </div>

      {analysis.note && (
        <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-sm text-blue-900 dark:text-blue-100">
          ℹ️ {analysis.note}
        </div>
      )}
    </div>
  )
}
