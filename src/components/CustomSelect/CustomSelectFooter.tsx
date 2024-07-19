import React from 'react';

import tinycolor from 'tinycolor2';

import { Button, Grid, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

interface CustomSelectFooterProps {
    optionsLength: number;
    isMultiple: boolean;
    isRequired: boolean;
    primaryColor: string;
    onClearClick: VoidFunction;
    onConfirmClick: VoidFunction;
}

export const CustomSelectFooter = ({
    optionsLength,
    isMultiple,
    isRequired,
    primaryColor,
    onClearClick,
    onConfirmClick
}: CustomSelectFooterProps) => {
    const theme = useTheme();

    const textButtonSx = React.useMemo(() => {
        const hoverBGColor = tinycolor(primaryColor).setAlpha(0.04).toString();

        return {
            color: primaryColor,
            '&:hover': {
                backgroundColor: hoverBGColor
            }
        };
    }, [primaryColor]);

    const containedButtonSx = React.useMemo(() => {
        const hoverBGColor = tinycolor(primaryColor).darken(4).toString();

        return {
            color: theme.palette.getContrastText(primaryColor),
            backgroundColor: primaryColor,
            '&:hover': {
                backgroundColor: hoverBGColor
            }
        };
    }, [primaryColor, theme.palette]);

    const hasOptions = React.useMemo(() => optionsLength > 0, [optionsLength]);

    const isClearAllVisible = React.useMemo(() => {
        if (optionsLength < 5) {
            return false;
        }

        return isMultiple || !isRequired;
    }, [isMultiple, optionsLength, isRequired]);

    return (
        <Grid
            container
            justifyContent={isClearAllVisible ? 'space-between' : 'end'}
            alignItems="center"
            position="sticky"
            bottom={0}
            left={0}
            bgcolor="white"
            px={2}
            py={1.5}
            borderTop={hasOptions ? `1px solid ${grey[200]}` : undefined}
        >
            {isClearAllVisible && (
                <Button size="large" sx={textButtonSx} onClick={onClearClick}>
                    CLEAR ALL
                </Button>
            )}
            {hasOptions && (
                <Button
                    size="large"
                    variant="contained"
                    sx={containedButtonSx}
                    onClick={onConfirmClick}
                >
                    CONFIRM
                </Button>
            )}
        </Grid>
    );
};
