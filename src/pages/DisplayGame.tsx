import { Button } from '@mui/joy';
import { SnakeGrid } from "../components/SnakeGrid";
import { SetupGame } from '../utils/SetupGame';

export function DisplayGame() {

    const { initalizeGame } = SetupGame();

    return(
        <>
            <Button onClick={initalizeGame}>Start</Button>
            <SnakeGrid></SnakeGrid>
        </>
    );
}