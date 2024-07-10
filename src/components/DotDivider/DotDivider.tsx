import { type SxProps } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Circle as CircleIcon } from '@mui/icons-material';

export interface DotDividerProps {
    fontSize?: number | string;
    sx?: SxProps;
}

export const DotDivider = ({ fontSize = 4, sx = {} }: DotDividerProps) => {
    return <CircleIcon sx={{ color: grey[400], fontSize, ...sx }} />;
};
