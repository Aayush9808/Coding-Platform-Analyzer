import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function showToast(message: string, type: 'success' | 'error' | 'loading' = 'success') {
  const colors = { success: '#10b981', error: '#ef4444', loading: '#3b82f6' };
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `position:fixed;top:20px;right:20px;background:${colors[type]};color:white;padding:16px 24px;border-radius:8px;z-index:9999;box-shadow:0 4px 6px rgba(0,0,0,0.1);font-family:system-ui;font-size:14px;font-weight:500;`;
  toast.id = 'export-toast';
  const existing = document.getElementById('export-toast');
  if (existing) existing.remove();
  document.body.appendChild(toast);
  if (type !== 'loading') setTimeout(() => toast.remove(), 3000);
  return toast;
}

export const exportToPDF = (data: any) => {
  const loading = showToast('Generating PDF...', 'loading');
  try {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text('Coding Analysis Report', 105, 20, { align: 'center' });
    
    // Overall Stats Table
    doc.setFontSize(14);
    doc.text('Overall Statistics', 14, 35);
    autoTable(doc, {
      startY: 40,
      head: [['Metric', 'Value']],
      body: [
        ['Total Problems', data.overall?.stats?.total || 0],
        ['Unique Problems', data.overall?.stats?.unique || 0],
        ['Easy', data.overall?.stats?.easy || 0],
        ['Medium', data.overall?.stats?.medium || 0],
        ['Hard', data.overall?.stats?.hard || 0],
        ['Duplicates Found', data.overall?.duplicates || 0],
        ['Platforms Analyzed', data.overall?.platformsAnalyzed || 0]
      ]
    });
    
    // Platform Details
    const finalY = (doc as any).lastAutoTable.finalY || 100;
    doc.text('Platform Details', 14, finalY + 10);
    
    const platformData: any[] = [];
    Object.entries(data.platforms || {}).forEach(([platform, pData]: [string, any]) => {
      if (!pData.error) {
        platformData.push([
          platform.toUpperCase(),
          pData.stats?.total || 0,
          pData.stats?.easy || 0,
          pData.stats?.medium || 0,
          pData.stats?.hard || 0
        ]);
      }
    });
    
    autoTable(doc, {
      startY: finalY + 15,
      head: [['Platform', 'Total', 'Easy', 'Medium', 'Hard']],
      body: platformData
    });
    
    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `coding-analysis-${Date.now()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    loading.remove();
    showToast('PDF downloaded!', 'success');
  } catch (error) {
    console.error(error);
    loading.remove();
    showToast('Failed to generate PDF', 'error');
  }
};

export const exportToExcel = (data: any) => {
  const loading = showToast('Generating Excel...', 'loading');
  try {
    const XLSX = require('xlsx');
    const wb = XLSX.utils.book_new();
    
    // Overview Sheet
    const overviewData = [
      ['Metric', 'Value'],
      ['Total Problems', data.overall?.stats?.total || 0],
      ['Unique Problems', data.overall?.stats?.unique || 0],
      ['Easy', data.overall?.stats?.easy || 0],
      ['Medium', data.overall?.stats?.medium || 0],
      ['Hard', data.overall?.stats?.hard || 0],
      ['Duplicates Found', data.overall?.duplicates || 0],
      ['Platforms Analyzed', data.overall?.platformsAnalyzed || 0]
    ];
    const ws1 = XLSX.utils.aoa_to_sheet(overviewData);
    XLSX.utils.book_append_sheet(wb, ws1, 'Overview');
    
    // Platform Details Sheet
    const platformData = [['Platform', 'Total', 'Easy', 'Medium', 'Hard']];
    Object.entries(data.platforms || {}).forEach(([platform, pData]: [string, any]) => {
      if (!pData.error) {
        platformData.push([
          platform.toUpperCase(),
          pData.stats?.total || 0,
          pData.stats?.easy || 0,
          pData.stats?.medium || 0,
          pData.stats?.hard || 0
        ]);
      }
    });
    const ws2 = XLSX.utils.aoa_to_sheet(platformData);
    XLSX.utils.book_append_sheet(wb, ws2, 'Platforms');
    
    XLSX.writeFile(wb, `coding-analysis-${Date.now()}.xlsx`);
    
    loading.remove();
    showToast('Excel downloaded!', 'success');
  } catch (error) {
    console.error(error);
    loading.remove();
    showToast('Failed to generate Excel', 'error');
  }
};

export const exportShareLink = (data: any) => {
  const loading = showToast('Generating link...', 'loading');
  try {
    // Extract usernames from the platforms data
    const profileParams: string[] = [];
    
    Object.entries(data.platforms || {}).forEach(([platform, pData]: [string, any]) => {
      if (!pData.error && pData.accounts && Array.isArray(pData.accounts)) {
        pData.accounts.forEach((acc: any) => {
          if (acc.username) {
            profileParams.push(`${platform.toLowerCase()}=${encodeURIComponent(acc.username)}`);
          }
        });
      }
    });
    
    if (profileParams.length === 0) {
      loading.remove();
      showToast('No profiles found to share', 'error');
      return;
    }
    
    const shareUrl = `${window.location.origin}?${profileParams.join('&')}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      loading.remove();
      showToast('Link copied to clipboard!', 'success');
    }).catch(() => {
      loading.remove();
      showToast('Failed to copy link', 'error');
    });
  } catch (error) {
    console.error(error);
    loading.remove();
    showToast('Failed to generate link', 'error');
  }
};
