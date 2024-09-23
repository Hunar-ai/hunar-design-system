import React from 'react';

import tinycolor from 'tinycolor2';

import {
    Button,
    type ButtonProps,
    useTheme,
    type SxProps
} from '@mui/material';

export interface CustomButtonProps extends ButtonProps {
    primaryColor: string;
}

export const CustomButton = ({
    primaryColor,
    variant,
    sx = {},
    ...restProps
}: CustomButtonProps) => {
    const theme = useTheme();

    const textButtonSx: SxProps = React.useMemo(() => {
        const hoverBGColor = tinycolor(primaryColor).setAlpha(0.04).toString();
        return {
            color: primaryColor,
            '&:hover': {
                backgroundColor: hoverBGColor
            }
        };
    }, [primaryColor]);

    const outlinedButtonSx: SxProps = React.useMemo(() => {
        const hoverBGColor = tinycolor(primaryColor).setAlpha(0.04).toString();
        const borderColor = tinycolor(primaryColor).setAlpha(0.5).toString();

        return {
            color: primaryColor,
            border: `1px solid ${borderColor}`,
            '&:hover': {
                backgroundColor: hoverBGColor,
                border: `1px solid ${primaryColor}`
            }
        };
    }, [primaryColor]);

    const containedButtonSx: SxProps = React.useMemo(() => {
        const hoverBGColor = tinycolor
            ? tinycolor(primaryColor).darken(4).toString()
            : primaryColor;
        return {
            color: theme.palette.getContrastText(primaryColor),
            backgroundColor: primaryColor,
            '&:hover': {
                backgroundColor: hoverBGColor
            }
        };
    }, [primaryColor, theme.palette]);

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
        <Button
            {...restProps}
            variant={variant}
            sx={{ ...primaryColorSx, ...sx }}
        />
    );
};
