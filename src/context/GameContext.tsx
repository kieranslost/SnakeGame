import { StringSupportOption } from 'prettier';
import React, { createContext, useContext, useState } from 'react';

type GameSettings = {
    getGridWidth: number;
    getGridHeight: number;
    getGridArray: string[][];
    getMoveGrid: number[][][];
    getLastFootMoveInstruction: number[];
    getMoveDirectionY: number;
    getMoveDirectionX: number;
    getSnakeSpeed: number;
    getIntervalId: NodeJS.Timeout | null;
    setGridWidth: (w: number) => void;
    setGridHeight: (w: number) => void;
    setGridArray: (w: string[][]) => void;
    setMoveGrid: (w: number[][][]) => void;
    setLastFootMoveInstruction: (w: number[]) => void;
    setMoveDirectionY: (w: number) => void;
    setMoveDirectionX: (w: number) => void;
    setSnakeSpeed:(w: number) => void;
    setIntervalId: (w: NodeJS.Timeout | null) => void;
};

export const GameContext = createContext<GameSettings | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  // Grid Data
  const [getGridWidth, setGridWidth] = useState(12);
  const [getGridHeight, setGridHeight] = useState(15);
  const [getSnakeSpeed, setSnakeSpeed] = useState(500);
  const [getIntervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  // Move Direction: 0 = neutral, 1 = positive, -1 = negative
  const [getMoveGrid, setMoveGrid] = useState<number[][][]>(Array(getGridHeight).fill(null).map(() => Array(getGridWidth).fill([0, 0])));
  const [getLastFootMoveInstruction, setLastFootMoveInstruction] = useState([0,0])
  const [getMoveDirectionY, setMoveDirectionY] = useState(0);
  const [getMoveDirectionX, setMoveDirectionX] = useState(1);
  // Grid Array
  const [getGridArray, setGridArray] = useState<string[][]>(Array(getGridHeight).fill(null).map(() => Array(getGridWidth).fill("")));

  return (
    <GameContext.Provider value={{ 
      getGridWidth, getGridHeight, getGridArray, getMoveGrid, getLastFootMoveInstruction, 
      getMoveDirectionX, getMoveDirectionY, getSnakeSpeed, getIntervalId,
      setGridWidth, setGridHeight, setGridArray, setMoveGrid, setLastFootMoveInstruction,
      setMoveDirectionX, setMoveDirectionY, setSnakeSpeed, setIntervalId,
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