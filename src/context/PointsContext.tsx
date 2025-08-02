import React, { createContext, useContext, useState } from "react";

interface PointsContextType {
  points: number;
  setPoints: (pts: number) => void;
  addPoints: (pts: number) => void;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export const PointsProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [points, setPoints] = useState<number>(0);

  const addPoints = (pts: number) => setPoints(prev => prev + pts);

  return (
    <PointsContext.Provider value={{ points, setPoints, addPoints }}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => {
  const c = useContext(PointsContext);
  if (!c) throw new Error("usePoints must be used within a PointsProvider");
  return c;
};
