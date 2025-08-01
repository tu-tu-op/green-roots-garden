import { useState } from "react";
import { Wallet, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export const Header = ({ currentSection, onSectionChange }: HeaderProps) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const handleWalletConnect = () => {
    // Mock wallet connection
    if (!isWalletConnected) {
      setWalletAddress("0x742d...B9c4");
      setIsWalletConnected(true);
    } else {
      setWalletAddress("");
      setIsWalletConnected(false);
    }
  };

  const navItems = [
    { id: "game", label: "Game" },
    { id: "zen-garden", label: "Zen Garden" },
    { id: "donate", label: "Donate" },
    { id: "leaderboard", label: "Leaderboard" }
  ];

  const NavContent = () => (
    <>
      {navItems.map((item) => (
        <Button
          key={item.id}
          variant={currentSection === item.id ? "default" : "ghost"}
          onClick={() => onSectionChange(item.id)}
          className="font-body text-base hover:bg-accent/50 transition-colors"
        >
          {item.label}
        </Button>
      ))}
    </>
  );

  return (
    <header className="w-full bg-gradient-vintage border-b border-vintage-earth-brown/20 shadow-paper sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Title */}
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-vintage font-bold text-primary">
              GreenHeroes 🌿
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <NavContent />
          </nav>

          {/* Wallet Connect */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleWalletConnect}
              variant={isWalletConnected ? "secondary" : "default"}
              className="font-body hidden sm:flex items-center space-x-2"
            >
              <Wallet className="w-4 h-4" />
              <span>
                {isWalletConnected ? walletAddress : "Connect Wallet"}
              </span>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-card border-border">
                <div className="flex flex-col space-y-4 mt-8">
                  <NavContent />
                  <Button
                    onClick={handleWalletConnect}
                    variant={isWalletConnected ? "secondary" : "default"}
                    className="font-body flex items-center space-x-2 sm:hidden"
                  >
                    <Wallet className="w-4 h-4" />
                    <span>
                      {isWalletConnected ? walletAddress : "Connect Wallet"}
                    </span>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};