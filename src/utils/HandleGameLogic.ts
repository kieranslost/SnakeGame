import { useRef, useEffect } from 'react';
import { useGameSettings } from '../context/GameContext';

export function HandleGameLogic() {

    const {
        getGridWidth,
        getGridHeight,
        getGridArray,
        getMoveGrid,
        getSaveMoveCommands,
        getLastFootMoveInstruction,
        getIntervalId,
        getAppleAmount,
        setMoveGrid,
        setGridArray,
        setSaveMoveCommands,
        setLastFootMoveInstruction,
        setIntervalId
    } = useGameSettings();

    // TODO
    // "WallProtal" mode

    const moveGridRef = useRef(getMoveGrid);
    const gridArrayRef = useRef(getGridArray);
    const saveMoveCommandsRef = useRef(getSaveMoveCommands);
    const lastFootMoveInstructionRef = useRef(getLastFootMoveInstruction);
    const intervalIdRef = useRef(getIntervalId);

    useEffect(() => {
        moveGridRef.current = getMoveGrid;
    }, [getMoveGrid]);
    useEffect(() => {
        gridArrayRef.current = getGridArray;
    }, [getGridArray]);
    useEffect(() => {
        saveMoveCommandsRef.current = getSaveMoveCommands;
    }, [getSaveMoveCommands]);
    useEffect(() => {
        lastFootMoveInstructionRef.current = getLastFootMoveInstruction;
    }, [getLastFootMoveInstruction]);
    useEffect(() => {
        intervalIdRef.current = getIntervalId;
    }, [getIntervalId]);

    document.addEventListener('keydown', function(event) {
        handleKeyInput(event.key);
    });

    const handleKeyInput = (keyPressed: string) => {

        const saveCurrentMoveCommands = saveMoveCommandsRef.current[0];
        const saveLastMoveCommands = saveMoveCommandsRef.current[1];

        if(keyPressed === "w" || keyPressed === "ArrowUp"){
            if(saveCurrentMoveCommands[0] !== 1 && saveLastMoveCommands[0] !== 1){
                saveMoveCommandsRef.current[0] = [-1, 0];
                setSaveMoveCommands(saveMoveCommandsRef.current);

            }
            return;
        }
        if(keyPressed === "s" || keyPressed === "ArrowDown"){
            if(saveCurrentMoveCommands[0] !== -1 && saveLastMoveCommands[0] !== -1){
                saveMoveCommandsRef.current[0] = [1, 0];
                setSaveMoveCommands(saveMoveCommandsRef.current);
            }
            return;
        }
        if(keyPressed === "a" || keyPressed === "ArrowLeft"){
            if(saveCurrentMoveCommands[1] !== 1 && saveLastMoveCommands[1] !== 1){
                saveMoveCommandsRef.current[0] = [0, -1];
                setSaveMoveCommands(saveMoveCommandsRef.current);
            }
            return;
        }
        if(keyPressed === "d" || keyPressed === "ArrowRight"){
            if(saveCurrentMoveCommands[1] !== -1 && saveLastMoveCommands[1] !== -1){
                saveMoveCommandsRef.current[0] = [0, 1];
                setSaveMoveCommands(saveMoveCommandsRef.current);
            }
            return;
        }
    }

    const checkGameWon = (updateGrid: string[][]) => {

        for(let row = 0; row < getGridHeight; row++){
            for(let col = 0; col < getGridWidth; col++){
                if(updateGrid[row][col] === "apple"){
                    return;
                }
            }
        }
        
        if(intervalIdRef.current){
            clearInterval(intervalIdRef.current);
            setIntervalId(null);
        }
        alert("Well Done!");
        return;
    }

    const handleWallHit = () => {
        if(intervalIdRef.current){
            clearInterval(intervalIdRef.current);
            setIntervalId(null);
        }
        alert("you lost");
    }

    const growApples = (updateGrid: string[][], appleAmount: number) => {

        let PosiblePositions: number[][] = [];

        for(let row = 0; row < getGridHeight; row++){
            for(let col = 0; col < getGridWidth; col++){
                if(updateGrid[row][col] === ""){
                    PosiblePositions.push([row, col]);
                }
            }
        }

        let newApplePosition;
        let applePosition

        if(PosiblePositions.length === 0){
            return;
        }

        for(let a = 0; a < appleAmount; a++){
            newApplePosition = Math.floor(Math.random() * (PosiblePositions.length));
            applePosition = PosiblePositions[newApplePosition];
            updateGrid[applePosition[0]][applePosition[1]] = "apple";
            PosiblePositions.splice(newApplePosition, 1);
        }

        setGridArray(updateGrid);
        return;
    }

    const initalizeGame = () => {

        let setupGrid = getGridArray.map(row => [...row]);
        
        for(let row = 0; row < getGridHeight; row++){
            for(let col = 0; col < getGridWidth; col++){
                setupGrid[row][col] = "";
            }
        }

        let yStartingPosition = Math.floor(getGridHeight/2);
        let xStartingPosition = Math.floor(getGridWidth/2);

        setupGrid[yStartingPosition][xStartingPosition-1] = "foot";
        setupGrid[yStartingPosition][xStartingPosition] = "head";

        growApples(setupGrid, getAppleAmount);

        let setupMoveGrid = getMoveGrid.map(row => [[0, 1]]);

        setupMoveGrid[5][3] = [0, 1];
        setupMoveGrid[5][4] = [0, 1];
        setupMoveGrid[5][5] = [1, 0];

        setGridArray(setupGrid)

        setMoveGrid(setupMoveGrid);

        setSaveMoveCommands([[0,1], [0,1]]);
    }

    const updateGrid = () => {

        const currentMoveGrid = moveGridRef.current;
        const currentGridArray = gridArrayRef.current;
        const currentMoveDirectionY = saveMoveCommandsRef.current[0][0];
        const currentMoveDirectionX = saveMoveCommandsRef.current[0][1];

        let headMoved = false;
        let footMoved = false;
        let appleConsumed = false;
        let updateMoveGrid = currentMoveGrid.map(row => [...row]);
        let updateGrid = currentGridArray.map(row => [...row]);
        for(let row = 0; row < getGridHeight; row++){
            for(let col = 0; col < getGridWidth; col++){

               if(!headMoved && updateGrid[row][col] === "head"){

                    if(row+currentMoveDirectionY >= getGridHeight || row+currentMoveDirectionY < 0){
                        handleWallHit();
                        return;
                    }

                    if(col+currentMoveDirectionX >= getGridWidth || col+currentMoveDirectionX < 0){
                        handleWallHit();
                        return;
                    }

                    if(updateGrid[row+currentMoveDirectionY][col+currentMoveDirectionX] === "foot" || 
                    updateGrid[row+currentMoveDirectionY][col+currentMoveDirectionX] === "body"){
                        handleWallHit();
                        return;
                    }

                    if(updateGrid[row+currentMoveDirectionY][col+currentMoveDirectionX] === "apple"){
                        growApples(updateGrid, 1);
                        appleConsumed = true;
                    }

                    updateGrid[row][col] = "body";
                    updateGrid[row+currentMoveDirectionY][col+currentMoveDirectionX] = "head";

                    updateMoveGrid[row][col] = [currentMoveDirectionY, currentMoveDirectionX];
                    setMoveGrid(updateMoveGrid);

                    const updatedMoveCommand = [...saveMoveCommandsRef.current];
                    updatedMoveCommand[1] = saveMoveCommandsRef.current[0];
                    setSaveMoveCommands(updatedMoveCommand);
                    
                    headMoved = true;
               }
                if(headMoved){
                    break;
                }
            }
            if(headMoved){
                break;
            }
        }

        checkGameWon(updateGrid);

        for(let row = 0; row < getGridHeight; row++){
            for(let col = 0; col < getGridWidth; col++){
                if(!footMoved && updateGrid[row][col] === "foot"){
                    if(!appleConsumed){
                        let moveInstruction = currentMoveGrid[row][col];
                        setLastFootMoveInstruction(moveInstruction);
                        updateGrid[row+moveInstruction[0]][col+moveInstruction[1]] = "foot";
                        if(updateGrid[row][col] !== "head"){
                            updateGrid[row][col] = "";
                        }
                    }
                    setGridArray(updateGrid);
                    return;
                }
            }
        }
    }

    return { initalizeGame, updateGrid };
}