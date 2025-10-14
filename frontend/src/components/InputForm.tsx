import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { analyzeProfiles } from '../services/api'

interface InputFormProps {
  onAnalysisComplete: (data: any) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  initialUsernames?: any
}

// Type for storing multiple accounts per platform
interface PlatformAccounts {
  [platform: string]: string[]
}

export default function InputForm({ onAnalysisComplete, isLoading, setIsLoading, initialUsernames }: InputFormProps) {
  // Store multiple accounts per platform as arrays
  const [profiles, setProfiles] = useState<PlatformAccounts>({
    leetcode: [''],
    codeforces: [''],
    gfg: ['']
  })

  // Auto-fill from URL parameters
  useEffect(() => {
    if (initialUsernames) {
      const newProfiles: PlatformAccounts = {
        leetcode: [''],
        codeforces: [''],
        gfg: ['']
      }

      // Convert single values to arrays
      Object.entries(initialUsernames).forEach(([platform, value]: [string, any]) => {
        if (value) {
          newProfiles[platform] = Array.isArray(value) ? value : [value]
        }
      })

      setProfiles(newProfiles)
      
      // Show notification
      if (Object.values(initialUsernames).some((v: any) => v)) {
        toast.success('✨ Usernames loaded from share link!')
      }
    }
  }, [initialUsernames])

  const handleInputChange = (platform: string, index: number, value: string) => {
    setProfiles(prev => ({
      ...prev,
      [platform]: prev[platform].map((v, i) => i === index ? value : v)
    }))
  }

  const addAccount = (platform: string) => {
    setProfiles(prev => ({
      ...prev,
      [platform]: [...prev[platform], '']
    }))
    toast.success(`Added another ${platform} account slot!`, { duration: 2000 })
  }

  const removeAccount = (platform: string, index: number) => {
    if (profiles[platform].length <= 1) {
      toast.error('You must keep at least one input field!', { duration: 2000 })
      return
    }

    setProfiles(prev => ({
      ...prev,
      [platform]: prev[platform].filter((_, i) => i !== index)
    }))
    toast.success('Account removed!', { duration: 2000 })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Filter out empty profiles and build the payload
    const validProfiles: any = {}

    Object.entries(profiles).forEach(([platform, accounts]) => {
      const validAccounts = accounts.filter(acc => acc.trim() !== '')
      
      if (validAccounts.length > 0) {
        // If single account, send as string; if multiple, send as array
        validProfiles[platform] = validAccounts.length === 1 
          ? validAccounts[0] 
          : validAccounts
      }
    })

    if (Object.keys(validProfiles).length === 0) {
      toast.error('Please enter at least one profile!')
      return
    }

    setIsLoading(true)
    
    // Count total accounts
    const totalAccounts = Object.values(validProfiles).reduce((sum: number, val: any) => {
      return sum + (Array.isArray(val) ? val.length : 1)
    }, 0)

    toast.loading(`Analyzing ${totalAccounts} account${totalAccounts > 1 ? 's' : ''}...`, { id: 'analysis' })

    try {
      const data = await analyzeProfiles(validProfiles)
      toast.success('Analysis complete!', { id: 'analysis' })
      onAnalysisComplete(data)
    } catch (error: any) {
      toast.error(error.message || 'Failed to analyze profiles', { id: 'analysis' })
      setIsLoading(false)
    }
  }

  const platforms = [
    {
      id: 'leetcode',
      name: 'LeetCode',
      icon: '💻',
      placeholder: 'Enter LeetCode username or profile URL',
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/10',
      borderColor: 'border-yellow-200 dark:border-yellow-800'
    },
    {
      id: 'codeforces',
      name: 'CodeForces',
      icon: '🔷',
      placeholder: 'Enter CodeForces username or profile URL',
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/10',
      borderColor: 'border-blue-200 dark:border-blue-800'
    },
    {
      id: 'gfg',
      name: 'GeeksforGeeks',
      icon: '💚',
      placeholder: 'Enter GFG username or profile URL',
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/10',
      borderColor: 'border-green-200 dark:border-green-800'
    }
  ]

  return (
    <div className="card max-w-3xl mx-auto animate-slide-up">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">
          Enter Your Profile Information
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          ✨ <span className="font-semibold">NEW!</span> You can now add multiple accounts per platform
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {platforms.map((platform) => (
          <div key={platform.id} className={`p-4 rounded-lg border ${platform.bgColor} ${platform.borderColor}`}>
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center space-x-2 font-medium">
                <span className="text-2xl">{platform.icon}</span>
                <span>{platform.name}</span>
                {profiles[platform.id].filter(v => v.trim()).length > 1 && (
                  <span className="text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded-full border border-gray-300 dark:border-gray-600">
                    {profiles[platform.id].filter(v => v.trim()).length} accounts
                  </span>
                )}
              </label>
              <button
                type="button"
                onClick={() => addAccount(platform.id)}
                disabled={isLoading}
                className="text-xs bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Add another account"
              >
                + Add Account
              </button>
            </div>

            <div className="space-y-2">
              {profiles[platform.id].map((value, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    {profiles[platform.id].length > 1 && (
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 bg-white dark:bg-gray-800 px-1.5 py-0.5 rounded">
                        #{index + 1}
                      </span>
                    )}
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleInputChange(platform.id, index, e.target.value)}
                      placeholder={profiles[platform.id].length > 1 ? `Account #${index + 1}` : platform.placeholder}
                      className={`input-field ${profiles[platform.id].length > 1 ? 'pl-12' : ''}`}
                      disabled={isLoading}
                    />
                  </div>
                  {profiles[platform.id].length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAccount(platform.id, index)}
                      disabled={isLoading}
                      className="px-3 py-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Remove this account"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`btn-primary w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </span>
            ) : (
              '🚀 Analyze My Profiles'
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold text-sm mb-2 text-blue-900 dark:text-blue-100">📝 Pro Tips:</h3>
        <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
          <li>• <strong>Multiple Accounts:</strong> Click "+ Add Account" to add more accounts per platform</li>
          <li>• You can enter either username or full profile URL</li>
          <li>• At least one platform account is required</li>
          <li>• Analysis includes AI-powered duplicate detection across all accounts</li>
          <li>• Data is fetched in real-time (may take 10-30 seconds per account)</li>
          <li>• Perfect for tracking main + practice accounts!</li>
        </ul>
      </div>
    </div>
  )
}
