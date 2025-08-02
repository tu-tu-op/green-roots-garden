import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePoints } from "@/context/PointsContext"; // <-- Use your context here!
import { Coins, Gift, TreePine } from "lucide-react";

interface SidebarProps {
  onOpenDonation: () => void;
}

export const Sidebar = ({ onOpenDonation }: SidebarProps) => {
  const { points } = usePoints(); // <-- Use the real, global points value
  const isWalletConnected = true; // Mocked; replace with hooked value if needed

  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      <Card className="bg-gradient-vintage border-vintage-earth-brown/30 shadow-paper">
        <CardHeader className="text-center pb-3">
          <Avatar className="w-20 h-20 mx-auto border-4 border-vintage-gold/50">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="bg-vintage-tree-green text-primary-foreground text-xl font-vintage">
              GH
            </AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className="text-center space-y-3">
          <div>
            <h3 className="font-vintage font-semibold text-foreground">
              GreenHero
            </h3>
            <p className="text-sm font-body text-muted-foreground">
              {isWalletConnected ? "0x742d...B9c4" : "Connect Wallet"}
            </p>
          </div>

          <Badge variant="secondary" className="bg-vintage-leaf-green/20 text-vintage-tree-green border-vintage-tree-green/30">
            🌱 Eco Warrior
          </Badge>
        </CardContent>
      </Card>

      {/* Points Balance */}
      <Card className="bg-gradient-vintage border-vintage-earth-brown/30 shadow-paper">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Coins className="w-6 h-6 text-vintage-gold" />
              <span className="font-vintage font-semibold text-lg">Points</span>
            </div>
            <Badge className="bg-vintage-gold/20 text-vintage-earth-brown border-vintage-gold/30 font-vintage text-lg px-3 py-1">
              🌱 {points.toLocaleString()}
            </Badge>
          </div>

          <Button 
            onClick={onOpenDonation}
            className="w-full bg-vintage-tree-green hover:bg-vintage-tree-green/80 text-primary-foreground font-body shadow-vintage"
            size="lg"
          >
            <TreePine className="w-5 h-5 mr-2" />
            Plant a Tree
          </Button>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="bg-gradient-vintage border-vintage-earth-brown/30 shadow-paper">
        <CardHeader>
          <CardTitle className="font-vintage text-lg flex items-center">
            <Gift className="w-5 h-5 mr-2 text-vintage-tree-green" />
            Your Impact
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-vintage font-bold text-vintage-tree-green">23</div>
              <div className="text-xs font-body text-muted-foreground">Trees Planted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-vintage font-bold text-vintage-earth-brown">156</div>
              <div className="text-xs font-body text-muted-foreground">CO₂ Offset (kg)</div>
            </div>
          </div>

          <div className="pt-2 border-t border-vintage-earth-brown/20">
            <div className="text-center">
              <div className="text-sm font-body text-muted-foreground">Rank</div>
              <div className="text-xl font-vintage font-bold text-vintage-gold">#47</div>
              <div className="text-xs font-body text-muted-foreground">Global Leaderboard</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
