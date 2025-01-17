export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(Math.floor(num))
}

export const formatUSD = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(Math.floor(num))
}

// For future use with larger numbers
export const formatCompactNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(num)
} 