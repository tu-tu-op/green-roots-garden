import { useState } from "react";
import { Header } from "@/components/Header";
import { GameArea } from "@/components/GameArea";
import { Sidebar } from "@/components/Sidebar";
import { ZenGarden } from "@/components/ZenGarden";
import { Leaderboard } from "@/components/Leaderboard";
import { DonationHistory } from "@/components/DonationHistory";
import { DonationModal } from "@/components/DonationModal";
import vintageBotanicalBg from "@/assets/vintage-botanical-bg.jpg";

const Index = () => {
  const [currentSection, setCurrentSection] = useState("game");
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  const renderMainContent = () => {
    switch (currentSection) {
      case "zen-garden":
        return <ZenGarden onOpenDonation={() => setIsDonationModalOpen(true)} />;
      case "donate":
        return <DonationHistory />;
      case "leaderboard":
        return <Leaderboard />;
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <GameArea />
            </div>
            <div className="lg:col-span-1">
              <Sidebar onOpenDonation={() => setIsDonationModalOpen(true)} />
            </div>
          </div>
        );
    }
  };

  return (
    <div 
      className="min-h-screen bg-background relative"
      style={{
        backgroundImage: `url(${vintageBotanicalBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/90"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <Header 
          currentSection={currentSection}
          onSectionChange={setCurrentSection}
        />
        
        <main className="container mx-auto px-4 py-8">
          {renderMainContent()}
        </main>
      </div>

      {/* Donation Modal */}
      <DonationModal 
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
      />
    </div>
  );
};

export default Index;
