import { Input } from '@mui/joy';
import { AlternativeButton } from '../components/AlternativeButton';
import { HandleGameLogic } from '../utils/HandleGameLogic';
import { useGameSettings, sanitizeNumberInput } from '../context/GameContext';
import { SnakeGrid } from '../components/SnakeGrid';

export function DisplayGame() {

    const { initalizeGame, updateGrid } = HandleGameLogic();

    const {
        getSnakeSpeed,
        getIntervalId,
        getAppleAmount,
        getGridHeight,
        getGridWidth,
        setSnakeSpeed,
        setIntervalId,
        setAppleAmount,
        setGridHeight,
        setGridWidth,
    } = useGameSettings();

    const startGame = () => {

        if(getIntervalId){
            clearInterval(getIntervalId);
            setIntervalId(null);
        }

        initalizeGame();
        setIntervalId(setInterval(updateGrid, getSnakeSpeed));
    }

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '10px' }}>
                <AlternativeButton
                    sx={{ backgroundColor: "#FF9B85" }}
                    onClick={startGame}
                >
                    Start
                </AlternativeButton>

                Snake Speed:
                <Input
                    type="number"
                    sx={{ width: "100px"}}
                    value={getSnakeSpeed}
                    onChange={e => setSnakeSpeed(sanitizeNumberInput(e.target.valueAsNumber))}
                />
            
                Grid Height:
                <Input
                    type="number"
                    sx={{ width: "100px" }}
                    value={getGridHeight}
                    onChange={e => setGridHeight(sanitizeNumberInput(e.target.valueAsNumber))}
                />
            
                Grid Width:
                <Input
                    type="number"
                    sx={{ width: "100px" }}
                    value={getGridWidth}
                    onChange={e => setGridWidth(sanitizeNumberInput(e.target.valueAsNumber))}
                />
            
                Apple Amount:
                <Input
                    type="number"
                    sx={{ width: "100px" }}
                    value={getAppleAmount}
                    onChange={e => setAppleAmount(sanitizeNumberInput(e.target.valueAsNumber))}
                />
            </div>
            <SnakeGrid />
        </>
    );
}    