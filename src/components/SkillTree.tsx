'use client'

import { useGameStore } from '@/stores/gameStore'
import { SkillNode as SkillNodeType, GRID_SIZE, NODE_RADIUS } from '@/types/skillTree'
import type { SkillTree } from '@/types/skillTree'
import { useState, useEffect } from 'react'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'

interface SkillNodeProps {
  node: SkillNodeType
  isAllocated: boolean
  canAllocate: boolean
  onAllocate: () => void
  delay: number
  tree: SkillTree
}

const SkillNode = ({ node, isAllocated, canAllocate, onAllocate, delay, tree }: SkillNodeProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])
  
  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTooltipPosition({
      x: rect.right + 10, // 10px offset from node
      y: rect.top - 10    // Slightly above the node
    })
    setIsHovered(true)
  }
  
  const baseColor = isAllocated ? 'bg-amber-500' : canAllocate ? 'bg-amber-700' : 'bg-gray-700'
  const borderColor = isAllocated ? 'border-amber-300' : canAllocate ? 'border-amber-500' : 'border-gray-500'
  const hoverEffect = canAllocate ? 'hover:scale-110 hover:border-amber-400 cursor-pointer' : ''
  const pulseEffect = isAllocated ? 'animate-pulse' : ''
  const glowEffect = isAllocated ? 'shadow-lg shadow-amber-500/50' : ''
  
  const handleClick = () => {
    if (!canAllocate) return
    
    setIsAnimating(true)
    onAllocate()
    setTimeout(() => setIsAnimating(false), 1000)
  }
  
  return (
    <>
      {/* Node circle */}
      <div 
        className={`absolute w-12 h-12 rounded-full border-2 ${baseColor} ${borderColor} ${hoverEffect} ${pulseEffect} ${glowEffect} transform transition-all duration-500 flex items-center justify-center text-white font-bold
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
          ${isAnimating ? 'animate-allocate' : ''}`}
        style={{ 
          left: node.position.x - NODE_RADIUS,
          top: node.position.y - NODE_RADIUS,
          transitionDelay: `${delay}ms`
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {/* Icon or text based on node type */}
        <span className={`transition-transform duration-300 ${isHovered ? 'scale-125' : ''}`}>
          {node.type === 'keystone' ? '★' : 
           node.type === 'notable' ? '◆' : '●'}
        </span>
      </div>
      
      {/* Tooltip */}
      {isHovered && (
        <div 
          className="fixed z-[100] bg-gray-800 border border-gray-600 p-4 rounded-lg shadow-xl max-w-xs animate-fadeIn"
          style={{ 
            left: tooltipPosition.x,
            top: tooltipPosition.y
          }}
        >
          <h3 className="text-amber-400 font-bold mb-1">{node.name}</h3>
          <p className="text-gray-300 text-sm mb-2">{node.description}</p>
          <div className="space-y-1">
            {node.effects.map((effect, i) => (
              <p key={i} className="text-amber-300 text-xs">
                {effect.description}
              </p>
            ))}
          </div>
          {!isAllocated && (
            <div className="mt-2 text-xs">
              <div className={`${canAllocate ? 'text-gray-400 animate-bounce' : 'text-red-400'}`}>
                {canAllocate ? (
                  'Click to allocate point'
                ) : (
                  <>
                    Requirements not met:
                    <ul className="list-disc list-inside mt-1">
                      <li>Level {node.requirements.level}</li>
                      <li>{node.requirements.skillPoints} skill points</li>
                      {tree.allocatedNodes.length > 0 && node.position.y > 100 && (
                        <li>Connected to allocated node</li>
                      )}
                    </ul>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Allocation effect */}
      {isAnimating && (
        <div 
          className="absolute w-20 h-20 rounded-full border-4 border-amber-400 animate-ripple"
          style={{ 
            left: node.position.x - 40,
            top: node.position.y - 40
          }}
        />
      )}
    </>
  )
}

interface ConnectionProps {
  from: { x: number; y: number }
  to: { x: number; y: number }
  isActive: boolean
  delay: number
}

const Connection = ({ from, to, isActive, delay }: ConnectionProps) => {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])
  
  return (
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke={isActive ? '#f59e0b' : '#4b5563'}
      strokeWidth={isActive ? 3 : 2}
      className={`transition-all duration-500`}
      style={{
        opacity: isVisible ? 1 : 0,
        strokeDasharray: isActive ? '0' : '5,5',
        strokeDashoffset: isActive ? '0' : '0',
        animation: isActive ? 'flow 1s linear infinite' : 'none',
        transitionDelay: `${delay}ms`
      }}
    />
  )
}

export default function SkillTree() {
  const { 
    specialization,
    skillTrees,
    canAllocateNode,
    allocateSkillPoint,
    specializationProgress
  } = useGameStore()
  
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  if (!specialization) return null
  
  const tree = skillTrees[specialization]
  const currentLevel = specializationProgress[specialization].level
  
  return (
    <div className="relative bg-gray-900 rounded-lg overflow-visible transition-all duration-300 mb-8">
      {/* Header */}
      <div 
        className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-800 transition-colors sticky top-0 z-10 bg-gray-900"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div>
          <h2 className="text-2xl font-bold text-amber-400 animate-fadeIn">
            {specialization.charAt(0).toUpperCase() + specialization.slice(1)} Skill Tree
          </h2>
          <p className="text-gray-400 animate-fadeIn" style={{ animationDelay: '200ms' }}>
            Available Points: {tree.availablePoints}
          </p>
        </div>
        <button className="text-gray-400 hover:text-amber-400 transition-colors">
          {isCollapsed ? (
            <ChevronDownIcon className="w-6 h-6" />
          ) : (
            <ChevronUpIcon className="w-6 h-6" />
          )}
        </button>
      </div>
      
      {/* Collapsible Content */}
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isCollapsed ? 'h-0' : 'h-[600px]'
        }`}
      >
        <div className="relative w-full h-full min-w-[1000px] overflow-x-auto overflow-y-visible">
          {/* Path Labels */}
          {!isCollapsed && tree.paths.map((path, index) => (
            <div
              key={path.id}
              className="absolute text-amber-400 font-bold"
              style={{
                left: `${300 + (index * 200)}px`,
                top: '20px',
                transform: 'translateX(-50%)'
              }}
            >
              {path.name}
            </div>
          ))}
          
          {/* SVG Layer for connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {!isCollapsed && tree.paths.flatMap((path, pathIndex) => 
              path.nodes.flatMap((node, nodeIndex) =>
                node.connections.map((connId, connIndex) => {
                  // Find connected node across all paths
                  const connectedNode = tree.paths
                    .flatMap(p => p.nodes)
                    .find(n => n.id === connId)
                    
                  if (!connectedNode) return null
                  
                  const isActive = tree.allocatedNodes.includes(node.id) && 
                                tree.allocatedNodes.includes(connId)
                  
                  const delay = (pathIndex * 100) + (nodeIndex * 100) + (connIndex * 50)
                  
                  return (
                    <Connection
                      key={`${node.id}-${connId}`}
                      from={node.position}
                      to={connectedNode.position}
                      isActive={isActive}
                      delay={delay}
                    />
                  )
                })
              )
            )}
          </svg>
          
          {/* Nodes Layer */}
          <div className="relative w-full h-full">
            {!isCollapsed && tree.paths.flatMap((path, pathIndex) =>
              path.nodes.map((node, nodeIndex) => {
                const delay = (pathIndex * 100) + (nodeIndex * 100)
                
                return (
                  <SkillNode
                    key={node.id}
                    node={node}
                    isAllocated={tree.allocatedNodes.includes(node.id)}
                    canAllocate={canAllocateNode(node.id)}
                    onAllocate={() => allocateSkillPoint(node.id)}
                    delay={delay}
                    tree={tree}
                  />
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 