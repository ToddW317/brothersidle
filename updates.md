# Brother's Idle Game - Development Updates

## Version Numbering Guide
- First octet (0.x.x): Release version
  - 0: Pre-release/Beta
  - 1: Full Release
- Second octet (x.1.x): Major feature updates
  - New systems
  - Large gameplay changes
  - Major UI overhauls
- Third octet (x.x.1): Minor updates
  - Bug fixes
  - Balance changes
  - Small feature additions
  - UI tweaks

Example: v0.1.2
- 0: Pre-release version
- 1: First major update
- 2: Second minor update

## [2024-03-21] - v0.2.0
### Added
- Skill Tree System:
  - Each specialization gets unique skill tree
  - Skill points earned every level
  - Path of Exile inspired node connections
  - Multiple progression paths available

  Mining Tree:
  - Quarry Path:
    - Stone Efficiency (+5% stone production)
    - Advanced Quarrying (+10% stone production, -5% resource cost)
    - Master Quarry (Unlock double stone chance)
    - Notable: Quarry Mastery (Stone has 20% chance to produce ore)
  
  - Ore Path:
    - Ore Efficiency (+5% ore production)
    - Deep Mining (+10% ore production, +2% rare find chance)
    - Precious Metals (Chance to find gold while mining)
    - Notable: Core Tapper (10% chance for double metal from smelting)
  
  - Processing Path:
    - Resource Conservation (-5% resource usage)
    - Efficient Smelting (-10% metal crafting cost)
    - Mass Production (+15% production speed)
    - Notable: Master Processor (All processing costs reduced 25%)

  Farming Tree:
  - Growth Path:
    - Quick Growth (+5% food production)
    - Fertile Soil (+10% food production, +5% quality)
    - Abundant Harvest (Chance for double crops)
    - Notable: Nature's Bounty (20% chance for premium food)
  
  - Cooking Path:
    - Efficient Cooking (-5% food usage in meals)
    - Gourmet (+10% meal value)
    - Master Chef (+20% meal production speed)
    - Notable: Feast Master (Meals feed twice as many)
  
  - Sustainability Path:
    - Resource Conservation (-5% resource usage)
    - Self-Sustaining (+10% resource generation)
    - Green Thumb (+15% production speed)
    - Notable: Circle of Life (10% resources returned after use)

  Crafting Tree:
  - Woodworking Path:
    - Wood Efficiency (+5% wood production)
    - Fine Carpentry (+10% furniture value)
    - Master Woodworker (+20% wood-based production)
    - Notable: Forest's Blessing (Chance for rare wood types)
  
  - Engineering Path:
    - Tool Mastery (+10% tool production)
    - Advanced Engineering (-15% machine costs)
    - Efficient Assembly (+20% machine production)
    - Notable: Master Engineer (Machines 25% more effective)
  
  - Innovation Path:
    - Resource Conservation (-5% material usage)
    - Efficient Design (-10% production costs)
    - Mass Production (+15% production speed)
    - Notable: Revolutionary (Unlock unique item variants)

  Trading Tree:
  - Bargaining Path:
    - Better Deals (+2% better prices)
    - Market Influence (+5% better prices)
    - Master Negotiator (+10% better prices)
    - Notable: Trade Baron (Unlock bulk trading bonuses)
  
  - Market Path:
    - Market Insight (+5% price prediction)
    - Price Mastery (+10% profit margins)
    - Market Manipulation (Influence price changes)
    - Notable: Market Maker (Control price fluctuations)
  
  - Network Path:
    - Trade Connections (+5% trade volume)
    - Supply Chain (+10% resource availability)
    - Trade Empire (+15% trade capacity)
    - Notable: Trade Mogul (Unlock special trades)

### Technical Implementation:
- Node-based skill tree UI using SVG for connections
- Each node stores:
  - Type (normal, notable, keystone)
  - Requirements (level, connected nodes)
  - Effects (bonuses, unlocks)
  - Visual position (x, y coordinates)
- Skill points awarded:
  - 1 point per level
  - Bonus points from achievements
  - Max points scaled with game progression

Next Steps:
- Add sound effects for actions
- Implement save/load system
- Add achievements system
- Add more advanced production chains
- Implement skill tree UI and effects 

## [2024-03-21] - v0.2.1
### Changed
- Resource generation now only occurs when actively on the matching specialization
- Removed 2x production bonus for matching specialization (since it's now required)
- Production is completely paused for non-active specializations

## [2024-03-21] - v0.2.2
### Fixed
- Fixed NaN showing in upgrade costs
- Fixed skill tree nodes not being allocatable
- Simplified skill node allocation requirements
- Added proper type definitions for node requirements 

## [2024-03-21] - v0.2.3
### Fixed
- Updated all 'gold' references to 'money' for consistency
- Fixed money formatting in production costs
- Updated resource icons to use 'money' instead of 'gold' 

## [2024-03-21] - v0.2.4
### Fixed
- Fixed skill tree node allocation by:
  - Using proper node ID format with generateNodeId
  - Fixed first node allocation logic
  - Updated node connections to use consistent IDs 

## [2024-03-21] - v0.2.5
### Added
- Implemented remaining skill trees:
  - Farming Tree:
    - Growth Path with food production and meal preparation nodes
    - Progression from Quick Growth to Master Chef
    - Focus on food production speed and meal quality
  
  - Crafting Tree:
    - Woodworking Path with wood production and engineering nodes
    - Progression from Wood Efficiency to Master Engineer
    - Focus on resource efficiency and machine production
  
  - Trading Tree:
    - Bargaining Path with market and price manipulation nodes
    - Progression from Better Deals to Market Maker
    - Focus on trade prices and market predictions

### Technical Details
- Each tree follows consistent structure with Mining tree
- Maintained proper node positioning and connections
- Implemented appropriate level requirements and skill point costs
- Added effect types matching game mechanics (production_speed, resource_cost, chance_bonus) 

## [2024-03-21] - v0.2.6
### Added
- Extended all skill trees to 9 nodes each, matching Mining tree structure:

  Farming Tree:
  - Added third tier progression:
    - Basic Feast (Level 8): +15% feast production
    - Advanced Feast (Level 9): -20% resource cost in feasts
    - Feast Master (Level 10): 25% chance for legendary feast
  - Updated node connections for proper progression
  
  Crafting Tree:
  - Added automation branch:
    - Basic Automation (Level 8): +15% automated production
    - Advanced Automation (Level 9): -20% automation setup costs
    - Automation Master (Level 10): 25% chance for automated bonus production
  - Connected engineering path to automation
  
  Trading Tree:
  - Added empire building branch:
    - Trade Network (Level 8): +15% trade volume
    - Trade Empire (Level 9): -20% trade costs
    - Trade Mogul (Level 10): 25% chance for special trades
  - Enhanced market maker path connections

### Technical Details
- Maintained consistent level progression (8-10) for third tier
- Added proper node connections between tiers
- Balanced effects and requirements across specializations
- Each tree now has equal depth and complexity 