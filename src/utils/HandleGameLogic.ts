import { useRef, useEffect } from 'react';
import { useGameSettings } from '../context/GameContext';

export function HandleGameLogic() {

    const {
        getGridWidth,
        getGridHeight,
        getGridArray,
        getMoveGrid,
        getLastFootMoveInstruction,
        getMoveDirectionY,
        getMoveDirectionX,
        getIntervalId,
        setMoveGrid,
        setGridArray,
        setLastFootMoveInstruction,
        setMoveDirectionY,
        setMoveDirectionX,
        setIntervalId
    } = useGameSettings();

    const moveGridRef = useRef(getMoveGrid);
    const gridArrayRef = useRef(getGridArray);
    const lastFootMoveInstructionRef = useRef(getLastFootMoveInstruction);
    const moveDirectionYRef = useRef(getMoveDirectionY);
    const moveDirectionXRef = useRef(getMoveDirectionX);
    const intervalIdRef = useRef(getIntervalId);

    useEffect(() => {
        moveGridRef.current = getMoveGrid;
    }, [getMoveGrid]);
    useEffect(() => {
        gridArrayRef.current = getGridArray;
    }, [getGridArray]);
    useEffect(() => {
        lastFootMoveInstructionRef.current = getLastFootMoveInstruction;
    }, [getLastFootMoveInstruction]);
    useEffect(() => {
        moveDirectionYRef.current = getMoveDirectionY;
    }, [getMoveDirectionY]);
    useEffect(() => {
        moveDirectionXRef.current = getMoveDirectionX;
    }, [getMoveDirectionX]);
    useEffect(() => {
        intervalIdRef.current = getIntervalId;
    }, [getIntervalId]);

    document.addEventListener('keydown', function(event) {
        handleKeyInput(event.key);
    });

    const handleKeyInput = (keyPressed: string) => {

        if(keyPressed === "w" || keyPressed === "ArrowUp"){
            if(moveDirectionYRef.current !== 1){
                setMoveDirectionY(-1);
                setMoveDirectionX(0);
            }
            return;
        }
        if(keyPressed === "s" || keyPressed === "ArrowDown"){
            if(moveDirectionYRef.current !== -1){
                setMoveDirectionY(1);
                setMoveDirectionX(0);
            }
            return;
        }
        if(keyPressed === "a" || keyPressed === "ArrowLeft"){
            if(moveDirectionXRef.current !== 1){
                setMoveDirectionY(0);
                setMoveDirectionX(-1);
            }
            return;
        }
        if(keyPressed === "d" || keyPressed === "ArrowRight"){
            if(moveDirectionXRef.current !== -1){
                setMoveDirectionY(0);
                setMoveDirectionX(1);
            }
            return;
        }
    }

    const handleWallHit = () => {

        if(intervalIdRef.current){
            console.log("testIntercal");
            clearInterval(intervalIdRef.current);
            setIntervalId(null);
        }
        alert("you lost");
    }

    const growApples = (updateGrid: string[][]) => {

        var PosiblePositions: number[][] = [];

        for(let row = 0; row < getGridHeight; row++){
            for(let col = 0; col < getGridWidth; col++){
                
                if(updateGrid[row][col] === ""){
                    PosiblePositions.push([row, col]);
                }
            }
        }

        if(PosiblePositions.length === 0){
            return;
        }

        var newApplePosition = Math.floor(Math.random() * (PosiblePositions.length-1));
        var applePosition = PosiblePositions[newApplePosition];
        updateGrid[applePosition[0]][applePosition[1]] = "apple";
        setGridArray(updateGrid);
    
        return;
    }

    const handleEating = (updateGrid: string[][]) => {

        const moveInstructions = lastFootMoveInstructionRef.current;
        for(let row = 0; row < getGridHeight; row++){
            for(let col = 0; col < getGridWidth; col++){
                if(updateGrid[row][col] === "foot"){
                    updateGrid[row][col] = "body";
                    updateGrid[row-moveInstructions[0]][col-moveInstructions[1]] = "foot";
                    setGridArray(updateGrid);
                    growApples(updateGrid);
                    return;
                }
            }
        }
    }

    const initalizeGame = () => {

        var setupGrid = getGridArray.map(row => [...row]);
        
        for(let row = 0; row < getGridHeight; row++){
            for(let col = 0; col < getGridWidth; col++){

                setupGrid[row][col] = "";
            }
        }

        setupGrid[3][3] = "foot";

        setupGrid[4][3] = "body";
        setupGrid[5][3] = "body";
        setupGrid[5][4] = "body";

        setupGrid[5][5] = "head";

        setupGrid[5][8] = "apple";
        setupGrid[3][10] = "apple";
        setupGrid[10][3] = "apple";

        setGridArray(setupGrid)

        var setupMoveGrid = getMoveGrid.map(row => [[0, 0]]);

        setupMoveGrid[3][3] = [1, 0];

        setupMoveGrid[4][3] = [1, 0];
        setupMoveGrid[5][3] = [0, 1];
        setupMoveGrid[5][4] = [0, 1];

        setupMoveGrid[5][5] = [1, 0];

        setMoveGrid(setupMoveGrid);

        setMoveDirectionY(0);
        setMoveDirectionX(1);
    }

    const updateGrid = () => {

        const currentMoveGrid = moveGridRef.current;
        const currentGridArray = gridArrayRef.current;
        const currentMoveDirectionY = moveDirectionYRef.current;
        const currentMoveDirectionX = moveDirectionXRef.current;

        var headMoved = false;
        var footMoved = false;
        var updateMoveGrid = currentMoveGrid.map(row => [...row]);
        var updateGrid = currentGridArray.map(row => [...row]);
        for(let row = 0; row < getGridHeight; row++){
            for(let col = 0; col < getGridWidth; col++){

               if(!headMoved && updateGrid[row][col] === "head"){

                    if(row+currentMoveDirectionY >= getGridHeight || row+currentMoveDirectionY < 0){
                        //console.log("loss-Wall-Height");
                        handleWallHit();
                        return;
                    }

                    if(col+currentMoveDirectionX >= getGridWidth || col+currentMoveDirectionX < 0){
                        //console.log("loss-Wall-Width");
                        handleWallHit();
                        return;
                    }

                    if(updateGrid[row+currentMoveDirectionY][col+currentMoveDirectionX] === "foot" || updateGrid[row+currentMoveDirectionY][col+currentMoveDirectionX] === "body"){
                        //console.log("loss-Body");
                        handleWallHit();
                        return;
                    }

                    if(updateGrid[row+currentMoveDirectionY][col+currentMoveDirectionX] === "apple"){
                        handleEating(updateGrid);
                    }

                    updateGrid[row][col] = "body";
                    updateGrid[row+currentMoveDirectionY][col+currentMoveDirectionX] = "head";

                    updateMoveGrid[row][col] = [currentMoveDirectionY, currentMoveDirectionX];
                    setMoveGrid(updateMoveGrid);
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

        for(let row = 0; row < getGridHeight; row++){
            for(let col = 0; col < getGridWidth; col++){

                if(!footMoved && updateGrid[row][col] === "foot"){

                    if(updateGrid[row][col] !== "head"){
                        updateGrid[row][col] = "";
                    }

                    let moveInstruction = currentMoveGrid[row][col];
                    setLastFootMoveInstruction(moveInstruction);

                    updateGrid[row+moveInstruction[0]][col+moveInstruction[1]] = "foot";
                    footMoved = true;
                }

                if(footMoved){
                    setGridArray(updateGrid);
                    return;
                }

            }
        }
    }

    return { initalizeGame, updateGrid };
}