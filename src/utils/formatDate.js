/**
 * Format date to readable string
 * @param {string} dateString - ISO date string (YYYY-MM-DD or full ISO format)
 * @param {string} format - Format type: 'short', 'long', 'relative'
 * @returns {string} Formatted date
 */
export function formatDate(dateString, format = 'short') {
  const date = new Date(dateString);
  const now = new Date();
  
  if (format === 'relative') {
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  }
  
  if (format === 'long') {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  // Default short format
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Format currency value
 * @param {number} value - Numeric value
 * @returns {string} Formatted currency
 */
export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

/**
 * Get intent color class
 * @param {string} intentLevel - Intent level: 'High', 'Mid', 'Low'
 * @returns {string} Tailwind color class
 */
export function getIntentColor(intentLevel) {
  switch (intentLevel) {
    case 'High':
      return 'bg-red-100 text-red-800';
    case 'Mid':
      return 'bg-yellow-100 text-yellow-800';
    case 'Low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

/**
 * Get stage color class
 * @param {string} stage - Lead stage
 * @returns {string} Tailwind color class
 */
export function getStageColor(stage) {
  switch (stage) {
    case 'Lead':
      return 'bg-blue-100 text-blue-800';
    case 'MQL':
      return 'bg-purple-100 text-purple-800';
    case 'SQL':
      return 'bg-orange-100 text-orange-800';
    case 'Customer':
      return 'bg-green-100 text-green-800';
    case 'Nurtured':
      return 'bg-indigo-100 text-indigo-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

/**
 * Get industry color class
 * @param {string} industry - Industry type
 * @returns {string} Tailwind color class
 */
export function getIndustryColor(industry) {
  const colors = [
    'bg-pink-100 text-pink-800',
    'bg-cyan-100 text-cyan-800',
    'bg-emerald-100 text-emerald-800',
    'bg-amber-100 text-amber-800',
    'bg-violet-100 text-violet-800',
    'bg-rose-100 text-rose-800',
    'bg-teal-100 text-teal-800',
    'bg-lime-100 text-lime-800'
  ];
  
  // Simple hash function to consistently assign colors
  let hash = 0;
  for (let i = 0; i < industry.length; i++) {
    hash = industry.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
}
