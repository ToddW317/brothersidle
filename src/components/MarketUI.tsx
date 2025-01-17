'use client'

import { useState } from 'react'
import { useGameStore } from '@/stores/gameStore'
import { formatNumber, formatUSD } from '@/utils/formatters'
import ResourceIcon from './ResourceIcon'

export default function MarketUI() {
  const { resources, marketPrices, buyResource, sellResource, specialization, specializationLevel } = useGameStore()
  const [selectedResource, setSelectedResource] = useState<string>('wood')
  const [amount, setAmount] = useState(1)
  const [showTrade, setShowTrade] = useState(false)

  const tradableResources = [
    'wood', 'stone', 'food', 'ore', 'tools',
    'furniture', 'bricks', 'meals', 'metal', 'machines'
  ]

  const handleBuy = () => {
    buyResource(selectedResource as any, amount)
    setShowTrade(true)
    setTimeout(() => setShowTrade(false), 1000)
  }

  const handleSell = () => {
    sellResource(selectedResource as any, amount)
    setShowTrade(true)
    setTimeout(() => setShowTrade(false), 1000)
  }

  // Calculate trading bonuses
  const tradingLevel = specializationLevel.trading
  const basePrice = marketPrices[selectedResource as keyof typeof marketPrices]
  const buyDiscount = specialization === 'trading' ? 0.1 + (tradingLevel - 1) * 0.02 : 0
  const sellBonus = specialization === 'trading' ? 0.15 + (tradingLevel - 1) * 0.02 : 0
  
  const buyPrice = basePrice * (1 - buyDiscount)
  const sellPrice = basePrice * (1 + sellBonus)
  
  const canAffordBuy = resources.money >= (buyPrice * amount)
  const canSell = resources[selectedResource as keyof typeof resources] >= amount

  return (
    <div className="bg-gray-800 p-4 rounded transform transition-all duration-300 hover:shadow-xl relative overflow-hidden">
      <h2 className="text-xl mb-4 text-yellow-300">Market</h2>
      
      {showTrade && (
        <div className="absolute inset-0 bg-green-500/20 animate-fade-out pointer-events-none" />
      )}
      
      <div className="grid gap-4">
        <div className="grid grid-cols-5 gap-2">
          {tradableResources.map((resource) => (
            <button
              key={resource}
              onClick={() => setSelectedResource(resource)}
              className={`p-2 rounded text-sm transform transition-all duration-150 hover:scale-105 ${
                selectedResource === resource
                  ? 'bg-blue-600 shadow-lg shadow-blue-500/50' 
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                <ResourceIcon type={resource as any} className="w-4 h-4" />
                {resource.charAt(0).toUpperCase() + resource.slice(1)}
              </div>
            </button>
          ))}
        </div>

        <div className="bg-gray-700 p-2 rounded transform transition-all duration-150 hover:bg-gray-600">
          <div className="flex justify-between items-center">
            <span>Base Price:</span>
            <span className="text-yellow-300 font-bold">
              {formatUSD(basePrice)}
            </span>
          </div>
          {specialization === 'trading' && (
            <div className="mt-2 text-sm">
              <div className="flex justify-between text-green-300">
                <span>Trading Level {tradingLevel} Bonus:</span>
                <span>
                  Buy: -{(buyDiscount * 100).toFixed(0)}% | 
                  Sell: +{(sellBonus * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 1))}
            className="bg-gray-700 p-2 rounded w-24 text-center transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          
          <div className="flex gap-2 flex-1 justify-end">
            <button
              onClick={handleBuy}
              disabled={!canAffordBuy}
              className={`px-4 py-2 rounded flex-1 transform transition-all duration-150 hover:scale-105 ${
                canAffordBuy
                  ? 'bg-green-600 hover:bg-green-500 shadow-lg shadow-green-500/50'
                  : 'bg-gray-600 cursor-not-allowed opacity-50'
              }`}
            >
              Buy
            </button>
            
            <button
              onClick={handleSell}
              disabled={!canSell}
              className={`px-4 py-2 rounded flex-1 transform transition-all duration-150 hover:scale-105 ${
                canSell
                  ? 'bg-red-600 hover:bg-red-500 shadow-lg shadow-red-500/50'
                  : 'bg-gray-600 cursor-not-allowed opacity-50'
              }`}
            >
              Sell
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-gray-700 p-2 rounded transform transition-all duration-150 hover:bg-gray-600">
            <div className="text-green-300">Cost to Buy:</div>
            <div className="text-yellow-300 font-bold">
              {formatUSD(buyPrice * amount)}
            </div>
            {specialization === 'trading' && buyDiscount > 0 && (
              <div className="text-green-500 text-xs">
                You save: {formatUSD((basePrice - buyPrice) * amount)}
              </div>
            )}
          </div>
          <div className="bg-gray-700 p-2 rounded transform transition-all duration-150 hover:bg-gray-600">
            <div className="text-red-300">Sell Value:</div>
            <div className="text-yellow-300 font-bold">
              {formatUSD(sellPrice * amount)}
            </div>
            {specialization === 'trading' && sellBonus > 0 && (
              <div className="text-green-500 text-xs">
                Bonus: {formatUSD((sellPrice - basePrice) * amount)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 