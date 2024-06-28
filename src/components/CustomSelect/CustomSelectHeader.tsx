import React from 'react';

import { Box, Grid, IconButton, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Clear as ClearIcon } from '@mui/icons-material';

import { CustomSelectSearchBar } from './CustomSelectSearchBar';

interface CustomSelectHeaderProps {
    title: string;
    optionsLength: number;
    search: string;
    primaryColor: string;
    setSearch: (_: string) => void;
    onCloseClick: VoidFunction;
}

export const CustomSelectHeader = ({
    title,
    optionsLength,
    search,
    primaryColor,
    setSearch,
    onCloseClick
}: CustomSelectHeaderProps) => {
    const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onCloseClick();
    };

    return (
        <Box
            position="sticky"
            top={0}
            left={0}
            width="100%"
            bgcolor="white"
            zIndex={optionsLength + 1}
        >
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
            {optionsLength > 2 && (
                <CustomSelectSearchBar
                    search={search}
                    setSearch={setSearch}
                    primaryColor={primaryColor}
                />
            )}
        </Box>
    );
};
