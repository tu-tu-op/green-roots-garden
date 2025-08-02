import { usePoints } from "@/context/PointsContext"; // adjust path as needed
import Phaser from "phaser";
import React, { useEffect, useRef } from "react";
import MainScene from "./Game"; // adjust import if your Game.js is elsewhere

const GameWrapper: React.FC = () => {
  const gameParentRef = useRef<HTMLDivElement | null>(null);
  const phaserGameRef = useRef<Phaser.Game | null>(null);
  const { setPoints } = usePoints(); // <-- context hook

  useEffect(() => {
    if (!gameParentRef.current || phaserGameRef.current) return;

    // ⬇️ Pass setPoints to Phaser scene constructor
    const scene = new MainScene({ onPointsChange: setPoints });

    phaserGameRef.current = new Phaser.Game({
      type: Phaser.AUTO,
      backgroundColor: "#4a9d4a",
      parent: gameParentRef.current,
      scene: scene,
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: "100%",
        height: "100%",
      },
      physics: { default: "arcade", arcade: { debug: false } }
    });

    return () => {
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true);
        phaserGameRef.current = null;
      }
    };
    // IMPORTANT: setPoints is a stable reference from context
  }, [setPoints]);

  return (
    <div
      ref={gameParentRef}
      id="game-area-inner"
      className="w-full h-full"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default GameWrapper;
