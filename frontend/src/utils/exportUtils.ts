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
    doc.setFontSize(20);
    doc.text('Coding Analysis Report', 105, 20, { align: 'center' });
    
    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analysis-${Date.now()}.pdf`;
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
    
    const overviewData = [
      ['Total Problems', data.overall.totalProblems || 0],
      ['Easy', data.overall.easy || 0],
      ['Medium', data.overall.medium || 0],
      ['Hard', data.overall.hard || 0]
    ];
    const ws = XLSX.utils.aoa_to_sheet(overviewData);
    XLSX.utils.book_append_sheet(wb, ws, 'Overview');
    
    XLSX.writeFile(wb, `analysis-${Date.now()}.xlsx`);
    
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
    const usernames: string[] = [];
    Object.entries(data.platforms).forEach(([platform, pData]: [string, any]) => {
      pData.accounts.forEach((acc: any) => {
        if (acc.username) usernames.push(`${platform}:${acc.username}`);
      });
    });
    
    const shareUrl = `${window.location.origin}?profiles=${encodeURIComponent(usernames.join(','))}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      loading.remove();
      showToast('Link copied!', 'success');
    }).catch(() => {
      loading.remove();
      showToast('Failed to copy', 'error');
    });
  } catch (error) {
    console.error(error);
    loading.remove();
    showToast('Failed to generate link', 'error');
  }
};
