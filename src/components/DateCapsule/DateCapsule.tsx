import React from 'react';

import { Grid, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';

import { DateTimeFormat, TimeUtils } from '@/utils';

export interface DateCapsuleProps {
    date: Date;
    width?: number;
    height?: number;
}

export const DateCapsule = ({
    date,
    width = 36,
    height = 20
}: DateCapsuleProps) => {
    const { month, day } = React.useMemo(() => {
        if (!TimeUtils.isValidDate(date)) {
            return { month: '', day: '' };
        }

        const formattedMonth = TimeUtils.format(
            date,
            DateTimeFormat.MONTH_FORMAT
        );
        const formattedDay = TimeUtils.format(date, DateTimeFormat.DATE_FORMAT);
        return { month: formattedMonth, day: formattedDay };
    }, [date]);

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
