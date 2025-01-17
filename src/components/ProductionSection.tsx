'use client'

import { SPECIALIZATION_COLORS, PRODUCTION_CHAINS } from '@/stores/gameStore'
import { useGameStore } from '@/stores/gameStore'
import { formatNumber, formatUSD } from '@/utils/formatters'
import ResourceIcon from './ResourceIcon'

interface ProductionSectionProps {
  type: 'basic' | 'advanced'
}

export default function ProductionSection({ type }: ProductionSectionProps) {
  const { 
    productions, 
    specialization,
    specializationLevel,
    canAffordUpgrade,
    canProduce,
    upgradeProduction
  } = useGameStore()

  if (!specialization) return null

  const productionList = PRODUCTION_CHAINS[specialization][type]
  if (productionList.length === 0) return null

  const colorClass = {
    mining: {
      title: 'text-amber-300',
      text: 'text-amber-200',
      button: 'bg-amber-600 hover:bg-amber-500 shadow-amber-500/50'
    },
    farming: {
      title: 'text-emerald-300',
      text: 'text-emerald-200',
      button: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/50'
    },
    crafting: {
      title: 'text-purple-300',
      text: 'text-purple-200',
      button: 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/50'
    },
    trading: {
      title: 'text-blue-300',
      text: 'text-blue-200',
      button: 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/50'
    }
  }[specialization]

  // Calculate level multiplier
  const levelMultiplier = 1 + ((specializationLevel[specialization] - 1) * 0.1)
  const specialtyMultiplier = 2.0

  return (
    <div className="bg-gray-800 p-4 rounded transform transition-all duration-300 hover:shadow-xl">
      <h2 className={`text-xl mb-4 ${colorClass.title}`}>
        {type === 'basic' ? 'Basic' : 'Advanced'} Productions
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {productionList.map((productionType) => {
          const prod = productions[productionType]
          const isAdvanced = type === 'advanced'
          const totalMultiplier = levelMultiplier * specialtyMultiplier
          const effectiveOutput = prod.outputAmount * prod.level * totalMultiplier
          
          return (
            <div 
              key={productionType} 
              className={`bg-gray-700 p-2 rounded flex flex-col justify-between transform transition-all duration-150 ${
                canProduce(productionType) ? 'hover:bg-gray-600' : 'opacity-50'
              }`}
            >
              <div>
                <div className={`font-bold ${colorClass.text} flex items-center gap-2`}>
                  {productionType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </div>
                <div className="text-sm text-gray-400">{prod.description}</div>
                <div>Level: {prod.level}</div>
                <div className="text-sm text-gray-400">
                  Cost: {formatUSD(prod.upgradeCosts.money)}
                </div>
                
                {/* Production details */}
                <div className="mt-2 text-sm">
                  <div className="text-gray-400">Production:</div>
                  <div className="flex items-center gap-1 ml-2">
                    <ResourceIcon type={prod.outputResource} className="w-4 h-4" />
                    {formatNumber(effectiveOutput)}/s {prod.outputResource}
                    {totalMultiplier > 1 && (
                      <span className="text-green-400 text-xs">
                        ({formatNumber(totalMultiplier)}x bonus)
                      </span>
                    )}
                  </div>
                </div>

                {prod.requirements && (
                  <div className="mt-2">
                    <div className="text-sm text-gray-400">
                      Consumes per second:
                      <ul className="list-disc list-inside">
                        {prod.requirements.map((req, i) => (
                          <li key={i} className="flex items-center gap-1 ml-2">
                            <ResourceIcon type={req.resource} className="w-4 h-4 inline" />
                            {formatNumber(req.amount * effectiveOutput)} {req.resource}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {prod.minSpecializationLevel && (
                  <div className={`text-sm mt-2 ${
                    specializationLevel[specialization] >= prod.minSpecializationLevel
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}>
                    Requires {specialization} level {prod.minSpecializationLevel}
                  </div>
                )}
              </div>

              <button
                onClick={() => upgradeProduction(productionType)}
                disabled={!canAffordUpgrade(productionType) || !canProduce(productionType)}
                className={`px-3 py-1 rounded transform transition-all duration-150 hover:scale-105 mt-2 ${
                  canAffordUpgrade(productionType) && canProduce(productionType)
                    ? colorClass.button
                    : 'bg-gray-600 cursor-not-allowed opacity-50'
                }`}
              >
                Upgrade
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
} 