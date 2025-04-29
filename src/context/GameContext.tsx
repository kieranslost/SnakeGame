import { StringSupportOption } from 'prettier';
import React, { createContext, useContext, useState } from 'react';

type GameSettings = {
    getGridWidth: number;
    getGridHeight: number;
    getGridArray: string[][];
    getMoveGrid: number[][][];
    getSaveMoveCommands: number[][];
    getSnakeSpeed: number;
    getIntervalId: NodeJS.Timeout | null;
    getAppleAmount: number;
    setGridWidth: (w: number) => void;
    setGridHeight: (w: number) => void;
    setGridArray: (w: string[][]) => void;
    setMoveGrid: (w: number[][][]) => void;
    setSaveMoveCommands: (w: number[][]) => void;
    setSnakeSpeed:(w: number) => void;
    setIntervalId: (w: NodeJS.Timeout | null) => void;
    setAppleAmount: (w: number) => void;
};

export const GameContext = createContext<GameSettings | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  // Grid Data
  const [getGridWidth, setGridWidth] = useState(10);
  const [getGridHeight, setGridHeight] = useState(10);
  const [getSnakeSpeed, setSnakeSpeed] = useState(300);
  const [getIntervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [getAppleAmount, setAppleAmount] = useState(3);
  // Move Direction: 0 = neutral, 1 = positive, -1 = negative
  const [getMoveGrid, setMoveGrid] = useState<number[][][]>(Array(getGridHeight).fill(null).map(() => Array(getGridWidth).fill([0, 1])));
  const [getSaveMoveCommands, setSaveMoveCommands] = useState([[0,1], [0,1]])
  const [getMoveDirectionY, setMoveDirectionY] = useState(0);
  const [getMoveDirectionX, setMoveDirectionX] = useState(1);
  // Grid Array
  const [getGridArray, setGridArray] = useState<string[][]>(Array(getGridHeight).fill(null).map(() => Array(getGridWidth).fill("")));

  return (
    <GameContext.Provider value={{ 
      getGridWidth, getGridHeight, getGridArray, getMoveGrid, 
      getSaveMoveCommands, getSnakeSpeed, getIntervalId, getAppleAmount,
      setGridWidth, setGridHeight, setGridArray, setMoveGrid, 
      setSaveMoveCommands, setSnakeSpeed, setIntervalId, setAppleAmount,
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