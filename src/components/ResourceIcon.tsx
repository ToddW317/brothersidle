'use client'

import {
  CurrencyDollarIcon,  // USD
  Square3Stack3DIcon,  // Wood
  CubeIcon,           // Stone
  CakeIcon,           // Food
  CircleStackIcon,    // Ore
  WrenchScrewdriverIcon, // Tools
  Squares2X2Icon,     // Furniture
  HomeIcon,           // Bricks
  FireIcon,           // Meals
  BeakerIcon,         // Metal
  CogIcon             // Machines
} from '@heroicons/react/24/solid'

type ResourceType = 
  | 'money' 
  | 'wood' 
  | 'stone' 
  | 'food' 
  | 'ore' 
  | 'tools'
  | 'furniture'
  | 'bricks'
  | 'meals'
  | 'metal'
  | 'machines'

interface ResourceIconProps {
  type: ResourceType
  className?: string
}

const ICON_MAP = {
  money: CurrencyDollarIcon,
  wood: Square3Stack3DIcon,
  stone: CubeIcon,
  food: CakeIcon,
  ore: CircleStackIcon,
  tools: WrenchScrewdriverIcon,
  furniture: Squares2X2Icon,
  bricks: HomeIcon,
  meals: FireIcon,
  metal: BeakerIcon,
  machines: CogIcon
}

export default function ResourceIcon({ type, className = "w-5 h-5" }: ResourceIconProps) {
  // Clean up the type string
  const cleanType = type.replace('_making', '')
                       .replace('ing', '')
                       .toLowerCase() as ResourceType
  
  const Icon = ICON_MAP[cleanType]
  
  if (!Icon) {
    console.warn(`No icon found for resource type: ${type} (cleaned: ${cleanType})`)
    return null
  }
  
  return <Icon className={className} />
} 