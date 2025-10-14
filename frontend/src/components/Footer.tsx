export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3">Platform Analyser</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Comprehensive coding analytics dashboard for competitive programmers
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Supported Platforms</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>✅ LeetCode</li>
              <li>✅ CodeForces</li>
              <li>✅ GeeksforGeeks</li>
              <li>✅ HackerRank</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Features</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>🤖 AI-Powered Duplicate Detection</li>
              <li>📊 Unified Analytics</li>
              <li>📈 Visual Progress Tracking</li>
              <li>⚡ Real-time Data</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>&copy; 2025 Platform Analyser. Built for competitive programmers.</p>
          <p className="mt-2">
            Made with ❤️ using React, Next.js, Node.js & AI
          </p>
        </div>
      </div>
    </footer>
  )
}
