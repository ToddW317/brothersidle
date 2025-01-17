export interface Resources {
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

export type ResourceType = keyof Resources

export interface ResourceRequirement {
  resource: ResourceType
  amount: number
} 