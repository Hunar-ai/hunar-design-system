import React from 'react';

import tinycolor from 'tinycolor2';

import { useTheme, type SxProps } from '@mui/material';
import LoadingButton, { type LoadingButtonProps } from '@mui/lab/LoadingButton';

export interface CustomButtonProps
    extends Omit<LoadingButtonProps, 'loading' | 'disabled' | 'fullWidth'> {
    primaryColor: string;
    hasError?: boolean;
    isLoading?: boolean;
    isDisabled?: boolean;
    isFullWidth?: boolean;
    component?: React.ElementType;
}

export const CustomButton = ({
    primaryColor,
    variant = 'contained',
    sx = {},
    hasError = false,
    isLoading = false,
    isDisabled = false,
    isFullWidth = false,
    ...restProps
}: CustomButtonProps) => {
    const theme = useTheme();

    const textButtonSx: SxProps = React.useMemo(() => {
        const color = hasError ? theme.palette.error.main : primaryColor;
        const hoverBGColor = tinycolor(color).setAlpha(0.04).toString();
        return {
            color,
            '&:hover': {
                backgroundColor: hoverBGColor
            }
        };
    }, [primaryColor, hasError, theme.palette.error.main]);

    const outlinedButtonSx: SxProps = React.useMemo(() => {
        const color = hasError ? theme.palette.error.main : primaryColor;
        const hoverBGColor = tinycolor(color).setAlpha(0.04).toString();
        const borderColor = tinycolor(color).setAlpha(0.5).toString();

        return {
            color,
            border: `1px solid ${borderColor}`,
            '&:hover': {
                backgroundColor: hoverBGColor,
                border: `1px solid ${color}`
            }
        };
    }, [primaryColor, hasError, theme.palette.error.main]);

    const containedButtonSx: SxProps = React.useMemo(() => {
        const color = hasError ? theme.palette.error.main : primaryColor;
        const hoverBGColor = tinycolor(color).darken(4).toString();
        return {
            color: theme.palette.getContrastText(color),
            backgroundColor: color,
            '&:hover': {
                backgroundColor: hoverBGColor
            }
        };
    }, [primaryColor, hasError, theme.palette]);

    const primaryColorSx: SxProps = React.useMemo(() => {
        switch (variant) {
            case 'contained':
                return containedButtonSx;
            case 'outlined':
                return outlinedButtonSx;
            case 'text':
                return textButtonSx;
            default:
                return containedButtonSx;
        }
    }, [containedButtonSx, outlinedButtonSx, textButtonSx, variant]);

    return (
        <LoadingButton
            {...restProps}
            variant={variant}
            loading={isLoading}
            disabled={isDisabled}
            fullWidth={isFullWidth}
            sx={{ ...primaryColorSx, ...sx }}
        />
    );
};
