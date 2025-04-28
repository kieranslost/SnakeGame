import { useGameSettings } from '../context/GameContext';

export function HandleGameLogic() {

    const {
        getGridWidth,
        getGridHeight,
        getGridArray,
        getMoveGrid,
        getMoveDirectionX,
        getMoveDirectionY,
        setMoveGrid,
        setGridArray
    } = useGameSettings();

    const initalizeGame = () => {

        var setupGrid = getGridArray.map(row => [...row]);
        
        setupGrid[3][3] = "foot";

        setupGrid[4][3] = "body";
        setupGrid[5][3] = "body";
        setupGrid[5][4] = "body";

        setupGrid[5][5] = "head";

        setupGrid[5][8] = "apple";
        setupGrid[3][10] = "apple";
        setupGrid[10][3] = "apple";

        setGridArray(setupGrid)

        var setupMoveGrid = getMoveGrid.map(row => [...row]);

        setupMoveGrid[3][3] = [1, 0];

        setupMoveGrid[4][3] = [1, 0];
        setupMoveGrid[5][3] = [0, 1];
        setupMoveGrid[5][4] = [0, 1];

        setupMoveGrid[5][5] = [1, 0];

        setMoveGrid(setupMoveGrid);
    }

    const updateGrid = () => {

        var headMoved = false;
        var footMoved = false;
        var updateMoveGrid = getMoveGrid.map(row => [...row]);
        var updateGrid = getGridArray.map(row => [...row]);
        for(let row = 0; row < getGridHeight; row++){
            for(let col = 0; col < getGridWidth; col++){

               if(!headMoved && updateGrid[row][col] === "head"){

                    updateGrid[row][col] = "body";
                    updateGrid[row+getMoveDirectionY][col+getMoveDirectionX] = "head";

                    updateMoveGrid[row][col] = [getMoveDirectionY, getMoveDirectionX];
                    setMoveGrid(updateMoveGrid);

                    headMoved = true;
               }

               if(!footMoved && updateGrid[row][col] === "foot"){

                    if(updateGrid[row][col] !== "head"){
                        updateGrid[row][col] = "";
                    }

                    let moveInstruction = getMoveGrid[row][col];
                   
                    updateGrid[row+moveInstruction[0]][col+moveInstruction[1]] = "foot";

                    updateMoveGrid[row][col] = [0, 0];
                    setMoveGrid(updateMoveGrid);

                    footMoved = true;
                }

                if(headMoved && footMoved){
                    setGridArray(updateGrid);
                    return;
                }
            }
        }
    }

    return { initalizeGame, updateGrid };
}