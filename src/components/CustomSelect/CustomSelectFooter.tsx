import React from 'react';

import tinycolor from 'tinycolor2';

import { Button, Grid, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

interface CustomSelectFooterProps {
    hasOptions: boolean;
    primaryColor: string;
    onClearClick: VoidFunction;
    onConfirmClick: VoidFunction;
}

export const CustomSelectFooter = ({
    hasOptions,
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

    return (
        <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            position="sticky"
            bottom={0}
            left={0}
            bgcolor="white"
            px={2}
            py={1.5}
            borderTop={hasOptions ? `1px solid ${grey[200]}` : undefined}
        >
            {hasOptions && (
                <>
                    <Button
                        size="large"
                        sx={textButtonSx}
                        onClick={onClearClick}
                    >
                        CLEAR ALL
                    </Button>
                    <Button
                        size="large"
                        variant="contained"
                        sx={containedButtonSx}
                        onClick={onConfirmClick}
                    >
                        CONFIRM
                    </Button>
                </>
            )}
        </Grid>
    );
};
