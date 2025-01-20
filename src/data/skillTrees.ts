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
export const FARMING_SKILL_TREE: SkillTree = {
  specialization: 'farming',
  paths: [
    {
      id: 'farming',
      name: 'Growth Path',
      description: 'Master the art of farming and food production',
      specialization: 'farming',
      nodes: [
        // First Row
        {
          id: generateNodeId('farming', 'farming', 'Quick Growth'),
          name: 'Quick Growth',
          type: 'normal',
          path: 'farming',
          position: { x: 100, y: 100 },
          connections: [generateNodeId('farming', 'farming', 'Fertile Soil')],
          effects: [
            { type: 'production_speed', value: 5, description: '+5% food production', target: 'food' }
          ],
          description: 'Increase food production speed',
          requirements: { level: 1, skillPoints: 1 },
          specialization: 'farming'
        },
        {
          id: generateNodeId('farming', 'farming', 'Fertile Soil'),
          name: 'Fertile Soil',
          type: 'normal',
          path: 'farming',
          position: { x: 300, y: 100 },
          connections: [generateNodeId('farming', 'farming', 'Abundant Harvest')],
          effects: [
            { type: 'production_speed', value: 10, description: '+10% food production', target: 'food' }
          ],
          description: 'Further increase food production',
          requirements: { level: 2, skillPoints: 1 },
          specialization: 'farming'
        },
        {
          id: generateNodeId('farming', 'farming', 'Abundant Harvest'),
          name: 'Abundant Harvest',
          type: 'notable',
          path: 'farming',
          position: { x: 500, y: 100 },
          connections: [generateNodeId('farming', 'farming', 'Efficient Cooking')],
          effects: [
            { type: 'chance_bonus', value: 15, description: '15% chance for double crops', target: 'food' }
          ],
          description: 'Chance to double crop yields',
          requirements: { level: 3, skillPoints: 2 },
          specialization: 'farming'
        },
        // Second Row
        {
          id: generateNodeId('farming', 'farming', 'Efficient Cooking'),
          name: 'Efficient Cooking',
          type: 'normal',
          path: 'farming',
          position: { x: 100, y: 200 },
          connections: [generateNodeId('farming', 'farming', 'Gourmet')],
          effects: [
            { type: 'resource_cost', value: -5, description: '-5% food usage in meals', target: 'food' }
          ],
          description: 'Reduce food cost in meal preparation',
          requirements: { level: 4, skillPoints: 1 },
          specialization: 'farming'
        },
        {
          id: generateNodeId('farming', 'farming', 'Gourmet'),
          name: 'Gourmet',
          type: 'normal',
          path: 'farming',
          position: { x: 300, y: 200 },
          connections: [generateNodeId('farming', 'farming', 'Master Chef'), generateNodeId('farming', 'farming', 'Basic Feast')],
          effects: [
            { type: 'production_speed', value: 10, description: '+10% meal value', target: 'meal' }
          ],
          description: 'Increase meal quality and value',
          requirements: { level: 5, skillPoints: 2 },
          specialization: 'farming'
        },
        {
          id: generateNodeId('farming', 'farming', 'Master Chef'),
          type: 'keystone',
          name: 'Master Chef',
          path: 'farming',
          position: { x: 500, y: 200 },
          connections: [generateNodeId('farming', 'farming', 'Advanced Feast')],
          effects: [
            { type: 'chance_bonus', value: 20, description: '20% chance for premium meals', target: 'meal' }
          ],
          description: 'Master the art of cooking',
          requirements: { level: 6, skillPoints: 3 },
          specialization: 'farming'
        },
        // Third Row (New)
        {
          id: generateNodeId('farming', 'farming', 'Basic Feast'),
          name: 'Basic Feast',
          type: 'normal',
          path: 'farming',
          position: { x: 100, y: 300 },
          connections: [generateNodeId('farming', 'farming', 'Advanced Feast')],
          effects: [
            { type: 'production_speed', value: 15, description: '+15% feast production', target: 'feast' }
          ],
          description: 'Begin feast preparation',
          requirements: { level: 8, skillPoints: 2 },
          specialization: 'farming'
        },
        {
          id: generateNodeId('farming', 'farming', 'Advanced Feast'),
          name: 'Advanced Feast',
          type: 'normal',
          path: 'farming',
          position: { x: 300, y: 300 },
          connections: [generateNodeId('farming', 'farming', 'Feast Master')],
          effects: [
            { type: 'resource_cost', value: -20, description: '-20% resource cost in feasts', target: 'feast' }
          ],
          description: 'Improve feast efficiency',
          requirements: { level: 9, skillPoints: 2 },
          specialization: 'farming'
        },
        {
          id: generateNodeId('farming', 'farming', 'Feast Master'),
          type: 'keystone',
          name: 'Feast Master',
          path: 'farming',
          position: { x: 500, y: 300 },
          connections: [],
          effects: [
            { type: 'chance_bonus', value: 25, description: '25% chance for legendary feast', target: 'feast' }
          ],
          description: 'Master feast preparation',
          requirements: { level: 10, skillPoints: 4 },
          specialization: 'farming'
        }
      ]
    }
  ],
  availablePoints: 0,
  allocatedNodes: []
}

// Crafting Skill Tree
export const CRAFTING_SKILL_TREE: SkillTree = {
  specialization: 'crafting',
  paths: [
    {
      id: 'crafting',
      name: 'Woodworking Path',
      description: 'Master the art of crafting and construction',
      specialization: 'crafting',
      nodes: [
        // First Row
        {
          id: generateNodeId('crafting', 'crafting', 'Wood Efficiency'),
          name: 'Wood Efficiency',
          type: 'normal',
          path: 'crafting',
          position: { x: 100, y: 100 },
          connections: [generateNodeId('crafting', 'crafting', 'Fine Carpentry')],
          effects: [
            { type: 'production_speed', value: 5, description: '+5% wood production', target: 'wood' }
          ],
          description: 'Improve wood gathering efficiency',
          requirements: { level: 1, skillPoints: 1 },
          specialization: 'crafting'
        },
        {
          id: generateNodeId('crafting', 'crafting', 'Fine Carpentry'),
          name: 'Fine Carpentry',
          type: 'normal',
          path: 'crafting',
          position: { x: 300, y: 100 },
          connections: [generateNodeId('crafting', 'crafting', 'Master Woodworker')],
          effects: [
            { type: 'production_speed', value: 10, description: '+10% furniture value', target: 'furniture' }
          ],
          description: 'Create more valuable furniture',
          requirements: { level: 2, skillPoints: 1 },
          specialization: 'crafting'
        },
        {
          id: generateNodeId('crafting', 'crafting', 'Master Woodworker'),
          name: 'Master Woodworker',
          type: 'notable',
          path: 'crafting',
          position: { x: 500, y: 100 },
          connections: [generateNodeId('crafting', 'crafting', 'Tool Mastery')],
          effects: [
            { type: 'production_speed', value: 20, description: '+20% wood-based production', target: 'wood' }
          ],
          description: 'Significantly improve wood working',
          requirements: { level: 3, skillPoints: 2 },
          specialization: 'crafting'
        },
        // Second Row
        {
          id: generateNodeId('crafting', 'crafting', 'Tool Mastery'),
          name: 'Tool Mastery',
          type: 'normal',
          path: 'crafting',
          position: { x: 100, y: 200 },
          connections: [generateNodeId('crafting', 'crafting', 'Advanced Engineering')],
          effects: [
            { type: 'production_speed', value: 10, description: '+10% tool production', target: 'tool' }
          ],
          description: 'Improve tool crafting efficiency',
          requirements: { level: 4, skillPoints: 1 },
          specialization: 'crafting'
        },
        {
          id: generateNodeId('crafting', 'crafting', 'Advanced Engineering'),
          name: 'Advanced Engineering',
          type: 'normal',
          path: 'crafting',
          position: { x: 300, y: 200 },
          connections: [generateNodeId('crafting', 'crafting', 'Master Engineer'), generateNodeId('crafting', 'crafting', 'Basic Automation')],
          effects: [
            { type: 'resource_cost', value: -15, description: '-15% machine costs', target: 'machine' }
          ],
          description: 'Reduce machine crafting costs',
          requirements: { level: 5, skillPoints: 2 },
          specialization: 'crafting'
        },
        {
          id: generateNodeId('crafting', 'crafting', 'Master Engineer'),
          type: 'keystone',
          name: 'Master Engineer',
          path: 'crafting',
          position: { x: 500, y: 200 },
          connections: [generateNodeId('crafting', 'crafting', 'Advanced Automation')],
          effects: [
            { type: 'production_speed', value: 25, description: 'Machines 25% more effective', target: 'machine' }
          ],
          description: 'Master the art of engineering',
          requirements: { level: 6, skillPoints: 3 },
          specialization: 'crafting'
        },
        // Third Row (New)
        {
          id: generateNodeId('crafting', 'crafting', 'Basic Automation'),
          name: 'Basic Automation',
          type: 'normal',
          path: 'crafting',
          position: { x: 100, y: 300 },
          connections: [generateNodeId('crafting', 'crafting', 'Advanced Automation')],
          effects: [
            { type: 'production_speed', value: 15, description: '+15% automated production', target: 'automation' }
          ],
          description: 'Begin automation systems',
          requirements: { level: 8, skillPoints: 2 },
          specialization: 'crafting'
        },
        {
          id: generateNodeId('crafting', 'crafting', 'Advanced Automation'),
          name: 'Advanced Automation',
          type: 'normal',
          path: 'crafting',
          position: { x: 300, y: 300 },
          connections: [generateNodeId('crafting', 'crafting', 'Automation Master')],
          effects: [
            { type: 'resource_cost', value: -20, description: '-20% automation setup costs', target: 'automation' }
          ],
          description: 'Improve automation efficiency',
          requirements: { level: 9, skillPoints: 2 },
          specialization: 'crafting'
        },
        {
          id: generateNodeId('crafting', 'crafting', 'Automation Master'),
          type: 'keystone',
          name: 'Automation Master',
          path: 'crafting',
          position: { x: 500, y: 300 },
          connections: [],
          effects: [
            { type: 'chance_bonus', value: 25, description: '25% chance for automated bonus production', target: 'automation' }
          ],
          description: 'Master automation systems',
          requirements: { level: 10, skillPoints: 4 },
          specialization: 'crafting'
        }
      ]
    }
  ],
  availablePoints: 0,
  allocatedNodes: []
}

// Trading Skill Tree
export const TRADING_SKILL_TREE: SkillTree = {
  specialization: 'trading',
  paths: [
    {
      id: 'trading',
      name: 'Bargaining Path',
      description: 'Master the art of trading and commerce',
      specialization: 'trading',
      nodes: [
        // First Row
        {
          id: generateNodeId('trading', 'trading', 'Better Deals'),
          name: 'Better Deals',
          type: 'normal',
          path: 'trading',
          position: { x: 100, y: 100 },
          connections: [generateNodeId('trading', 'trading', 'Market Influence')],
          effects: [
            { type: 'production_speed', value: 2, description: '+2% better prices', target: 'all' }
          ],
          description: 'Improve trading prices',
          requirements: { level: 1, skillPoints: 1 },
          specialization: 'trading'
        },
        {
          id: generateNodeId('trading', 'trading', 'Market Influence'),
          name: 'Market Influence',
          type: 'normal',
          path: 'trading',
          position: { x: 300, y: 100 },
          connections: [generateNodeId('trading', 'trading', 'Master Negotiator')],
          effects: [
            { type: 'production_speed', value: 5, description: '+5% better prices', target: 'all' }
          ],
          description: 'Further improve trading prices',
          requirements: { level: 2, skillPoints: 1 },
          specialization: 'trading'
        },
        {
          id: generateNodeId('trading', 'trading', 'Master Negotiator'),
          name: 'Master Negotiator',
          type: 'notable',
          path: 'trading',
          position: { x: 500, y: 100 },
          connections: [generateNodeId('trading', 'trading', 'Market Insight')],
          effects: [
            { type: 'production_speed', value: 10, description: '+10% better prices', target: 'all' }
          ],
          description: 'Significantly improve trading prices',
          requirements: { level: 3, skillPoints: 2 },
          specialization: 'trading'
        },
        // Second Row
        {
          id: generateNodeId('trading', 'trading', 'Market Insight'),
          name: 'Market Insight',
          type: 'normal',
          path: 'trading',
          position: { x: 100, y: 200 },
          connections: [generateNodeId('trading', 'trading', 'Price Mastery')],
          effects: [
            { type: 'chance_bonus', value: 5, description: '+5% price prediction', target: 'all' }
          ],
          description: 'Improve market predictions',
          requirements: { level: 4, skillPoints: 1 },
          specialization: 'trading'
        },
        {
          id: generateNodeId('trading', 'trading', 'Price Mastery'),
          name: 'Price Mastery',
          type: 'normal',
          path: 'trading',
          position: { x: 300, y: 200 },
          connections: [generateNodeId('trading', 'trading', 'Market Maker'), generateNodeId('trading', 'trading', 'Trade Network')],
          effects: [
            { type: 'production_speed', value: 10, description: '+10% profit margins', target: 'all' }
          ],
          description: 'Increase profit margins',
          requirements: { level: 5, skillPoints: 2 },
          specialization: 'trading'
        },
        {
          id: generateNodeId('trading', 'trading', 'Market Maker'),
          type: 'keystone',
          name: 'Market Maker',
          path: 'trading',
          position: { x: 500, y: 200 },
          connections: [generateNodeId('trading', 'trading', 'Trade Empire')],
          effects: [
            { type: 'chance_bonus', value: 20, description: 'Control price fluctuations', target: 'all' }
          ],
          description: 'Master market manipulation',
          requirements: { level: 6, skillPoints: 3 },
          specialization: 'trading'
        },
        // Third Row (New)
        {
          id: generateNodeId('trading', 'trading', 'Trade Network'),
          name: 'Trade Network',
          type: 'normal',
          path: 'trading',
          position: { x: 100, y: 300 },
          connections: [generateNodeId('trading', 'trading', 'Trade Empire')],
          effects: [
            { type: 'production_speed', value: 15, description: '+15% trade volume', target: 'all' }
          ],
          description: 'Establish trade networks',
          requirements: { level: 8, skillPoints: 2 },
          specialization: 'trading'
        },
        {
          id: generateNodeId('trading', 'trading', 'Trade Empire'),
          name: 'Trade Empire',
          type: 'normal',
          path: 'trading',
          position: { x: 300, y: 300 },
          connections: [generateNodeId('trading', 'trading', 'Trade Mogul')],
          effects: [
            { type: 'resource_cost', value: -20, description: '-20% trade costs', target: 'all' }
          ],
          description: 'Build a trade empire',
          requirements: { level: 9, skillPoints: 2 },
          specialization: 'trading'
        },
        {
          id: generateNodeId('trading', 'trading', 'Trade Mogul'),
          type: 'keystone',
          name: 'Trade Mogul',
          path: 'trading',
          position: { x: 500, y: 300 },
          connections: [],
          effects: [
            { type: 'chance_bonus', value: 25, description: '25% chance for special trades', target: 'all' }
          ],
          description: 'Become a legendary trader',
          requirements: { level: 10, skillPoints: 4 },
          specialization: 'trading'
        }
      ]
    }
  ],
  availablePoints: 0,
  allocatedNodes: []
}

export const skillTrees: Record<Industry, SkillTree> = {
  mining: MINING_SKILL_TREE,
  farming: FARMING_SKILL_TREE,
  crafting: CRAFTING_SKILL_TREE,
  trading: TRADING_SKILL_TREE
} 