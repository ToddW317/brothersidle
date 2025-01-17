'use client'

import { formatNumber } from '@/utils/formatters'

interface XPBarProps {
  xp: number
  maxXp: number
  level: number
  color: string
}

export default function XPBar({ xp, maxXp, level, color }: XPBarProps) {
  const progress = Math.min((xp / maxXp) * 100, 100)
  
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1">
        <span>Level {level}</span>
        <span>{formatNumber(xp)} / {formatNumber(maxXp)} XP</span>
      </div>
      <div className="w-full h-2 bg-gray-700 rounded overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${color}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
} 