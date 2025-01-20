'use client';

import { MiningGame } from '@/components/mining/MiningGame';

export default function MiningPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold text-amber-400 mb-4">Mining Station</h1>
      <MiningGame />
    </div>
  );
} 