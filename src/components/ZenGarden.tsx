'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlantedTreeCards } from './PlantedTreeCard';
import Rewards from './Rewards';
import {
  Card,
  CardContent,
} from '@/components/ui/card';

interface PlantedTree {
  id: string;
  type: string;
  datePlanted: string;
  pointsUsed: number;
  location: string;
}

interface ZenGardenProps {
  onOpenDonation: () => void;
}

const treeEmojis: { [key: string]: string } = {
  'Pine Tree': '🌱',
  'Birch Tree': '🌿',
  'Maple Tree': '🍁',
  'Cherry Blossom': '🌸',
  'Redwood': '🌲',
  'Oak Tree': '🌳'
};

const pointsToLevel = (points: number): number => {
  if (points >= 800) return 6;
  if (points >= 700) return 5;
  if (points >= 600) return 4;
  if (points >= 500) return 3;
  if (points >= 400) return 2;
  if (points >= 300) return 1;
  return 0;
};

const levelToTreeType = (level: number): string => {
  switch (level) {
    case 1: return 'Pine Tree';
    case 2: return 'Birch Tree';
    case 3: return 'Maple Tree';
    case 4: return 'Cherry Blossom';
    case 5: return 'Redwood';
    case 6: return 'Oak Tree';
    default: return 'Pine Tree';
  }
};

const MAX_LEVEL = 6;

const ZenGardenLevelGrid = ({
  plantedTrees,
  onDonateToTile
}: {
  plantedTrees: PlantedTree[],
  onDonateToTile: (index: number) => void
}) => {
  const tileLevels = plantedTrees.map((tree, index) =>
    index < 9 ? pointsToLevel(tree.pointsUsed) : 0
  ).concat(Array(Math.max(0, 9 - plantedTrees.length)).fill(0));

  const firstIncompleteTileIndex = tileLevels.findIndex(level => level < MAX_LEVEL);
  const activeTileIndex = firstIncompleteTileIndex === -1
    ? tileLevels.findIndex(level => level === 0)
    : firstIncompleteTileIndex;

  return (
    <div className="mt-6 flex items-center justify-center">
      <div className="grid grid-cols-3 gap-4 bg-[#8b7b5a] p-4 rounded-lg shadow-md">
        {tileLevels.map((level, index) => {
          const tree = plantedTrees[index];
          const isCompleted = level === MAX_LEVEL;
          const isActive = index === activeTileIndex;
          const isEmpty = !tree;
          const isLocked = !isCompleted && !isActive;

          return (
            <div
              key={index}
              className={`w-[150px] h-[150px] bg-[#d9c2a6] flex flex-col items-center justify-center border-2 border-[#6b5b3a] rounded-md ${isLocked ? 'opacity-50' : 'cursor-pointer'}`}
              onClick={isLocked || isCompleted ? undefined : () => onDonateToTile(index)}
            >
              <div className="text-xs text-[#4b3f28] mt-1 mb-1 font-bold">
                {isCompleted
                  ? 'Completed'
                  : isLocked
                    ? 'Locked'
                    : level > 0
                      ? `Lv. ${level}`
                      : 'Empty'}
              </div>
              <div className="w-[80px] h-[80px] flex items-center justify-center text-4xl">
                {level > 0 && tree ? treeEmojis[tree.type] || '🌳' : ''}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const ZenGarden = ({ onOpenDonation }: ZenGardenProps) => {
  const [plantedTrees, setPlantedTrees] = useState<PlantedTree[]>([
    {
      id: '1',
      type: 'Pine Tree',
      datePlanted: '2024-07-15',
      pointsUsed: 300,
      location: 'Amazon Rainforest'
    },
    {
      id: '2',
      type: 'Pine Tree',
      datePlanted: '2024-07-10',
      pointsUsed: 300,
      location: 'Pacific Northwest'
    }
  ]);

  const [globalPlantedTrees, setGlobalPlantedTrees] = useState<PlantedTree[]>([]);
  const [showRewards, setShowRewards] = useState(false);

  const handleDonateToTile = (index: number) => {
    setPlantedTrees(prevTrees => {
      const newTrees = [...prevTrees];

      if (index < prevTrees.length) {
        const newPoints = Math.min(newTrees[index].pointsUsed + 100, 800);
        const updatedTree = {
          ...newTrees[index],
          pointsUsed: newPoints,
          type: levelToTreeType(pointsToLevel(newPoints))
        };
        newTrees[index] = updatedTree;

        setGlobalPlantedTrees(prev => {
          const copy = [...prev];
          const globalIndex = copy.findIndex(t => t.id === updatedTree.id);
          if (globalIndex !== -1) {
            copy[globalIndex] = updatedTree;
            return copy;
          } else {
            return [...copy, updatedTree];
          }
        });

      } else if (index === prevTrees.length && prevTrees.length < 9) {
        const newTree: PlantedTree = {
          id: `${Date.now()}`,
          type: 'Pine Tree',
          datePlanted: new Date().toISOString().split('T')[0],
          pointsUsed: 300,
          location: 'New Forest'
        };
        newTrees.push(newTree);
        setGlobalPlantedTrees(prev => [...prev, newTree]);
      }

      return newTrees;
    });
  };

  useEffect(() => {
    const tileLevels = plantedTrees.map(tree => pointsToLevel(tree.pointsUsed));
    const allComplete = tileLevels.every(level => level === MAX_LEVEL);

    if (allComplete && plantedTrees.length < 9) {
      const newTree: PlantedTree = {
        id: `${Date.now()}`,
        type: 'Pine Tree',
        datePlanted: new Date().toISOString().split('T')[0],
        pointsUsed: 300,
        location: 'New Forest'
      };
      setPlantedTrees(prev => [...prev, newTree]);
      setGlobalPlantedTrees(prev => [...prev, newTree]);
    }
  }, [plantedTrees]);

  const tileLevels = plantedTrees.map(tree => pointsToLevel(tree.pointsUsed));

  const gardenIsComplete =
    plantedTrees.length === 9 &&
    plantedTrees.every(tree => pointsToLevel(tree.pointsUsed) === MAX_LEVEL);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-3xl font-vintage font-bold text-primary">Zen Garden</h2>
          <p className="text-lg font-body text-muted-foreground">
            Your forest of positive impact
          </p>
        </div>
      </div>

      <ZenGardenLevelGrid
        plantedTrees={plantedTrees}
        onDonateToTile={handleDonateToTile}
      />

      {gardenIsComplete && !showRewards && (
        <div className="flex justify-center">
          <Button
            className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all"
            onClick={() => setShowRewards(true)}
          >
            🎁 Claim NFT Reward
          </Button>
        </div>
      )}

      {showRewards && <Rewards />}

      {/* 🪴 My Trees section header */}
      <div className="pt-8 pb-2">
        <h3 className="text-2xl font-vintage font-semibold text-primary">My Trees</h3>
      </div>

      <PlantedTreeCards
        treeList={globalPlantedTrees}
        tileLevels={tileLevels}
        onDonateToTile={handleDonateToTile}
      />

      {/* 🌿 Footer */}
      <Card className="bg-gradient-earth border-vintage-earth-brown/30 shadow-vintage">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-vintage font-bold text-primary-foreground">
                {globalPlantedTrees.length}
              </div>
              <div className="text-sm font-body text-primary-foreground/80">
                Trees Planted
              </div>
            </div>

            <div>
              <div className="text-3xl font-vintage font-bold text-primary-foreground">
                {globalPlantedTrees.reduce((sum, tree) => sum + tree.pointsUsed, 0).toLocaleString()}
              </div>
              <div className="text-sm font-body text-primary-foreground/80">
                Points Invested
              </div>
            </div>

            <div>
              <div className="text-3xl font-vintage font-bold text-primary-foreground">
                {(globalPlantedTrees.reduce((sum, tree) => sum + tree.pointsUsed, 0) * 0.001).toFixed(1)}kg
              </div>
              <div className="text-sm font-body text-primary-foreground/80">
                CO₂ Offset
              </div>
            </div>

            <div>
              <div className="text-3xl font-vintage font-bold text-primary-foreground">
                {new Set(globalPlantedTrees.map(tree => tree.location)).size}
              </div>
              <div className="text-sm font-body text-primary-foreground/80">
                Habitats Supported
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
