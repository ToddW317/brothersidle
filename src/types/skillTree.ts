import { Industry } from '@/stores/gameStore'

export type NodeType = 'normal' | 'notable' | 'keystone'
export type NodePath = 'mining' | 'farming' | 'crafting' | 'trading'

export interface SkillNodeEffect {
  type: 'production_speed' | 'resource_cost' | 'resource_gain' | 'chance_bonus' | 'unlock_feature'
  value: number
  description: string
  target?: string // For specific resource targets like 'stone', 'wood', etc.
}

export interface SkillNode {
  id: string
  name: string
  type: NodeType
  path: NodePath
  description: string
  effects: SkillNodeEffect[]
  position: {
    x: number
    y: number
  }
  connections: string[] // IDs of connected nodes
  requirements: {
    level: number
    skillPoints: number
  }
  specialization: Industry
}

export interface SkillPath {
  id: NodePath
  name: string
  description: string
  specialization: Industry
  nodes: SkillNode[]
}

export interface SkillTree {
  specialization: Industry
  paths: SkillPath[]
  availablePoints: number
  allocatedNodes: string[] // IDs of allocated nodes
}

// Constants for node positioning
export const GRID_SIZE = 80 // Size of each grid cell in pixels
export const NODE_RADIUS = 30 // Size of each node
export const PATH_SPACING = 200 // Horizontal spacing between paths
export const INITIAL_X_OFFSET = 300 // Initial X offset to center the tree
export const INITIAL_Y_OFFSET = 100 // Initial Y offset for vertical centering

// Helper function to calculate node position
export const calculateNodePosition = (pathIndex: number, nodeIndex: number): { x: number; y: number } => {
  return {
    x: INITIAL_X_OFFSET + (pathIndex * PATH_SPACING) + (nodeIndex % 2 === 0 ? 0 : GRID_SIZE/2),
    y: INITIAL_Y_OFFSET + (nodeIndex * GRID_SIZE)
  }
}

// Helper function to generate unique node ID
export const generateNodeId = (specialization: Industry, path: NodePath, name: string): string => {
  return `${specialization}-${path}-${name.toLowerCase().replace(/\s+/g, '-')}`
} 