import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60 seconds for analysis
})

/**
 * Analyze profiles across multiple platforms
 */
export const analyzeProfiles = async (profiles: Record<string, string>) => {
  try {
    const response = await api.post('/analyse', { profiles })
    return response.data
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.detail || error.response.data.error || 'Failed to analyze profiles')
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.')
    } else {
      throw new Error('Failed to send request. Please try again.')
    }
  }
}

/**
 * Get analysis report by user ID
 */
export const getReport = async (userId: string) => {
  try {
    const response = await api.get(`/analyser/report/${userId}`)
    return response.data.data
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to fetch report')
  }
}

/**
 * Fetch single platform profile
 */
export const fetchPlatformProfile = async (platform: string, username: string) => {
  try {
    const response = await api.post(`/platforms/${platform}`, { username })
    return response.data.data
  } catch (error: any) {
    throw new Error(error.response?.data?.error || `Failed to fetch ${platform} profile`)
  }
}

/**
 * Get supported platforms
 */
export const getSupportedPlatforms = async () => {
  try {
    const response = await api.get('/platforms')
    return response.data.data
  } catch (error: any) {
    throw new Error('Failed to fetch supported platforms')
  }
}

export default api
