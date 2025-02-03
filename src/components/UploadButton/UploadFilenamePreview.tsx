import React from 'react';

import {
    CircularProgress,
    Grid,
    IconButton,
    Typography,
    useTheme,
    type SxProps
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { X, File, CheckCircle } from '@phosphor-icons/react';

import { BUTTON_SIZE } from '@/Enum';

const SIZE_TO_STYLE_MAP = {
    [BUTTON_SIZE.small]: {
        px: '7px',
        py: '2px',
        iconSize: 18
    },
    [BUTTON_SIZE.medium]: {
        px: '10px',
        py: '5px',
        iconSize: 20
    },
    [BUTTON_SIZE.large]: {
        px: '16px',
        py: '8px',
        iconSize: 22
    }
};

export interface UploadFilenamePreviewProps {
    size: BUTTON_SIZE;
    filename: string;
    isSuccessIconVisible: boolean;
    hasError: boolean;
    isDisabled: boolean;
    isLoading: boolean;
    isStartIconVisible: boolean;
    sx: SxProps;
    onRemove: VoidFunction;
}

export const UploadFilenamePreview = ({
    size,
    filename,
    isSuccessIconVisible,
    hasError,
    isDisabled,
    isLoading,
    isStartIconVisible,
    sx = {},
    onRemove
}: UploadFilenamePreviewProps) => {
    const theme = useTheme();

    const { color, borderColor } = React.useMemo(() => {
        if (isDisabled) {
            return {
                color: theme.palette.action.disabled,
                borderColor: theme.palette.action.disabled
            };
        }

        if (hasError) {
            return {
                color: theme.palette.error.main,
                borderColor: theme.palette.error.main
            };
        }

        return {
            color: grey[600],
            borderColor: grey[300]
        };
    }, [
        hasError,
        isDisabled,
        theme.palette.action.disabled,
        theme.palette.error.main
    ]);

    return (
        <Grid
            item
            xs="auto"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="1px solid"
            borderColor={borderColor}
            px={SIZE_TO_STYLE_MAP[size].px}
            py={SIZE_TO_STYLE_MAP[size].py}
            borderRadius={1}
            lineHeight={1.75}
            sx={sx}
            color={color}
        >
            {isStartIconVisible && (
                <>
                    {isLoading ? (
                        <CircularProgress
                            size={SIZE_TO_STYLE_MAP[size].iconSize}
                            sx={{ mx: 0.25, color }}
                        />
                    ) : (
                        <>
                            {isSuccessIconVisible ? (
                                <CheckCircle
                                    size={SIZE_TO_STYLE_MAP[size].iconSize}
                                    color={color}
                                />
                            ) : (
                                <File
                                    size={SIZE_TO_STYLE_MAP[size].iconSize}
                                    color={color}
                                />
                            )}
                        </>
                    )}
                </>
            )}
            <Typography
                variant="body2"
                lineHeight="inherit"
                px={1}
                color={color}
            >
                {filename}
            </Typography>
            {!isLoading && (
                <IconButton
                    sx={{ p: 0 }}
                    onClick={onRemove}
                    size={size}
                    disabled={isDisabled}
                >
                    <X size={SIZE_TO_STYLE_MAP[size].iconSize} color={color} />
                </IconButton>
            )}
        </Grid>
    );
};
