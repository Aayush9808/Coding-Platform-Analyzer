import { useState } from 'react'

export default function Header() {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="text-3xl">📊</div>
          <span className="text-2xl font-bold text-primary-600">Platform Analyser</span>
        </div>

        <nav className="flex items-center space-x-6">
          <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
            Home
          </a>
          <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
            About
          </a>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? '🌞' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  )
}
