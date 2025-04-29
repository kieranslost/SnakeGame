import { Box } from "@mui/joy";
import { useGameSettings } from "../context/GameContext";
import {SnakeBox} from "./SnakeBox";

export function SnakeGrid () {

    const {
        getGridWidth,
        getGridHeight,
        getGridArray
    } = useGameSettings();

    return(
        <table style={{backgroundColor: "#fff", borderRadius: "5px", margin: "10px auto"}}>
            <tbody>
                { Array.from({ length: getGridHeight }).map((_, rowIndex) => (
                    <tr key={rowIndex}>
                        {Array.from({ length: getGridWidth }).map((_, colIndex) => (
                            <td key={colIndex}>
                                <SnakeBox id={getGridArray[rowIndex][colIndex]}/>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}