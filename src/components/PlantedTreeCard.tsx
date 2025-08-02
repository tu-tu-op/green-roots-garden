// components/PlantedTreeCards.tsx (or inline)
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, RotateCcw } from 'lucide-react';

interface PlantedTree {
  id: string;
  type: string;
  datePlanted: string;
  pointsUsed: number;
  location: string;
}

const treeEmojis: { [key: string]: string } = {
  'Pine Tree': '🌲',
  'Birch Tree': '🌿',
  'Maple Tree': '🍁',
  'Cherry Blossom': '🌸',
  'Redwood': '🌲',
  'Oak Tree': '🌳'
};

const MAX_LEVEL = 6;

export const PlantedTreeCards = ({
  treeList,
  onDonateToTile,
  tileLevels
}: {
  treeList: PlantedTree[];
  onDonateToTile: (index: number) => void;
  tileLevels: number[];
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {treeList.map((tree) => {
        const index = treeList.findIndex(t => t.id === tree.id);
        const isDisabled = index !== tileLevels.findIndex(level => level < MAX_LEVEL);

        return (
          <Card
            key={tree.id}
            className="bg-gradient-vintage border-vintage-earth-brown/30 shadow-paper hover:shadow-vintage transition-shadow duration-300"
          >
            <CardHeader className="text-center pb-3">
              <div className="w-16 h-16 mx-auto bg-vintage-tree-green/20 rounded-full flex items-center justify-center border-2 border-vintage-tree-green/30 mb-2">
                <span className="text-3xl">{treeEmojis[tree.type] || '🌳'}</span>
              </div>
              <CardTitle className="font-vintage text-lg text-foreground">
                {tree.type}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm font-body text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  Planted: {new Date(tree.datePlanted).toLocaleDateString()}
                </div>

                <div className="text-sm font-body text-muted-foreground">
                  📍 {tree.location}
                </div>

                <Badge className="bg-vintage-gold/20 text-vintage-earth-brown border-vintage-gold/30">
                  🌱 {tree.pointsUsed} points
                </Badge>
              </div>

              <Button
                variant="outline"
                onClick={() => onDonateToTile(index)}
                className="w-full border-vintage-tree-green/30 text-vintage-tree-green hover:bg-vintage-tree-green/10 font-body"
                disabled={isDisabled}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Donate Again
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
