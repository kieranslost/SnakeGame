import {Box, styled} from '@mui/joy';

export const SnakeBox = styled(Box)<{ id?: string }>`
    
    width: 30px;
    height: 30px;
    border-radius: 2px;

    background-color: ${({ id }) => 
        id === "head" ? "#60d394" :
            id === "body" ? "#aaf683" :
                id === "foot" ? "#aaf683" :
                    id === "apple" ? "#ee6055" :
                        "#ececec"};
`;