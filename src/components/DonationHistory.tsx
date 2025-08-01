import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TreePine, Coins, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DonationRecord {
  id: string;
  wallet: string;
  trees: number;
  points: number;
  date: string;
  foundation: string;
  transactionHash?: string;
}

export const DonationHistory = () => {
  const [donations] = useState<DonationRecord[]>([
    {
      id: "1",
      wallet: "0x742d...B9c4",
      trees: 5,
      points: 2500,
      date: "2024-07-15",
      foundation: "Tree.org",
      transactionHash: "0xabc123...def456"
    },
    {
      id: "2", 
      wallet: "0x742d...B9c4",
      trees: 3,
      points: 1500,
      date: "2024-07-10",
      foundation: "Eden Reforestation"
    },
    {
      id: "3",
      wallet: "0x742d...B9c4", 
      trees: 8,
      points: 4000,
      date: "2024-07-05",
      foundation: "One Tree Planted",
      transactionHash: "0xdef789...ghi012"
    },
    {
      id: "4",
      wallet: "0x742d...B9c4",
      trees: 2,
      points: 1000,
      date: "2024-06-28",
      foundation: "Rainforest Trust"
    },
    {
      id: "5",
      wallet: "0x742d...B9c4",
      trees: 12,
      points: 6000,
      date: "2024-06-20",
      foundation: "Tree.org",
      transactionHash: "0xjkl345...mno678"
    }
  ]);

  const totalTrees = donations.reduce((sum, donation) => sum + donation.trees, 0);
  const totalPoints = donations.reduce((sum, donation) => sum + donation.points, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-vintage font-bold text-primary">📋 Donation History</h2>
        <p className="text-lg font-body text-muted-foreground">Your environmental contributions ledger</p>
      </div>

      {/* Summary Stats */}
      <Card className="bg-gradient-forest border-vintage-earth-brown/30 shadow-vintage">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-vintage font-bold text-primary-foreground">
                {totalTrees}
              </div>
              <div className="text-sm font-body text-primary-foreground/80">
                Total Trees Planted
              </div>
            </div>
            
            <div>
              <div className="text-3xl font-vintage font-bold text-primary-foreground">
                {totalPoints.toLocaleString()}
              </div>
              <div className="text-sm font-body text-primary-foreground/80">
                Total Points Used
              </div>
            </div>
            
            <div>
              <div className="text-3xl font-vintage font-bold text-primary-foreground">
                {donations.length}
              </div>
              <div className="text-sm font-body text-primary-foreground/80">
                Donation Sessions
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Donation Records */}
      <Card className="bg-gradient-vintage border-vintage-earth-brown/30 shadow-paper">
        <CardHeader>
          <CardTitle className="font-vintage text-xl text-foreground flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-vintage-tree-green" />
            Recent Donations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {donations.map((donation) => (
              <div key={donation.id} className="p-4 rounded-lg bg-card border border-vintage-earth-brown/20 hover:bg-vintage-leaf-green/5 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
                  {/* Left side - Main info */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-vintage-tree-green/20 rounded-full flex items-center justify-center border-2 border-vintage-tree-green/30">
                      <TreePine className="w-6 h-6 text-vintage-tree-green" />
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-vintage font-semibold text-lg text-foreground">
                          {donation.trees} Tree{donation.trees > 1 ? 's' : ''}
                        </span>
                        <Badge className="bg-vintage-gold/20 text-vintage-earth-brown border-vintage-gold/30 text-xs">
                          🌱 {donation.points.toLocaleString()} pts
                        </Badge>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-sm font-body text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(donation.date).toLocaleDateString()}</span>
                        </div>
                        <span>•</span>
                        <span>{donation.foundation}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Transaction info */}
                  <div className="flex items-center space-x-3">
                    {donation.transactionHash && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-vintage-tree-green/30 text-vintage-tree-green hover:bg-vintage-tree-green/10 font-body text-xs"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View Tx
                      </Button>
                    )}
                    
                    <div className="text-right">
                      <div className="text-sm font-body text-muted-foreground">
                        {donation.wallet}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Environmental Impact */}
      <Card className="bg-gradient-vintage border-vintage-earth-brown/30 shadow-paper">
        <CardHeader>
          <CardTitle className="font-vintage text-xl text-foreground">🌍 Environmental Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-2xl font-vintage font-bold text-vintage-tree-green">
                {(totalTrees * 6.8).toFixed(1)}kg
              </div>
              <div className="text-xs font-body text-muted-foreground">
                CO₂ Absorbed Annually
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-2xl font-vintage font-bold text-vintage-tree-green">
                {(totalTrees * 2.6).toFixed(1)}m²
              </div>
              <div className="text-xs font-body text-muted-foreground">
                Habitat Created
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-2xl font-vintage font-bold text-vintage-tree-green">
                {Math.round(totalTrees * 0.3)}
              </div>
              <div className="text-xs font-body text-muted-foreground">
                Species Supported
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-2xl font-vintage font-bold text-vintage-tree-green">
                {(totalTrees * 15).toFixed(0)}L
              </div>
              <div className="text-xs font-body text-muted-foreground">
                Water Filtered Daily
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};