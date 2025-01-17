'use client'

import { useEffect } from 'react'
import { useGameStore, SPECIALIZATION_COLORS, SPECIALIZATION_INFO } from '@/stores/gameStore'
import MarketUI from './MarketUI'
import ResourceIcon from './ResourceIcon'
import ProductionSection from './ProductionSection'
import XPBar from './XPBar'
import { formatNumber, formatUSD } from '@/utils/formatters'
import SkillTree from './SkillTree'

export default function GameUI() {
  const { 
    resources, 
    specialization, 
    specializationLevel,
    specializationProgress,
    setSpecialization, 
    tick 
  } = useGameStore()

  useEffect(() => {
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [tick])

  const industries = ['mining', 'farming', 'crafting', 'trading']

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-3xl font-bold mb-4 hover:text-blue-400 transition-colors">
          Brother's Idle
        </h1>
        
        <div className="mb-4">
          <h2 className="text-xl mb-2">Choose Specialization:</h2>
          <div className="grid grid-cols-4 gap-2">
            {industries.map((industry) => {
              const color = SPECIALIZATION_COLORS[industry as keyof typeof SPECIALIZATION_COLORS]
              const info = SPECIALIZATION_INFO[industry as keyof typeof SPECIALIZATION_INFO]
              const progress = specializationProgress[industry as keyof typeof specializationProgress]
              
              return (
                <div key={industry} className="flex flex-col gap-2">
                  <button
                    onClick={() => setSpecialization(industry as any)}
                    className={`p-4 rounded transform transition-all duration-150 hover:scale-105 ${
                      specialization === industry 
                        ? `bg-${color}-600 shadow-lg shadow-${color}-500/50 animate-pulse` 
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    <div className="text-lg font-bold mb-2">
                      {industry.charAt(0).toUpperCase() + industry.slice(1)}
                    </div>
                    <XPBar 
                      xp={progress.xp}
                      maxXp={progress.maxXp}
                      level={progress.level}
                      color={`bg-${color}-500`}
                    />
                  </button>
                  
                  {specialization === industry && (
                    <div className="bg-gray-800 p-2 rounded text-sm animate-fadeIn">
                      <div className="mb-2">{info.description}</div>
                      <div className="text-xs">
                        {Object.entries(info.levelUnlocks).map(([reqLevel, feature]) => (
                          <div 
                            key={reqLevel} 
                            className={`${
                              Number(reqLevel) <= progress.level 
                                ? 'text-green-400' 
                                : 'text-gray-500'
                            }`}
                          >
                            Level {reqLevel}: {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
        
        {!specialization && (
          <div className="text-yellow-400 mt-2 animate-bounce">
            ⚠️ Select a specialization to start producing resources!
          </div>
        )}
      </div>

      {/* Skill Tree */}
      {specialization && (
        <div className="mb-8 animate-fadeIn">
          <SkillTree />
        </div>
      )}

      <div className="grid gap-4">
        {/* Resources */}
        <div className="bg-gray-800 p-4 rounded transform transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl mb-4 text-blue-300">Resources</h2>
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(resources).map(([resource, amount]) => (
              <div 
                key={resource} 
                className="bg-gray-700 p-2 rounded transform transition-all duration-150 hover:scale-105 hover:bg-gray-600"
              >
                <div className="font-bold text-blue-200 flex items-center gap-2">
                  <ResourceIcon type={resource as any} className="w-5 h-5" />
                  {resource.charAt(0).toUpperCase() + resource.slice(1)}
                </div>
                <div className="transition-all">
                  {resource === 'gold' ? formatUSD(amount) : formatNumber(amount)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Productions */}
        <ProductionSection type="basic" />
        <ProductionSection type="advanced" />

        {/* Market */}
        <MarketUI />
      </div>
    </div>
  )
} 