import React from 'react';

import { Box, Grid, type SxProps, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

import { asteriskStyle } from '@/theme';
import { FIELD_SIZE } from '@/Enum';

interface TextAreaProps {
    name: string;
    value: string;
    placeholder: string;
    id?: string;
    size?: FIELD_SIZE;
    fullWidth?: boolean;
    required?: boolean;
    disabled?: boolean;
    primaryColor?: string;
    resize?: React.CSSProperties['resize'];
    sx?: SxProps;
    minRows?: number;
    maxRows?: number;
    maxLength?: number;
    minLength?: number;
    error?: boolean;
    helperText?: React.ReactNode;
    showCharHelpText?: boolean;
    onChange: (_: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onFocus?: (_: React.FocusEvent<HTMLTextAreaElement>) => void;
    onBlur?: (_: React.FocusEvent<HTMLTextAreaElement>) => void;
    onClick?: (e: React.SyntheticEvent) => void;
}

export const TextArea = ({
    name,
    value,
    placeholder,
    id = '',
    size = FIELD_SIZE.medium,
    fullWidth = false,
    required = false,
    disabled = false,
    primaryColor = undefined,
    resize = 'both',
    sx = {},
    minRows = 2,
    maxRows = 3,
    maxLength = 200,
    minLength = undefined,
    error = false,
    helperText = '',
    showCharHelpText = false,
    onChange,
    onFocus,
    onBlur,
    onClick
}: TextAreaProps) => {
    const theme = useTheme();

    const getHelperText = React.useCallback(() => {
        const numberOfCharacters = value ? value.length : 0;
        const remainingCharacters = maxLength - numberOfCharacters;
        if (minLength && numberOfCharacters < minLength) {
            const requiredCharacters = minLength - numberOfCharacters;
            const textPostFix = numberOfCharacters
                ? 'more character required'
                : 'characters required';
            return `${requiredCharacters} ${textPostFix}`;
        }
        const textPostFix = numberOfCharacters
            ? 'characters remaining'
            : 'characters';
        return numberOfCharacters > 1
            ? `${remainingCharacters} ${textPostFix}`
            : '';
    }, [value, maxLength, minLength]);

    return (
        <Box
            id={id}
            sx={{
                position: 'relative',
                '.textarea': {
                    borderColor: error ? theme.palette.error.main : grey[400]
                },
                '.textarea:hover': {
                    borderColor: error || disabled ? undefined : grey[900]
                },
                width: fullWidth ? '100%' : undefined
            }}
        >
            <Box
                component={TextareaAutosize}
                className="textarea"
                minRows={minRows}
                maxRows={maxRows}
                disabled={disabled}
                sx={{
                    width: fullWidth ? '100%' : '180px',
                    outlineColor: error
                        ? theme.palette.error.main
                        : primaryColor,
                    px: '13px',
                    py: size === FIELD_SIZE.medium ? '17px' : '9px',
                    mb: '-6px',
                    borderRadius: 1,
                    fontSize: 16,
                    fontFamily: 'Lato',
                    letterSpacing: 'inherit',
                    resize,
                    ...sx
                }}
                name={name}
                onChange={onChange}
                value={value}
                onFocus={onFocus}
                onBlur={onBlur}
                onClick={onClick}
            />
            <Typography
                aria-hidden="true"
                sx={{
                    pointerEvents: 'none',
                    userSelect: 'none',
                    display: value ? 'none' : 'inherit',
                    position: 'absolute',
                    top: size === FIELD_SIZE.medium ? 12 : 4,
                    left: 14,
                    color: error
                        ? theme.palette.error.main
                        : disabled
                        ? grey[400]
                        : grey[500]
                }}
            >
                {placeholder}
                <Typography component="span" sx={{ ...asteriskStyle }}>{`${
                    required ? ' *' : ''
                }`}</Typography>
            </Typography>
            <Grid container justifyContent="space-between">
                {helperText && (
                    <Typography
                        component="span"
                        align="left"
                        variant="caption"
                        mt={size === FIELD_SIZE.medium ? '3px' : '4px'}
                        mx="14px"
                        color={
                            error || maxLength - value.length < 0
                                ? theme.palette.error.main
                                : ''
                        }
                    >
                        {helperText}
                    </Typography>
                )}
                {showCharHelpText && (
                    <Typography
                        component="div"
                        align="right"
                        variant="caption"
                        mt={size === FIELD_SIZE.medium ? '3px' : '4px'}
                        color={
                            maxLength - value.length < 0 ||
                            (minLength &&
                                value.length > 3 &&
                                value.length < minLength)
                                ? theme.palette.error.main
                                : ''
                        }
                    >
                        {value.length > 3 && getHelperText()}
                    </Typography>
                )}
            </Grid>
        </Box>
    );
};
