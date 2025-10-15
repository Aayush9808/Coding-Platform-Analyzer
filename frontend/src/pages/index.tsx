import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import InputForm from '../components/InputForm'
import Dashboard from '../components/Dashboard'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  const router = useRouter()
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [initialUsernames, setInitialUsernames] = useState<any>(null)

  // Check for URL parameters on mount
  useEffect(() => {
    if (router.isReady && router.query) {
      const { leetcode, codeforces, hackerrank, gfg } = router.query
      
      if (leetcode || codeforces || hackerrank || gfg) {
        setInitialUsernames({
          leetcode: leetcode as string || '',
          codeforces: codeforces as string || '',
          hackerrank: hackerrank as string || '',
          gfg: gfg as string || '',
        })
      }
    }
  }, [router.isReady, router.query])

  const handleAnalysisComplete = (data: any) => {
    setAnalysisData(data)
    setIsLoading(false)
  }

  const handleReset = () => {
    setAnalysisData(null)
  }

  return (
    <>
      <Head>
        <title>Platform Analyser - Multi-Platform Coding Analytics</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          {!analysisData ? (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  Platform Analyser
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Comprehensive coding analytics across multiple platforms
                </p>
                <p className="mt-4 text-gray-500 dark:text-gray-500">
                  Analyze your LeetCode, CodeForces, and GeeksforGeeks profiles in one place
                </p>
              </div>

              <InputForm 
                onAnalysisComplete={handleAnalysisComplete}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                initialUsernames={initialUsernames}
              />

              {/* Features Section */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card text-center">
                  <div className="text-4xl mb-3">📊</div>
                  <h3 className="text-lg font-semibold mb-2">Unified Analytics</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Get a comprehensive view of your coding journey across all platforms
                  </p>
                </div>

                <div className="card text-center">
                  <div className="text-4xl mb-3">🤖</div>
                  <h3 className="text-lg font-semibold mb-2">AI-Powered Detection</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Smart duplicate question detection using NLP algorithms
                  </p>
                </div>

                <div className="card text-center">
                  <div className="text-4xl mb-3">📈</div>
                  <h3 className="text-lg font-semibold mb-2">Visual Insights</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Beautiful charts and graphs to track your progress
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <Dashboard data={analysisData} onReset={handleReset} />
          )}
        </main>

        <Footer />
      </div>
    </>
  )
}
