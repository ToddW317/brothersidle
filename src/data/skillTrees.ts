import { Industry } from '@/stores/gameStore'
import { SkillTree, NodePath, generateNodeId, calculateNodePosition } from '@/types/skillTree'

// Mining Skill Tree
export const MINING_SKILL_TREE: SkillTree = {
  availablePoints: 0,
  allocatedNodes: [],
  specialization: 'mining',
  paths: [
    {
      id: 'quarry',
      name: 'Quarry Path',
      description: 'Focus on stone production and processing',
      specialization: 'mining',
      nodes: [
        {
          id: generateNodeId('mining', 'quarry', 'Stone Efficiency'),
          name: 'Stone Efficiency',
          type: 'normal',
          path: 'quarry',
          position: { x: 300, y: 100 },
          connections: [generateNodeId('mining', 'quarry', 'Advanced Quarrying')],
          effects: [
            { type: 'production_speed', value: 10, description: '+10% stone production', target: 'stone' }
          ],
          description: 'Increase stone production efficiency',
          requirements: { level: 1, skillPoints: 1 },
          specialization: 'mining'
        },
        {
          id: generateNodeId('mining', 'quarry', 'Advanced Quarrying'),
          name: 'Advanced Quarrying',
          type: 'normal',
          path: 'quarry',
          position: { x: 300, y: 200 },
          connections: [
            generateNodeId('mining', 'quarry', 'Stone Efficiency'),
            generateNodeId('mining', 'quarry', 'Master Quarry')
          ],
          effects: [
            { type: 'production_speed', value: 10, description: '+10% stone production', target: 'stone' },
            { type: 'resource_cost', value: -5, description: '-5% resource cost', target: 'stone' }
          ],
          description: 'Improved stone production efficiency',
          requirements: { level: 3, skillPoints: 2 },
          specialization: 'mining'
        },
        {
          id: generateNodeId('mining', 'quarry', 'Master Quarry'),
          name: 'Master Quarry',
          type: 'notable',
          path: 'quarry',
          position: { x: 300, y: 300 },
          connections: [
            generateNodeId('mining', 'quarry', 'Advanced Quarrying'),
            generateNodeId('mining', 'quarry', 'Quarry Mastery'),
            generateNodeId('mining', 'ore', 'Ore Efficiency')
          ],
          effects: [
            { type: 'chance_bonus', value: 10, description: '10% chance to produce double stone', target: 'stone' }
          ],
          description: 'Chance to double stone production',
          requirements: { level: 5, skillPoints: 3 },
          specialization: 'mining'
        },
        {
          id: generateNodeId('mining', 'quarry', 'Quarry Mastery'),
          name: 'Quarry Mastery',
          type: 'keystone',
          path: 'quarry',
          position: { x: 300, y: 400 },
          connections: [generateNodeId('mining', 'quarry', 'Master Quarry')],
          effects: [
            { type: 'unlock_feature', value: 20, description: '20% chance for stone to produce ore', target: 'ore' }
          ],
          description: 'Stone production can yield ore',
          requirements: { level: 7, skillPoints: 4 },
          specialization: 'mining'
        }
      ]
    },
    {
      id: 'ore',
      name: 'Ore Path',
      description: 'Focus on ore mining and precious metals',
      specialization: 'mining',
      nodes: [
        {
          id: generateNodeId('mining', 'ore', 'Ore Efficiency'),
          name: 'Ore Efficiency',
          type: 'normal',
          path: 'ore',
          position: { x: 500, y: 100 },
          connections: [generateNodeId('mining', 'ore', 'Deep Mining')],
          effects: [
            { type: 'production_speed', value: 5, description: '+5% ore production', target: 'ore' }
          ],
          description: 'Increase ore production speed',
          requirements: { level: 5, skillPoints: 1 },
          specialization: 'mining'
        },
        {
          id: generateNodeId('mining', 'ore', 'Deep Mining'),
          name: 'Deep Mining',
          type: 'normal',
          path: 'ore',
          position: { x: 500, y: 200 },
          connections: [
            generateNodeId('mining', 'ore', 'Ore Efficiency'),
            generateNodeId('mining', 'ore', 'Precious Metals'),
            generateNodeId('mining', 'processing', 'Efficient Smelting')
          ],
          effects: [
            { type: 'production_speed', value: 10, description: '+10% ore production', target: 'ore' },
            { type: 'chance_bonus', value: 2, description: '2% chance to find rare materials', target: 'ore' }
          ],
          description: 'Advanced ore extraction techniques',
          requirements: { level: 6, skillPoints: 2 },
          specialization: 'mining'
        },
        {
          id: generateNodeId('mining', 'ore', 'Precious Metals'),
          name: 'Precious Metals',
          type: 'notable',
          path: 'ore',
          position: { x: 500, y: 300 },
          connections: [
            generateNodeId('mining', 'ore', 'Deep Mining'),
            generateNodeId('mining', 'ore', 'Core Tapper')
          ],
          effects: [
            { type: 'chance_bonus', value: 5, description: '5% chance to find gold while mining ore', target: 'ore' }
          ],
          description: 'Chance to find gold while mining ore',
          requirements: { level: 7, skillPoints: 3 },
          specialization: 'mining'
        },
        {
          id: generateNodeId('mining', 'ore', 'Core Tapper'),
          name: 'Core Tapper',
          type: 'keystone',
          path: 'ore',
          position: { x: 500, y: 400 },
          connections: [generateNodeId('mining', 'ore', 'Precious Metals')],
          effects: [
            { type: 'chance_bonus', value: 10, description: '10% chance for double metal from smelting', target: 'metal' }
          ],
          description: 'Significantly improve metal smelting',
          requirements: { level: 8, skillPoints: 4 },
          specialization: 'mining'
        }
      ]
    },
    {
      id: 'processing',
      name: 'Processing Path',
      description: 'Focus on resource processing and efficiency',
      specialization: 'mining',
      nodes: [
        {
          id: generateNodeId('mining', 'processing', 'Resource Conservation'),
          name: 'Resource Conservation',
          type: 'normal',
          path: 'processing',
          position: { x: 700, y: 100 },
          connections: [generateNodeId('mining', 'processing', 'Efficient Smelting')],
          effects: [
            { type: 'resource_cost', value: -5, description: '-5% resource cost in all processing', target: 'all' }
          ],
          description: 'Reduce resource costs in processing',
          requirements: { level: 3, skillPoints: 1 },
          specialization: 'mining'
        },
        {
          id: generateNodeId('mining', 'processing', 'Efficient Smelting'),
          name: 'Efficient Smelting',
          type: 'normal',
          path: 'processing',
          position: { x: 700, y: 200 },
          connections: [
            generateNodeId('mining', 'processing', 'Resource Conservation'),
            generateNodeId('mining', 'processing', 'Mass Production')
          ],
          effects: [
            { type: 'resource_cost', value: -10, description: '-10% metal crafting cost', target: 'metal' }
          ],
          description: 'Improve metal crafting efficiency',
          requirements: { level: 4, skillPoints: 2 },
          specialization: 'mining'
        },
        {
          id: generateNodeId('mining', 'processing', 'Mass Production'),
          name: 'Mass Production',
          type: 'notable',
          path: 'processing',
          position: { x: 700, y: 300 },
          connections: [
            generateNodeId('mining', 'processing', 'Efficient Smelting'),
            generateNodeId('mining', 'processing', 'Master Processor'),
            generateNodeId('mining', 'quarry', 'Master Quarry')
          ],
          effects: [
            { type: 'production_speed', value: 15, description: '+15% production speed for all mining activities', target: 'all' }
          ],
          description: 'Significantly increase production speed',
          requirements: { level: 6, skillPoints: 3 },
          specialization: 'mining'
        },
        {
          id: generateNodeId('mining', 'processing', 'Master Processor'),
          name: 'Master Processor',
          type: 'keystone',
          path: 'processing',
          position: { x: 700, y: 400 },
          connections: [generateNodeId('mining', 'processing', 'Mass Production')],
          effects: [
            { type: 'resource_cost', value: -25, description: 'All processing costs reduced by 25%', target: 'all' }
          ],
          description: 'Mastery of resource processing',
          requirements: { level: 8, skillPoints: 4 },
          specialization: 'mining'
        }
      ]
    }
  ]
}

// Farming Skill Tree
const farmingTree: SkillTree = {
  specialization: 'farming',
  paths: [],  // TODO: Add farming paths
  availablePoints: 0,
  allocatedNodes: []
}

// Crafting Skill Tree
const craftingTree: SkillTree = {
  specialization: 'crafting',
  paths: [],  // TODO: Add crafting paths
  availablePoints: 0,
  allocatedNodes: []
}

// Trading Skill Tree
const tradingTree: SkillTree = {
  specialization: 'trading',
  paths: [],  // TODO: Add trading paths
  availablePoints: 0,
  allocatedNodes: []
}

export const skillTrees: Record<Industry, SkillTree> = {
  mining: MINING_SKILL_TREE,
  farming: farmingTree,
  crafting: craftingTree,
  trading: tradingTree
} 