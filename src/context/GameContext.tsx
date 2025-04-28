import { StringSupportOption } from 'prettier';
import React, { createContext, useContext, useState } from 'react';

type GameSettings = {
    getGridWidth: number;
    getGridHeight: number;
    getGridArray: string[][];
    getMoveGrid: number[][][];
    getMoveDirectionX: number;
    getMoveDirectionY: number;
    setGridWidth: (w: number) => void;
    setGridHeight: (w: number) => void;
    setGridArray: (w: string[][]) => void;
    setMoveGrid: (w: number[][][]) => void;
    setMoveDirectionX: (w: number) => void;
    setMoveDirectionY: (w: number) => void;
};

export const GameContext = createContext<GameSettings | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  // Grid Data
  const [getGridWidth, setGridWidth] = useState(12);
  const [getGridHeight, setGridHeight] = useState(15);
  // Move Direction: 0 = neutral, 1 = positive, -1 = negative
  const [getMoveGrid, setMoveGrid] = useState<number[][][]>(Array(getGridHeight).fill(null).map(() => Array(getGridWidth).fill([0, 0])));
  const [getMoveDirectionX, setMoveDirectionX] = useState(0);
  const [getMoveDirectionY, setMoveDirectionY] = useState(1);
  // Grid Array
  const [getGridArray, setGridArray] = useState<string[][]>(Array(getGridHeight).fill(null).map(() => Array(getGridWidth).fill("")));

  return (
    <GameContext.Provider value={{ 
      getGridWidth,
      getGridHeight,
      getGridArray,
      getMoveGrid,
      getMoveDirectionX,
      getMoveDirectionY,
      setGridWidth,
      setGridHeight,
      setGridArray,
      setMoveGrid,
      setMoveDirectionX,
      setMoveDirectionY,
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameSettings = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameSettings must be used within a GameProvider');
  }
  return context;
};