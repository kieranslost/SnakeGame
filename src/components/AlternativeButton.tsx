import { Button, styled } from '@mui/joy';

export const AlternativeButton = styled(Button)`
    
    background-color: #FF9B85;
    width: 100px;

    &:hover {
        background-color: #EE6055;
    }

    &:focus {
        outline: none;
    }
`;