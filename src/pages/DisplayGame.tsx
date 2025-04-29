import { Input } from '@mui/joy';
import { AlternativeButton } from '../components/AlternativeButton';
import { HandleGameLogic } from '../utils/HandleGameLogic';
import { useGameSettings } from '../context/GameContext';
import { SnakeGrid } from '../components/SnakeGrid';

export function DisplayGame() {

    const { initalizeGame, updateGrid } = HandleGameLogic();

    const {
        getSnakeSpeed,
        getIntervalId,
        getAppleAmount,
        setSnakeSpeed,
        setIntervalId,
        setAppleAmount
    } = useGameSettings();

    const startGame = () => {

        if(getIntervalId){
            clearInterval(getIntervalId);
            setIntervalId(null);
        }

        initalizeGame();
        setIntervalId(setInterval(updateGrid, getSnakeSpeed));
    }

    return(
        <>
            <AlternativeButton sx={{backgroundColor:"#FF9B85", margin:"10px 10px"}} onClick={startGame}>Start</AlternativeButton>
            <br/>
            <div style={{marginLeft: "10px"}}>
                Snake Speed:
                <Input type={"number"} sx={{width: "100px"}} value={getSnakeSpeed}
                    onChange={e => setSnakeSpeed(e.target.valueAsNumber)}></Input>
                Apple Amount:
                <Input type={"number"} sx={{width: "100px"}} value={getAppleAmount}
                    onChange={e => setAppleAmount(e.target.valueAsNumber)}></Input>
                    
            </div>
            <SnakeGrid></SnakeGrid>
        </>
    );
}