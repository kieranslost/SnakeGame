import { useGameSettings } from '../context/GameContext';

export function SetupGame() {

    const {
        getGridWidth,
        getGridHeight,
        getGridArray,
        setGridArray
    } = useGameSettings();

    const initalizeGame = () => {

        console.log("testInitGame");
        var setupGrid = getGridArray.map(row => [...row]);
        for(let row = 0; row < getGridHeight; row++){
            for(let col = 0; col < getGridWidth; col++){
                if(col === 5 && row === 5){
                    setupGrid[row][col] = "head";
                }
                if(col === 4 && row === 5){
                    setupGrid[row][col] = "body";
                }
                if(col === 3 && row === 5){
                    setupGrid[row][col] = "body";
                }
                if(col === 3 && row === 4){
                    setupGrid[row][col] = "body";
                }
                if(col === 3 && row === 3){
                    setupGrid[row][col] = "body";
                }

                if(col === 8 && row === 5){
                    setupGrid[row][col] = "food";
                }
                if(col === 10 && row === 3){
                    setupGrid[row][col] = "food";
                }
                if(col === 3 && row === 10){
                    setupGrid[row][col] = "food";
                }
            }
        }
        setGridArray(setupGrid)
    }

    return { initalizeGame };
}