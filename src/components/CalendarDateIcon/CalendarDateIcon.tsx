import { Grid, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';

export interface CalendarDateIconProps {
    month: string;
    day: string;
    width?: number;
    height?: number;
}

export const CalendarDateIcon = ({
    month,
    day,
    width = 36,
    height = 20
}: CalendarDateIconProps) => {
    return (
        <Grid
            display="flex"
            flexDirection="column"
            borderRadius={1.5}
            border={`1px solid ${grey[300]}`}
        >
            <Typography
                display="flex"
                alignItems="center"
                justifyContent="center"
                variant="caption"
                bgcolor={blue[600]}
                color="white"
                width={width}
                height={height}
                fontWeight={600}
                sx={{ borderTopLeftRadius: 6, borderTopRightRadius: 6 }}
            >
                {month}
            </Typography>
            <Typography
                display="flex"
                alignItems="center"
                justifyContent="center"
                variant="caption"
                width={width}
                height={height}
                fontWeight={600}
            >
                {day}
            </Typography>
        </Grid>
    );
};
