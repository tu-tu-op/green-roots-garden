'use client';

import { Card, CardContent } from '@/components/ui/card';

const Rewards = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start gap-2">
        <h2 className="text-3xl font-vintage font-bold text-primary">🎁 Rewards</h2>
        <p className="text-lg font-body text-muted-foreground">
          Unlock NFTs by growing your Zen Garden
        </p>
      </div>

      {/* Grid of NFT-like reward cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[1, 2, 3].map((_, index) => (
          <Card
            key={index}
            className="bg-gradient-to-br from-[#cfc4b1] to-[#a99d85] border border-[#7c6e56] shadow-lg rounded-xl hover:scale-105 transition-transform duration-300"
          >
            <CardContent className="flex flex-col items-center justify-center h-48">
              <div className="text-5xl font-bold text-[#5a4c33]">?</div>
              <div className="mt-2 text-sm text-muted-foreground font-body">
                Mystery Reward
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Rewards;
