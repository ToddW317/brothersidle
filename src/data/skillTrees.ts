import { Industry } from '@/stores/gameStore'
import { SkillTree, NodePath, generateNodeId, calculateNodePosition } from '@/types/skillTree'

// Mining Skill Tree
export const MINING_SKILL_TREE: SkillTree = {
  availablePoints: 0,
  allocatedNodes: [],
  specialization: 'mining',
  paths: [
    {
      id: 'mining',
      name: 'Mining Path',
      description: 'Master the art of mining and resource processing',
      specialization: 'mining',
      nodes: [
        // First Row (Left to Right)
        {
          id: generateNodeId('mining', 'mining', 'Stone Mastery'),
          name: 'Stone Mastery',
          type: 'normal',
          path: 'mining',
          position: { x: 100, y: 100 },
          connections: [generateNodeId('mining', 'mining', 'Efficient Quarrying')],
          effects: [
            { type: 'production_speed', value: 10, description: '+10% stone production', target: 'stone' }
          ],
          description: 'Improve stone production efficiency',
          requirements: { level: 1, skillPoints: 1 },
          specialization: 'mining'
        },
        {
          id: generateNodeId('mining', 'mining', 'Efficient Quarrying'),
          name: 'Efficient Quarrying',
          type: 'normal',
          path: 'mining',
          position: { x: 300, y: 100 },
          connections: [generateNodeId('mining', 'mining', 'Resource Conservation')],
          effects: [
            { type: 'resource_cost', value: -10, description: '-10% resource cost', target: 'stone' }
          ],
          description: 'Reduce stone mining costs',
          requirements: { level: 2, skillPoints: 1 },
          specialization: 'mining'
        },
        {
          id: generateNodeId('mining', 'mining', 'Resource Conservation'),
          name: 'Resource Conservation',
          type: 'notable',
          path: 'mining',
          position: { x: 500, y: 100 },
          connections: [generateNodeId('mining', 'mining', 'Basic Ore Mining')],
          effects: [
            { type: 'resource_cost', value: -15, description: '-15% resource cost for all mining', target: 'all' }
          ],
          description: 'Significantly reduce mining costs',
          requirements: { level: 3, skillPoints: 2 },
          specialization: 'mining'
        },
        // Second Row (Right to Left)
        {
          id: generateNodeId('mining', 'mining', 'Basic Ore Mining'),
          name: 'Basic Ore Mining',
          type: 'normal',
          path: 'mining',
          position: { x: 500, y: 200 },
          connections: [generateNodeId('mining', 'mining', 'Advanced Mining')],
          effects: [
            { type: 'production_speed', value: 10, description: '+10% ore production', target: 'ore' }
          ],
          description: 'Begin ore mining operations',
          requirements: { level: 5, skillPoints: 2 },
          specialization: 'mining'
        },
        {
          id: generateNodeId('mining', 'mining', 'Advanced Mining'),
          name: 'Advanced Mining',
          type: 'normal',
          path: 'mining',
          position: { x: 300, y: 200 },
          connections: [generateNodeId('mining', 'mining', 'Mining Expertise')],
          effects: [
            { type: 'production_speed', value: 15, description: '+15% mining speed for all resources', target: 'all' }
          ],
          description: 'Improve all mining operations',
          requirements: { level: 6, skillPoints: 2 },
          specialization: 'mining'
        },
        {
          id: generateNodeId('mining', 'mining', 'Mining Expertise'),
          name: 'Mining Expertise',
          type: 'notable',
          path: 'mining',
          position: { x: 100, y: 200 },
          connections: [generateNodeId('mining', 'mining', 'Basic Smelting')],
          effects: [
            { type: 'chance_bonus', value: 10, description: '10% chance for double resources', target: 'all' }
          ],
          description: 'Chance to get bonus resources',
          requirements: { level: 7, skillPoints: 3 },
          specialization: 'mining'
        },
        // Third Row (Left to Right)
        {
          id: generateNodeId('mining', 'mining', 'Basic Smelting'),
          name: 'Basic Smelting',
          type: 'normal',
          path: 'mining',
          position: { x: 100, y: 300 },
          connections: [generateNodeId('mining', 'mining', 'Efficient Smelting')],
          effects: [
            { type: 'production_speed', value: 10, description: '+10% metal production', target: 'metal' }
          ],
          description: 'Begin metal smelting operations',
          requirements: { level: 8, skillPoints: 2 },
          specialization: 'mining'
        },
        {
          id: generateNodeId('mining', 'mining', 'Efficient Smelting'),
          name: 'Efficient Smelting',
          type: 'normal',
          path: 'mining',
          position: { x: 300, y: 300 },
          connections: [generateNodeId('mining', 'mining', 'Master Smelter')],
          effects: [
            { type: 'resource_cost', value: -15, description: '-15% ore cost in smelting', target: 'ore' }
          ],
          description: 'Reduce smelting costs',
          requirements: { level: 9, skillPoints: 2 },
          specialization: 'mining'
        },
        {
          id: generateNodeId('mining', 'mining', 'Master Smelter'),
          type: 'keystone',
          name: 'Master Smelter',
          path: 'mining',
          position: { x: 500, y: 300 },
          connections: [],
          effects: [
            { type: 'chance_bonus', value: 20, description: '20% chance for double metal from smelting', target: 'metal' }
          ],
          description: 'Master the art of smelting',
          requirements: { level: 10, skillPoints: 4 },
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