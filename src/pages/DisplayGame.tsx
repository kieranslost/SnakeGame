import { Button } from '@mui/joy';
import { AlternativeButton } from '../components/AlternativeButton';
import { SnakeGrid } from "../components/SnakeGrid";
import { HandleGameLogic } from '../utils/HandleGameLogic';

export function DisplayGame() {

    const { initalizeGame, updateGrid } = HandleGameLogic();

    return(
        <>
            <AlternativeButton sx={{backgroundColor:"#FF9B85", margin:"10px 10px"}} onClick={initalizeGame}>Start</AlternativeButton>
            <AlternativeButton sx={{backgroundColor:"#FF9B85", marginTop:"10px"}} onClick={updateGrid}>updateGameStatus</AlternativeButton>
            <SnakeGrid></SnakeGrid>
        </>
    );
}