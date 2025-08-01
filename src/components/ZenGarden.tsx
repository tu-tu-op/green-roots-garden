import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TreePine, Calendar, RotateCcw, Plus } from "lucide-react";

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

export const ZenGarden = ({ onOpenDonation }: ZenGardenProps) => {
  const [plantedTrees] = useState<PlantedTree[]>([
    {
      id: "1",
      type: "Oak Tree",
      datePlanted: "2024-07-15",
      pointsUsed: 500,
      location: "Amazon Rainforest"
    },
    {
      id: "2", 
      type: "Pine Tree",
      datePlanted: "2024-07-10",
      pointsUsed: 300,
      location: "Pacific Northwest"
    },
    {
      id: "3",
      type: "Birch Tree", 
      datePlanted: "2024-07-05",
      pointsUsed: 400,
      location: "Scandinavian Forest"
    },
    {
      id: "4",
      type: "Maple Tree",
      datePlanted: "2024-06-28",
      pointsUsed: 450,
      location: "Canadian Wilderness"
    },
    {
      id: "5",
      type: "Cherry Blossom",
      datePlanted: "2024-06-20",
      pointsUsed: 600,
      location: "Japanese Gardens"
    },
    {
      id: "6",
      type: "Redwood",
      datePlanted: "2024-06-15",
      pointsUsed: 800,
      location: "California Coast"
    }
  ]);

  const getTreeEmoji = (type: string) => {
    const treeEmojis: { [key: string]: string } = {
      "Oak Tree": "🌳",
      "Pine Tree": "🌲", 
      "Birch Tree": "🌿",
      "Maple Tree": "🍁",
      "Cherry Blossom": "🌸",
      "Redwood": "🌲"
    };
    return treeEmojis[type] || "🌳";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-vintage font-bold text-primary">Zen Garden</h2>
          <p className="text-lg font-body text-muted-foreground">Your forest of positive impact</p>
        </div>
        
        <Button 
          onClick={onOpenDonation}
          className="bg-vintage-tree-green hover:bg-vintage-tree-green/80 text-primary-foreground font-body shadow-vintage"
          size="lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Plant New Tree
        </Button>
      </div>

      {/* Trees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plantedTrees.map((tree) => (
          <Card 
            key={tree.id}
            className="bg-gradient-vintage border-vintage-earth-brown/30 shadow-paper hover:shadow-vintage transition-shadow duration-300"
          >
            <CardHeader className="text-center pb-3">
              <div className="w-16 h-16 mx-auto bg-vintage-tree-green/20 rounded-full flex items-center justify-center border-2 border-vintage-tree-green/30 mb-2">
                <span className="text-3xl">{getTreeEmoji(tree.type)}</span>
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
                onClick={onOpenDonation}
                className="w-full border-vintage-tree-green/30 text-vintage-tree-green hover:bg-vintage-tree-green/10 font-body"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Donate Again
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Garden Stats */}
      <Card className="bg-gradient-earth border-vintage-earth-brown/30 shadow-vintage">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-vintage font-bold text-primary-foreground">
                {plantedTrees.length}
              </div>
              <div className="text-sm font-body text-primary-foreground/80">
                Trees Planted
              </div>
            </div>
            
            <div>
              <div className="text-3xl font-vintage font-bold text-primary-foreground">
                {plantedTrees.reduce((sum, tree) => sum + tree.pointsUsed, 0).toLocaleString()}
              </div>
              <div className="text-sm font-body text-primary-foreground/80">
                Points Invested
              </div>
            </div>
            
            <div>
              <div className="text-3xl font-vintage font-bold text-primary-foreground">
                156kg
              </div>
              <div className="text-sm font-body text-primary-foreground/80">
                CO₂ Offset
              </div>
            </div>
            
            <div>
              <div className="text-3xl font-vintage font-bold text-primary-foreground">
                12
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