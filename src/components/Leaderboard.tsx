import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, TreePine } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface LeaderboardEntry {
  rank: number;
  wallet: string;
  totalTrees: number;
  lifetimePoints: number;
  isCurrentUser?: boolean;
}

export const Leaderboard = () => {
  const [leaderboardData] = useState<LeaderboardEntry[]>([
    { rank: 1, wallet: "0x1a2b...E8f9", totalTrees: 1247, lifetimePoints: 156890, isCurrentUser: false },
    { rank: 2, wallet: "0x3c4d...F5a2", totalTrees: 982, lifetimePoints: 98200, isCurrentUser: false },
    { rank: 3, wallet: "0x5e6f...B3c7", totalTrees: 854, lifetimePoints: 85400, isCurrentUser: false },
    { rank: 4, wallet: "0x7g8h...D1e6", totalTrees: 723, lifetimePoints: 72300, isCurrentUser: false },
    { rank: 5, wallet: "0x9i0j...A4f8", totalTrees: 645, lifetimePoints: 64500, isCurrentUser: false },
    { rank: 6, wallet: "0xk1l2...C7b9", totalTrees: 567, lifetimePoints: 56700, isCurrentUser: false },
    { rank: 7, wallet: "0xm3n4...E0d2", totalTrees: 489, lifetimePoints: 48900, isCurrentUser: false },
    { rank: 8, wallet: "0xo5p6...G2f4", totalTrees: 421, lifetimePoints: 42100, isCurrentUser: false },
    { rank: 9, wallet: "0xq7r8...I4h6", totalTrees: 378, lifetimePoints: 37800, isCurrentUser: false },
    { rank: 10, wallet: "0xs9t0...K6j8", totalTrees: 334, lifetimePoints: 33400, isCurrentUser: false },
    // Current user entry
    { rank: 47, wallet: "0x742d...B9c4", totalTrees: 23, lifetimePoints: 2300, isCurrentUser: true }
  ]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-vintage-gold" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-vintage font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank <= 3) {
      const colors = {
        1: "bg-vintage-gold/20 text-vintage-earth-brown border-vintage-gold/30",
        2: "bg-gray-200 text-gray-800 border-gray-300",
        3: "bg-amber-100 text-amber-800 border-amber-300"
      };
      return colors[rank as keyof typeof colors];
    }
    return "bg-muted text-muted-foreground border-border";
  };

  const topThree = leaderboardData.slice(0, 3);
  const restOfBoard = leaderboardData.slice(3, 10);
  const currentUser = leaderboardData.find(entry => entry.isCurrentUser);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-vintage font-bold text-primary">🏆 Leaderboard</h2>
        <p className="text-lg font-body text-muted-foreground">Top environmental heroes making a difference</p>
      </div>

      {/* Top 3 Podium */}
      <Card className="bg-gradient-earth border-vintage-earth-brown/30 shadow-vintage">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topThree.map((entry, index) => (
              <div key={entry.wallet} className={`text-center ${index === 0 ? 'md:order-2' : index === 1 ? 'md:order-1' : 'md:order-3'}`}>
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center border-4 ${
                  index === 0 ? 'bg-vintage-gold/30 border-vintage-gold' : 
                  index === 1 ? 'bg-gray-200 border-gray-400' : 
                  'bg-amber-200 border-amber-400'
                }`}>
                  {getRankIcon(entry.rank)}
                </div>
                
                <Avatar className="w-12 h-12 mx-auto mb-2 border-2 border-primary-foreground/50">
                  <AvatarFallback className="bg-vintage-tree-green text-primary-foreground font-vintage">
                    {entry.wallet.slice(2, 4).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="space-y-1">
                  <p className="font-body text-sm text-primary-foreground/90">{entry.wallet}</p>
                  <div className="text-2xl font-vintage font-bold text-primary-foreground">
                    {entry.totalTrees}
                  </div>
                  <p className="text-sm font-body text-primary-foreground/80">trees planted</p>
                  <Badge className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 text-xs">
                    🌱 {entry.lifetimePoints.toLocaleString()} pts
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rest of Leaderboard */}
      <Card className="bg-gradient-vintage border-vintage-earth-brown/30 shadow-paper">
        <CardHeader>
          <CardTitle className="font-vintage text-xl text-foreground">Rankings 4-10</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {restOfBoard.map((entry) => (
              <div key={entry.wallet} className="flex items-center justify-between p-4 rounded-lg bg-card border border-vintage-earth-brown/20 hover:bg-vintage-leaf-green/5 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10">
                    {getRankIcon(entry.rank)}
                  </div>
                  
                  <Avatar className="w-10 h-10 border border-vintage-earth-brown/30">
                    <AvatarFallback className="bg-vintage-tree-green/20 text-vintage-tree-green font-vintage text-sm">
                      {entry.wallet.slice(2, 4).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <p className="font-body font-medium text-foreground">{entry.wallet}</p>
                    <p className="text-sm font-body text-muted-foreground">
                      {entry.lifetimePoints.toLocaleString()} lifetime points
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <TreePine className="w-4 h-4 text-vintage-tree-green" />
                    <span className="font-vintage font-bold text-lg text-foreground">
                      {entry.totalTrees}
                    </span>
                  </div>
                  <p className="text-sm font-body text-muted-foreground">trees</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current User Position */}
      {currentUser && (
        <Card className="bg-gradient-vintage border-vintage-tree-green/50 shadow-vintage">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Badge className="bg-vintage-tree-green/20 text-vintage-tree-green border-vintage-tree-green/30 px-3 py-1">
                  Your Rank: #{currentUser.rank}
                </Badge>
                
                <Avatar className="w-12 h-12 border-2 border-vintage-tree-green/50">
                  <AvatarFallback className="bg-vintage-tree-green text-primary-foreground font-vintage">
                    GH
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <p className="font-body font-medium text-foreground">{currentUser.wallet}</p>
                  <p className="text-sm font-body text-muted-foreground">
                    {currentUser.lifetimePoints.toLocaleString()} lifetime points
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <TreePine className="w-5 h-5 text-vintage-tree-green" />
                  <span className="font-vintage font-bold text-2xl text-vintage-tree-green">
                    {currentUser.totalTrees}
                  </span>
                </div>
                <p className="text-sm font-body text-muted-foreground">trees planted</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};