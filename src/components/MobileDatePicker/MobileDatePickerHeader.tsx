import React from 'react';

import { Box, Grid, IconButton, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Clear as ClearIcon } from '@mui/icons-material';

interface MobileDatePickerHeaderProps {
    title: string;
    onCloseClick: VoidFunction;
}

export const MobileDatePickerHeader = ({
    title,
    onCloseClick
}: MobileDatePickerHeaderProps) => {
    const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onCloseClick();
    };

    return (
        <Box position="sticky" top={0} left={0} width="100%" bgcolor="white">
            <Grid container alignItems="center" px={2} py={1.5}>
                <Grid item xs>
                    <Typography
                        variant="caption"
                        textTransform="uppercase"
                        color={grey[700]}
                    >
                        {title}
                    </Typography>
                </Grid>
                <Grid item>
                    <IconButton
                        sx={{ p: 0.5, mr: -0.5 }}
                        onClick={handleCloseClick}
                    >
                        <ClearIcon sx={{ fontSize: 24 }} />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    );
};
