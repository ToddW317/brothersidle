import { create } from 'zustand'
import { SkillTree, SkillNode } from '@/types/skillTree'
import { skillTrees } from '@/data/skillTrees'

export type Industry = 'mining' | 'farming' | 'crafting' | 'trading'

// Color mapping for specializations
export const SPECIALIZATION_COLORS = {
  mining: 'amber',
  farming: 'emerald',
  crafting: 'purple',
  trading: 'blue'
} as const

// Specialization progression info
export const SPECIALIZATION_INFO = {
  mining: {
    description: 'Gain XP by producing stone and ore. Each level increases production speed by 10%.',
    levelUnlocks: {
      1: 'Stone Production',
      3: 'Brick Making (Requires stone)',
      5: 'Ore Mining',
      7: 'Metal Smelting (Requires ore)'
    }
  },
  farming: {
    description: 'Gain XP by producing raw food. Each level increases production speed by 10%.',
    levelUnlocks: {
      1: 'Basic Food Production',
      3: 'Meal Preparation (Requires food)',
      5: 'Advanced Farming',
      7: 'Feast Production (Requires meals)'
    }
  },
  crafting: {
    description: 'Gain XP by producing wood and tools. Each level increases production speed by 10%.',
    levelUnlocks: {
      1: 'Wood Cutting',
      3: 'Furniture Making (Requires wood)',
      5: 'Tool Crafting',
      7: 'Machine Assembly (Requires tools and metal)'
    }
  },
  trading: {
    description: 'Gain XP by buying and selling. Each level improves trade prices by 2%.',
    levelUnlocks: {
      1: 'Basic Trading (10% better prices)',
      3: '15% better prices',
      5: '20% better prices',
      7: '25% better prices'
    }
  }
} as const

// Production chain organization
export const PRODUCTION_CHAINS = {
  mining: {
    basic: ['stone_mining', 'ore_mining'],
    advanced: ['brick_making', 'smelting']
  },
  farming: {
    basic: ['food_farming'],
    advanced: ['meal_cooking']
  },
  crafting: {
    basic: ['woodcutting', 'tool_crafting'],
    advanced: ['furniture_making', 'machine_assembly']
  },
  trading: {
    basic: [],
    advanced: []
  }
} as const

interface Resources {
  money: number
  wood: number
  stone: number
  food: number
  ore: number
  tools: number
  // Advanced resources
  furniture: number  // From wood
  bricks: number     // From stone
  meals: number      // From food
  metal: number      // From ore
  machines: number   // From tools + metal
}

interface MarketPrices {
  wood: number
  stone: number
  food: number
  ore: number
  tools: number
  furniture: number
  bricks: number
  meals: number
  metal: number
  machines: number
}

interface ResourceRequirement {
  resource: keyof Resources
  amount: number
}

interface NodeRequirements {
  level: number
  skillPoints: number
}

interface Production {
  level: number
  baseOutput: number
  lastCollected: number
  upgradeCosts: {
    money: number
    [key: string]: number
  }
  requirements?: ResourceRequirement[]
  minSpecializationLevel?: number
  specialization?: Industry
  description: string
  outputAmount: number
  outputResource: keyof Resources
}

interface Productions {
  [key: string]: Production
}

interface SpecializationProgress {
  level: number
  xp: number
  maxXp: number
}

interface GameState {
  // Player info
  playerName: string
  specializationLevel: { [key in Industry]: number }
  specialization: Industry | null
  level: number
  
  // Resources & Production
  resources: Resources
  productions: Productions
  lastTick: number
  
  // Market
  marketPrices: MarketPrices
  lastPriceUpdate: number
  
  // Skill Tree
  skillTrees: Record<Industry, SkillTree>
  
  // Actions
  setSpecialization: (industry: Industry) => void
  addResource: (resource: keyof Resources, amount: number) => void
  upgradeProduction: (productionType: string) => void
  tick: () => void
  canAffordUpgrade: (productionType: string) => boolean
  buyResource: (resource: keyof MarketPrices, amount: number) => void
  sellResource: (resource: keyof MarketPrices, amount: number) => void
  updateMarketPrices: () => void
  canProduce: (type: string) => boolean
  specializationProgress: { [key in Industry]: SpecializationProgress }
  
  // Skill Tree Actions
  allocateSkillPoint: (nodeId: string) => void
  canAllocateNode: (nodeId: string) => boolean
  getNodeEffect: (type: string, target?: string) => number
}

const BASE_UPGRADE_COST = 10
const UPGRADE_COST_MULTIPLIER = 1.5
const SPECIALIZATION_XP_PER_TICK = 0.1

// Trading bonuses
const TRADING_BUY_DISCOUNT = 0.1  // 10% discount when buying
const TRADING_SELL_BONUS = 0.15   // 15% bonus when selling
const TRADING_LEVEL_BONUS = 0.02  // Additional 2% per level

// Base market prices
const BASE_PRICES: MarketPrices = {
  wood: 2,
  stone: 3,
  food: 4,
  ore: 5,
  tools: 10,
  furniture: 15,
  bricks: 20,
  meals: 25,
  metal: 30,
  machines: 50
}

const PRICE_FLUCTUATION = 0.3

// XP and leveling constants
const BASE_XP_REQUIREMENT = 100
const XP_SCALING_FACTOR = 1.5
const SPECIALIZATION_XP_PER_PRODUCTION = 0.1  // Base XP per resource produced
const MAX_LEVEL = 20

// Helper function to calculate XP requirement for a level
const getXpRequirement = (level: number): number => {
  return Math.floor(BASE_XP_REQUIREMENT * Math.pow(XP_SCALING_FACTOR, level - 1))
}

export const useGameStore = create<GameState>((set, get) => ({
  // Initial state
  playerName: '',
  specialization: null,
  specializationLevel: {
    mining: 1,
    farming: 1,
    crafting: 1,
    trading: 1
  },
  specializationProgress: {
    mining: { level: 1, xp: 0, maxXp: BASE_XP_REQUIREMENT },
    farming: { level: 1, xp: 0, maxXp: BASE_XP_REQUIREMENT },
    crafting: { level: 1, xp: 0, maxXp: BASE_XP_REQUIREMENT },
    trading: { level: 1, xp: 0, maxXp: BASE_XP_REQUIREMENT }
  },
  level: 1,
  
  resources: {
    money: 50,
    wood: 0,
    stone: 0,
    food: 0,
    ore: 0,
    tools: 0,
    furniture: 0,
    bricks: 0,
    meals: 0,
    metal: 0,
    machines: 0
  },
  
  productions: {
    // Mining productions
    stone_mining: { 
      level: 1, 
      baseOutput: 1, 
      lastCollected: Date.now(),
      upgradeCosts: { money: BASE_UPGRADE_COST },
      specialization: 'mining',
      description: 'Extract stone from the quarry',
      outputAmount: 1,
      outputResource: 'stone'
    },
    ore_mining: { 
      level: 1, 
      baseOutput: 1, 
      lastCollected: Date.now(),
      upgradeCosts: { money: BASE_UPGRADE_COST * 2 },
      specialization: 'mining',
      description: 'Mine precious ore from deep underground',
      outputAmount: 1,
      outputResource: 'ore',
      minSpecializationLevel: 5
    },
    brick_making: {
      level: 1,
      baseOutput: 1,
      lastCollected: Date.now(),
      upgradeCosts: { money: BASE_UPGRADE_COST * 2 },
      requirements: [{ resource: 'stone', amount: 2 }],
      minSpecializationLevel: 3,
      specialization: 'mining',
      description: 'Turn stone into sturdy bricks',
      outputAmount: 1,
      outputResource: 'bricks'
    },
    smelting: {
      level: 1,
      baseOutput: 1,
      lastCollected: Date.now(),
      upgradeCosts: { money: BASE_UPGRADE_COST * 3 },
      requirements: [{ resource: 'ore', amount: 2 }],
      minSpecializationLevel: 7,
      specialization: 'mining',
      description: 'Smelt ore into refined metal',
      outputAmount: 1,
      outputResource: 'metal'
    },

    // Farming productions
    food_farming: { 
      level: 1, 
      baseOutput: 1, 
      lastCollected: Date.now(),
      upgradeCosts: { money: BASE_UPGRADE_COST },
      specialization: 'farming',
      description: 'Grow basic food crops',
      outputAmount: 1,
      outputResource: 'food'
    },
    meal_cooking: {
      level: 1,
      baseOutput: 1,
      lastCollected: Date.now(),
      upgradeCosts: { money: BASE_UPGRADE_COST * 2 },
      requirements: [{ resource: 'food', amount: 2 }],
      minSpecializationLevel: 3,
      specialization: 'farming',
      description: 'Cook food into proper meals',
      outputAmount: 1,
      outputResource: 'meals'
    },

    // Crafting productions
    woodcutting: { 
      level: 1, 
      baseOutput: 1, 
      lastCollected: Date.now(),
      upgradeCosts: { money: BASE_UPGRADE_COST },
      specialization: 'crafting',
      description: 'Cut wood from trees',
      outputAmount: 1,
      outputResource: 'wood'
    },
    tool_crafting: { 
      level: 1, 
      baseOutput: 1, 
      lastCollected: Date.now(),
      upgradeCosts: { money: BASE_UPGRADE_COST * 2 },
      specialization: 'crafting',
      description: 'Craft basic tools',
      outputAmount: 1,
      outputResource: 'tools',
      minSpecializationLevel: 5
    },
    furniture_making: {
      level: 1,
      baseOutput: 1,
      lastCollected: Date.now(),
      upgradeCosts: { money: BASE_UPGRADE_COST * 2 },
      requirements: [{ resource: 'wood', amount: 2 }],
      minSpecializationLevel: 3,
      specialization: 'crafting',
      description: 'Turn wood into furniture',
      outputAmount: 1,
      outputResource: 'furniture'
    },
    machine_assembly: {
      level: 1,
      baseOutput: 1,
      lastCollected: Date.now(),
      upgradeCosts: { money: BASE_UPGRADE_COST * 4 },
      requirements: [
        { resource: 'tools', amount: 1 },
        { resource: 'metal', amount: 2 }
      ],
      minSpecializationLevel: 7,
      specialization: 'crafting',
      description: 'Assemble machines from tools and metal',
      outputAmount: 1,
      outputResource: 'machines'
    }
  },
  
  marketPrices: { ...BASE_PRICES },
  lastPriceUpdate: Date.now(),
  lastTick: Date.now(),

  skillTrees: { ...skillTrees },

  // Actions
  setSpecialization: (industry) => 
    set(() => ({
      specialization: industry
    })),

  addResource: (resource, amount) => 
    set((state) => ({
      resources: {
        ...state.resources,
        [resource]: state.resources[resource] + amount
      }
    })),

  canAffordUpgrade: (productionType) => {
    const state = get()
    const production = state.productions[productionType]
    return state.resources.money >= production.upgradeCosts.money
  },

  canProduce: (type) => {
    const state = get()
    const production = state.productions[type]
    
    // Check specialization requirements
    if (production.specialization && production.minSpecializationLevel) {
      if (state.specialization !== production.specialization) return false
      if (state.specializationLevel[production.specialization] < production.minSpecializationLevel) return false
    }

    // Check resource requirements
    if (production.requirements) {
      return production.requirements.every(req => 
        state.resources[req.resource] >= req.amount
      )
    }

    return true
  },

  buyResource: (resource, amount) => {
    const state = get()
    let price = state.marketPrices[resource]
    
    // Apply trading discount if applicable
    if (state.specialization === 'trading') {
      const levelBonus = (state.specializationLevel.trading - 1) * TRADING_LEVEL_BONUS
      const totalDiscount = TRADING_BUY_DISCOUNT + levelBonus
      price = price * (1 - totalDiscount)
    }
    
    const cost = price * amount
    
    if (state.resources.money < cost) return
    
    set((state) => ({
      resources: {
        ...state.resources,
        money: state.resources.money - cost,
        [resource]: state.resources[resource] + amount
      }
    }))
  },

  sellResource: (resource, amount) => {
    const state = get()
    
    if (state.resources[resource] < amount) return
    
    let price = state.marketPrices[resource]
    
    // Apply trading bonus if applicable
    if (state.specialization === 'trading') {
      const levelBonus = (state.specializationLevel.trading - 1) * TRADING_LEVEL_BONUS
      const totalBonus = TRADING_SELL_BONUS + levelBonus
      price = price * (1 + totalBonus)
    }
    
    const profit = price * amount
    
    set((state) => ({
      resources: {
        ...state.resources,
        money: state.resources.money + profit,
        [resource]: state.resources[resource] - amount
      }
    }))
  },

  updateMarketPrices: () => 
    set((state) => {
      const newPrices = { ...state.marketPrices }
      
      Object.keys(newPrices).forEach((resource) => {
        const basePrice = BASE_PRICES[resource as keyof MarketPrices]
        const fluctuation = 1 + (Math.random() * 2 - 1) * PRICE_FLUCTUATION
        newPrices[resource as keyof MarketPrices] = Math.round(basePrice * fluctuation)
      })
      
      return {
        marketPrices: newPrices,
        lastPriceUpdate: Date.now()
      }
    }),

  upgradeProduction: (productionType) =>
    set((state) => {
      const production = state.productions[productionType]
      
      if (state.resources.money < production.upgradeCosts.money) {
        return state
      }

      const newUpgradeCost = Math.floor(production.upgradeCosts.money * UPGRADE_COST_MULTIPLIER)

      return {
        resources: {
          ...state.resources,
          money: state.resources.money - production.upgradeCosts.money
        },
        productions: {
          ...state.productions,
          [productionType]: {
            ...production,
            level: production.level + 1,
            baseOutput: production.baseOutput * 1.5,
            upgradeCosts: { money: newUpgradeCost }
          }
        }
      }
    }),

  tick: () => 
    set((state) => {
      if (!state.specialization) return state

      const now = Date.now()
      const deltaTime = (now - state.lastTick) / 1000

      // Update market prices every 30 seconds
      if (now - state.lastPriceUpdate > 30000) {
        get().updateMarketPrices()
      }

      // Calculate production and XP gain
      const newResources = { ...state.resources }
      let xpGained = 0
      
      // Process each production
      Object.entries(state.productions).forEach(([type, prod]) => {
        // Skip if can't produce or if not on matching specialization
        if (!get().canProduce(type) || prod.specialization !== state.specialization) return

        // Calculate production multiplier (10% per level)
        const specialization = state.specialization as keyof typeof state.specializationProgress
        const currentLevel = state.specializationProgress[specialization].level
        const levelMultiplier = 1 + ((currentLevel - 1) * 0.1)
        
        // Add skill tree bonuses
        const productionBonus = get().getNodeEffect('production_speed', prod.outputResource) / 100
        const resourceCostReduction = get().getNodeEffect('resource_cost', prod.outputResource) / 100
        
        const totalMultiplier = levelMultiplier + productionBonus
        
        const gain = Math.floor(deltaTime * prod.baseOutput * prod.level * totalMultiplier)
        
        // Consume required resources with cost reduction
        if (prod.requirements) {
          prod.requirements.forEach(req => {
            const reducedAmount = req.amount * (1 + resourceCostReduction)
            newResources[req.resource] -= reducedAmount * gain
          })
        }

        // Add produced resources with chance bonuses
        if (prod.outputResource) {
          const doubleChance = get().getNodeEffect('chance_bonus', prod.outputResource)
          const extraResources = Math.random() < (doubleChance / 100) ? gain : 0
          
          newResources[prod.outputResource] += gain + extraResources
          xpGained += gain * SPECIALIZATION_XP_PER_PRODUCTION
        }
      })

      // Update specialization progress only for current specialization
      const newSpecializationProgress = { ...state.specializationProgress }
      const currentProgress = newSpecializationProgress[state.specialization]
      
      // Add XP only to current specialization
      currentProgress.xp += xpGained

      // Check for level up
      while (currentProgress.xp >= currentProgress.maxXp && currentProgress.level < MAX_LEVEL) {
        currentProgress.xp -= currentProgress.maxXp
        currentProgress.level += 1
        currentProgress.maxXp = getXpRequirement(currentProgress.level)
        
        // Award skill point on level up
        const newSkillTrees = { ...state.skillTrees }
        newSkillTrees[state.specialization].availablePoints += 1
      }

      // Cap XP at max if at max level
      if (currentProgress.level >= MAX_LEVEL) {
        currentProgress.xp = currentProgress.maxXp
      }

      // Update level in specializationLevel for compatibility
      const newSpecializationLevel = { ...state.specializationLevel }
      newSpecializationLevel[state.specialization] = currentProgress.level

      return {
        resources: newResources,
        lastTick: now,
        specializationProgress: newSpecializationProgress,
        specializationLevel: newSpecializationLevel,
        skillTrees: state.skillTrees
      }
    }),

  allocateSkillPoint: (nodeId: string) => 
    set((state) => {
      const [specialization, path, nodeName] = nodeId.split('-')
      const tree = state.skillTrees[specialization as Industry]
      
      if (!tree || tree.availablePoints < 1) return state
      if (!get().canAllocateNode(nodeId)) return state
      
      const newTree = { ...tree }
      newTree.allocatedNodes = [...tree.allocatedNodes, nodeId]
      newTree.availablePoints--
      
      return {
        skillTrees: {
          ...state.skillTrees,
          [specialization]: newTree
        }
      }
    }),
    
  canAllocateNode: (nodeId: string) => {
    const state = get()
    const [specialization, path, nodeName] = nodeId.split('-')
    const tree = state.skillTrees[specialization as Industry]
    
    if (!tree) return false
    
    // Find the node
    const node = tree.paths
      .flatMap(p => p.nodes)
      .find(n => n.id === nodeId)
      
    if (!node) return false
    
    // Check if already allocated
    if (tree.allocatedNodes.includes(nodeId)) return false
    
    // Check if we have points available
    if (tree.availablePoints < 1) return false
    
    // Check level requirement
    const currentLevel = state.specializationProgress[specialization as Industry].level
    if (currentLevel < node.requirements.level) return false
    
    // If this is the first node in any path, it's allocatable
    if (tree.allocatedNodes.length === 0 && node.position.y === 100) return true
    
    // Check if connected to an allocated node
    return node.connections.some(connId => tree.allocatedNodes.includes(connId))
  },
  
  getNodeEffect: (type: string, target?: string) => {
    const state = get()
    if (!state.specialization) return 0
    
    const tree = state.skillTrees[state.specialization]
    let totalEffect = 0
    
    tree.allocatedNodes.forEach(nodeId => {
      const node = tree.paths
        .flatMap(p => p.nodes)
        .find(n => n.id === nodeId)
        
      if (!node) return
      
      node.effects.forEach(effect => {
        if (effect.type === type && (!target || effect.target === target)) {
          totalEffect += effect.value
        }
      })
    })
    
    return totalEffect
  },
})) 