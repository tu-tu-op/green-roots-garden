import GameWrapper from "@/components/GameWrapper"; // Adjust the import path as needed
import { Card } from "@/components/ui/card";

export const GameArea = () => {
  return (
    <Card className="w-full h-[600px] bg-gradient-vintage border-2 border-vintage-earth-brown/30 shadow-vintage relative overflow-hidden">
      {/* Vintage border decoration */}
      <div className="absolute inset-2 border border-vintage-earth-brown/20 rounded-lg"></div>
      
      {/* The Phaser game goes here */}
      <div className="flex items-center justify-center h-full relative">
        <GameWrapper />
      </div>
      
      {/* Corner decorations as before */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-vintage-earth-brown/30 rounded-tl-lg"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-vintage-earth-brown/30 rounded-tr-lg"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-vintage-earth-brown/30 rounded-bl-lg"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-vintage-earth-brown/30 rounded-br-lg"></div>
    </Card>
  );
};
