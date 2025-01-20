import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CubeIcon } from '@heroicons/react/24/solid';

type ResourceType = 'stone' | 'copper' | 'iron' | 'gold' | 'diamond';
type HitZone = 'miss' | 'bad' | 'good' | 'perfect';

interface Resource {
  type: ResourceType;
  color: string;
  baseValue: number;
  difficulty: number; // Affects green zone size and speed
}

interface HitResult {
  zone: HitZone;
  amount: number;
  timestamp: number;
  resourceType: ResourceType;
}

const RESOURCES: Record<ResourceType, Resource> = {
  stone: { type: 'stone', color: 'gray-600', baseValue: 1, difficulty: 1 },
  copper: { type: 'copper', color: 'orange-600', baseValue: 2, difficulty: 1.2 },
  iron: { type: 'iron', color: 'zinc-400', baseValue: 3, difficulty: 1.5 },
  gold: { type: 'gold', color: 'yellow-500', baseValue: 5, difficulty: 2 },
  diamond: { type: 'diamond', color: 'cyan-400', baseValue: 10, difficulty: 3 }
};

export const MiningGame = () => {
  const [gameState, setGameState] = useState({
    isActive: false,
    score: 0,
    combo: 0,
    hits: [] as HitResult[],
    currentResource: RESOURCES.stone,
  });

  const [meterState, setMeterState] = useState({
    isMoving: false,
    power: 0,
    direction: 1,
    speed: 0.8, // Reduced base speed for smoother movement
    showResult: false,
  });

  // Calculate hit zones based on resource difficulty
  const getHitZones = (difficulty: number) => ({
    miss: { start: 0, end: 25, color: 'bg-gray-500' },
    bad: { start: 25, end: 45, color: 'bg-red-500' },
    good: { start: 45, end: 75, color: 'bg-yellow-500' },
    perfect: { 
      start: 75, 
      end: 75 + (10 / difficulty), // Green zone gets smaller with higher difficulty
      color: 'bg-green-500' 
    },
  });

  // Power meter animation
  useEffect(() => {
    if (!gameState.isActive || !meterState.isMoving || meterState.showResult) return;

    const interval = setInterval(() => {
      setMeterState(prev => {
        // Adjust speed based on difficulty but keep it manageable
        const speed = prev.speed * Math.sqrt(gameState.currentResource.difficulty);
        const newPower = prev.power + (prev.direction * speed);
        
        // Bounce at boundaries
        if (newPower >= 100) {
          return {
            ...prev,
            power: 100,
            direction: -1,
          };
        }
        if (newPower <= 0) {
          return {
            ...prev,
            power: 0,
            direction: 1,
          };
        }

        return {
          ...prev,
          power: newPower,
        };
      });
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [gameState.isActive, meterState.isMoving, meterState.showResult, gameState.currentResource.difficulty]);

  // Determine hit zone based on power
  const getHitZone = (power: number): HitZone => {
    const zones = getHitZones(gameState.currentResource.difficulty);
    if (power >= zones.perfect.start && power <= zones.perfect.end) return 'perfect';
    if (power >= zones.good.start && power < zones.good.end) return 'good';
    if (power >= zones.bad.start && power < zones.bad.end) return 'bad';
    return 'miss';
  };

  // Calculate resources based on hit zone
  const calculateResources = (zone: HitZone): number => {
    const baseValue = gameState.currentResource.baseValue;
    switch (zone) {
      case 'perfect': return baseValue * 10;
      case 'good': return baseValue * 5;
      case 'bad': return baseValue * 2;
      default: return 0;
    }
  };

  // Progress to next resource type
  const progressResource = () => {
    const resourceOrder: ResourceType[] = ['stone', 'copper', 'iron', 'gold', 'diamond'];
    const currentIndex = resourceOrder.indexOf(gameState.currentResource.type);
    const nextIndex = (currentIndex + 1) % resourceOrder.length;
    return RESOURCES[resourceOrder[nextIndex]];
  };

  // Handle mining action
  const handleMining = () => {
    if (!gameState.isActive) return;

    if (!meterState.isMoving && !meterState.showResult) {
      // Start meter movement
      setMeterState(prev => ({
        ...prev,
        isMoving: true,
        power: 0,
        direction: 1
      }));
    } else if (meterState.isMoving && !meterState.showResult) {
      // Stop and check hit zone
      const hitZone = getHitZone(meterState.power);
      const resources = calculateResources(hitZone);

      // Record hit
      const hit: HitResult = {
        zone: hitZone,
        amount: resources,
        timestamp: Date.now(),
        resourceType: gameState.currentResource.type
      };

      setGameState(prev => {
        const newCombo = hitZone === 'perfect' ? prev.combo + 1 : 0;
        // Progress to next resource type after 3 perfect hits
        const newResource = newCombo >= 3 ? progressResource() : prev.currentResource;
        
        return {
          ...prev,
          score: prev.score + resources,
          combo: newCombo,
          hits: [...prev.hits, hit].slice(-5),
          currentResource: newResource
        };
      });

      // Show result for 1 second before resetting
      setMeterState(prev => ({
        ...prev,
        isMoving: false,
        showResult: true
      }));

      // Reset after 1 second and start moving again
      setTimeout(() => {
        setMeterState({
          isMoving: true,
          power: 0,
          direction: 1,
          speed: 0.8,
          showResult: false
        });
      }, 1000);
    }
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        handleMining();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.isActive, meterState.isMoving, meterState.showResult]);

  // Get current hit zones
  const hitZones = getHitZones(gameState.currentResource.difficulty);

  return (
    <div className="min-h-screen bg-gray-900/30">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Game Area */}
        <div className="bg-gray-800/50 rounded-2xl p-8">
          {/* Stats Bar */}
          <div className="flex justify-between items-center bg-gray-900/80 rounded-xl p-6 backdrop-blur-sm mb-8">
            <div className="flex gap-8">
              <div className="text-center">
                <div className="text-gray-400 text-sm font-medium mb-1">Score</div>
                <div className="text-3xl font-bold text-amber-400">{gameState.score}</div>
              </div>
              {gameState.combo > 0 && (
                <div className="text-center">
                  <div className="text-gray-400 text-sm font-medium mb-1">Perfect Streak</div>
                  <div className="text-3xl font-bold text-green-400">{gameState.combo}x</div>
                </div>
              )}
              <div className="text-center">
                <div className="text-gray-400 text-sm font-medium mb-1">Current Resource</div>
                <div className={`text-xl font-bold text-${gameState.currentResource.color}`}>
                  {gameState.currentResource.type.charAt(0).toUpperCase() + gameState.currentResource.type.slice(1)}
                </div>
              </div>
            </div>
            
            <button
              className="px-6 py-3 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 transition-colors text-lg shadow-lg"
              onClick={() => setGameState(prev => ({ ...prev, isActive: !prev.isActive }))}
            >
              {gameState.isActive ? 'Stop Mining' : 'Start Mining'}
            </button>
          </div>

          {/* Main Game Area */}
          <div className="relative flex flex-col items-center justify-center gap-8 min-h-[600px]">
            {/* Power Meter - Always visible */}
            <div className="w-96">
              <div className="h-8 bg-gray-900/50 rounded-lg overflow-hidden relative">
                {/* Hit zones */}
                {Object.entries(hitZones).map(([zone, { start, end, color }]) => (
                  <div
                    key={zone}
                    className={`absolute h-full ${color} opacity-30`}
                    style={{
                      left: `${start}%`,
                      width: `${end - start}%`
                    }}
                  />
                ))}
                {/* Power indicator */}
                <motion.div
                  className="h-full w-2 bg-white"
                  style={{ x: `${meterState.power}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-400 mt-1">
                <span>0%</span>
                <span>Power</span>
                <span>100%</span>
              </div>
            </div>

            {/* Rock */}
            <div 
              className={`relative w-48 h-48 bg-${gameState.currentResource.color} rounded-3xl overflow-hidden cursor-pointer transition-colors duration-300`}
              onClick={handleMining}
            >
              <CubeIcon className={`w-full h-full text-${gameState.currentResource.color}`} />
              
              {/* Hit Effects */}
              <AnimatePresence>
                {gameState.hits[gameState.hits.length - 1]?.zone === 'perfect' && (
                  <motion.div
                    key="perfect-hit"
                    className="absolute inset-0 bg-green-500"
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Hit Feedback */}
            <AnimatePresence>
              {gameState.hits.map((hit, index) => (
                <motion.div
                  key={hit.timestamp}
                  className={`absolute pointer-events-none text-lg font-bold
                    ${hit.zone === 'perfect' ? 'text-green-400' :
                      hit.zone === 'good' ? 'text-yellow-400' :
                      hit.zone === 'bad' ? 'text-red-400' :
                      'text-gray-400'}`}
                  initial={{ opacity: 1, y: 0, scale: 1 }}
                  animate={{ opacity: 0, y: -50, scale: 1.2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    top: '50%',
                    left: `${50 + (index - gameState.hits.length + 1) * 10}%`
                  }}
                >
                  {hit.zone === 'perfect' ? `Perfect! +${hit.amount}` :
                   hit.zone === 'good' ? `Good! +${hit.amount}` :
                   hit.zone === 'bad' ? `Bad +${hit.amount}` : 'Miss!'}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Instructions */}
          <div className="mt-8 text-center text-gray-400">
            <p className="text-lg mb-4">Press SPACE or click the rock to stop the meter! Get 3 perfect hits to progress to better resources!</p>
            <div className="flex justify-center gap-8">
              <div>
                <div className="w-4 h-4 bg-green-500 rounded-full mb-2 mx-auto"/>
                Perfect (x10)
              </div>
              <div>
                <div className="w-4 h-4 bg-yellow-500 rounded-full mb-2 mx-auto"/>
                Good (x5)
              </div>
              <div>
                <div className="w-4 h-4 bg-red-500 rounded-full mb-2 mx-auto"/>
                Bad (x2)
              </div>
              <div>
                <div className="w-4 h-4 bg-gray-500 rounded-full mb-2 mx-auto"/>
                Miss (x0)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 