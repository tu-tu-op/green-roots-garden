import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { TreePine, Coins, Wallet, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonationModal = ({ isOpen, onClose }: DonationModalProps) => {
  const [numberOfTrees, setNumberOfTrees] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("points");
  const [selectedFoundation, setSelectedFoundation] = useState("tree-org");
  const [showSuccess, setShowSuccess] = useState(false);

  const pointsPerTree = 500;
  const cryptoPerTree = 0.05; // ETH
  const totalPoints = numberOfTrees * pointsPerTree;
  const totalCrypto = numberOfTrees * cryptoPerTree;

  const foundations = [
    { id: "tree-org", name: "Tree.org", description: "Global reforestation efforts" },
    { id: "eden-reforest", name: "Eden Reforestation", description: "Fighting deforestation worldwide" },
    { id: "one-tree", name: "One Tree Planted", description: "Making it simple to plant trees" },
    { id: "rainforest-trust", name: "Rainforest Trust", description: "Protecting rainforests globally" }
  ];

  const handleDonate = () => {
    // Mock donation process
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
      // Reset form
      setNumberOfTrees(1);
      setPaymentMethod("points");
      setSelectedFoundation("tree-org");
    }, 3000);
  };

  if (showSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-gradient-vintage border-vintage-earth-brown/30 shadow-deep max-w-md">
          <div className="text-center space-y-6 py-8">
            <div className="w-20 h-20 mx-auto bg-vintage-tree-green/20 rounded-full flex items-center justify-center border-4 border-vintage-tree-green/30">
              <CheckCircle className="w-10 h-10 text-vintage-tree-green" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-vintage font-bold text-vintage-tree-green">
                🌳 Tree{numberOfTrees > 1 ? 's' : ''} Planted!
              </h3>
              <p className="text-lg font-body text-foreground">
                Thank you, Green Hero!
              </p>
              <p className="text-sm font-body text-muted-foreground">
                Your {numberOfTrees} tree{numberOfTrees > 1 ? 's' : ''} will help restore our planet
              </p>
            </div>
            
            <div className="flex justify-center space-x-4 text-2xl opacity-60">
              <span>🌱</span>
              <span>🌳</span>
              <span>🦋</span>
              <span>🌿</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-vintage border-vintage-earth-brown/30 shadow-deep max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-vintage text-2xl text-primary flex items-center">
            <TreePine className="w-6 h-6 mr-2 text-vintage-tree-green" />
            Plant New Trees
          </DialogTitle>
          <DialogDescription className="font-body text-muted-foreground">
            Choose how many trees to plant and your payment method
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Number of Trees */}
          <div className="space-y-2">
            <Label htmlFor="trees" className="font-body font-medium">
              Number of Trees
            </Label>
            <Input
              id="trees"
              type="number"
              min="1"
              max="100"
              value={numberOfTrees}
              onChange={(e) => setNumberOfTrees(parseInt(e.target.value) || 1)}
              className="font-body border-vintage-earth-brown/30"
            />
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <Label className="font-body font-medium">Payment Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <Card className="border-vintage-earth-brown/30">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="points" id="points" />
                    <Label htmlFor="points" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Coins className="w-5 h-5 text-vintage-gold" />
                          <span className="font-body">Use In-Game Points</span>
                        </div>
                        <Badge className="bg-vintage-gold/20 text-vintage-earth-brown border-vintage-gold/30">
                          🌱 {totalPoints.toLocaleString()} points
                        </Badge>
                      </div>
                    </Label>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-vintage-earth-brown/30">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="crypto" id="crypto" />
                    <Label htmlFor="crypto" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Wallet className="w-5 h-5 text-vintage-tree-green" />
                          <span className="font-body">Pay with Crypto</span>
                        </div>
                        <Badge className="bg-vintage-tree-green/20 text-vintage-tree-green border-vintage-tree-green/30">
                          ⟠ {totalCrypto.toFixed(3)} ETH
                        </Badge>
                      </div>
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </RadioGroup>
          </div>

          {/* Foundation Selection */}
          <div className="space-y-2">
            <Label className="font-body font-medium">Choose Foundation</Label>
            <Select value={selectedFoundation} onValueChange={setSelectedFoundation}>
              <SelectTrigger className="border-vintage-earth-brown/30 font-body">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-vintage-earth-brown/30">
                {foundations.map((foundation) => (
                  <SelectItem key={foundation.id} value={foundation.id} className="font-body">
                    <div>
                      <div className="font-medium">{foundation.name}</div>
                      <div className="text-sm text-muted-foreground">{foundation.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Summary */}
          <Card className="bg-vintage-leaf-green/10 border-vintage-tree-green/30">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between font-body">
                  <span>Trees to plant:</span>
                  <span className="font-semibold">{numberOfTrees}</span>
                </div>
                <div className="flex justify-between font-body">
                  <span>Foundation:</span>
                  <span className="font-semibold">
                    {foundations.find(f => f.id === selectedFoundation)?.name}
                  </span>
                </div>
                <div className="flex justify-between font-body">
                  <span>Total cost:</span>
                  <span className="font-semibold">
                    {paymentMethod === "points" 
                      ? `🌱 ${totalPoints.toLocaleString()} points`
                      : `⟠ ${totalCrypto.toFixed(3)} ETH`
                    }
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1 border-vintage-earth-brown/30 font-body"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDonate}
              className="flex-1 bg-vintage-tree-green hover:bg-vintage-tree-green/80 text-primary-foreground font-body shadow-vintage"
            >
              <TreePine className="w-4 h-4 mr-2" />
              Confirm Donation
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};