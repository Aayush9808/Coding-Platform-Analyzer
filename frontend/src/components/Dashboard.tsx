import StatsOverview from './StatsOverview'
import PlatformCards from './PlatformCards'
import ChartsSection from './ChartsSection'
import DuplicateAnalysis from './DuplicateAnalysis'
import AIInsights from './AIInsights'
import { exportToPDF, exportToExcel, exportShareLink } from '../utils/exportUtils'

interface DashboardProps {
  data: any
  onReset: () => void
}

export default function Dashboard({ data, onReset }: DashboardProps) {
  const handleExportPDF = () => {
    try {
      exportToPDF(data);
    } catch (error) {
      alert('❌ Failed to export PDF. Please try again.');
      console.error('PDF export error:', error);
    }
  };

  const handleExportExcel = () => {
    try {
      exportToExcel(data);
    } catch (error) {
      alert('❌ Failed to export Excel. Please try again.');
      console.error('Excel export error:', error);
    }
  };

  const handleShareLink = () => {
    try {
      exportShareLink(data);
    } catch (error) {
      alert('❌ Failed to generate share link. Please try again.');
      console.error('Share link error:', error);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with Reset Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Your Coding Analytics</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Analyzed {data.overall.platformsAnalyzed} platform{data.overall.platformsAnalyzed > 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={onReset}
          className="btn-secondary"
        >
          🔄 Analyze Another Profile
        </button>
      </div>

      {/* Overall Statistics */}
      <StatsOverview stats={data.overall} />

      {/* AI-Powered Insights */}
      {data.aiInsights && (
        <AIInsights insights={data.aiInsights} />
      )}

      {/* Duplicate Analysis */}
      {data.duplicateAnalysis && (
        <DuplicateAnalysis analysis={data.duplicateAnalysis} />
      )}

      {/* Platform-Specific Cards */}
      <PlatformCards platforms={data.platforms} />

      {/* Charts and Visualizations */}
      <ChartsSection data={data} />

      {/* Export Options */}
      <div className="card text-center">
        <h3 className="text-xl font-bold mb-4">Export Your Report</h3>
        <div className="flex justify-center gap-4 flex-wrap">
          <button 
            onClick={handleExportPDF}
            className="btn-primary"
          >
            📄 Download PDF
          </button>
          <button 
            onClick={handleExportExcel}
            className="btn-secondary"
          >
            📊 Export to Excel
          </button>
          <button 
            onClick={handleShareLink}
            className="btn-secondary"
          >
            🔗 Share Link
          </button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          💡 Download detailed Excel with multiple sheets or share your profile link
        </p>
      </div>
    </div>
  )
}
