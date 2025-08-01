import { Card } from "@/components/ui/card";

export const GameArea = () => {
  return (
    <Card className="w-full h-[600px] bg-gradient-vintage border-2 border-vintage-earth-brown/30 shadow-vintage relative overflow-hidden">
      {/* Vintage border decoration */}
      <div className="absolute inset-2 border border-vintage-earth-brown/20 rounded-lg"></div>
      
      {/* Content */}
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-vintage-tree-green/20 rounded-full flex items-center justify-center border-2 border-vintage-tree-green/30">
            <span className="text-4xl">🎮</span>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-vintage font-semibold text-vintage-earth-brown">
              Game Area
            </h3>
            <p className="text-lg font-body text-muted-foreground max-w-md">
              Phaser Game Embed Here
            </p>
            <p className="text-sm font-body text-muted-foreground/80 italic">
              Your environmental adventure awaits!
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="flex justify-center space-x-8 mt-8 opacity-30">
            <span className="text-2xl">🌱</span>
            <span className="text-2xl">🌳</span>
            <span className="text-2xl">🦋</span>
            <span className="text-2xl">🌿</span>
          </div>
        </div>
      </div>
      
      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-vintage-earth-brown/30 rounded-tl-lg"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-vintage-earth-brown/30 rounded-tr-lg"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-vintage-earth-brown/30 rounded-bl-lg"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-vintage-earth-brown/30 rounded-br-lg"></div>
    </Card>
  );
};