import { Resources } from '@/types/resources'
import ResourceIcon from '@/components/ResourceIcon'

interface ResourceDisplayProps {
  resources: Resources
}

export default function ResourceDisplay({ resources }: ResourceDisplayProps) {
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-amber-400 mb-4">Resources</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <ResourceIcon type="money" />
          <span className="text-gray-300">Money:</span>
          <span className="text-amber-400">${resources.money.toFixed(2)}</span>
        </div>
        {/* ... other resources ... */}
      </div>
    </div>
  )
} 