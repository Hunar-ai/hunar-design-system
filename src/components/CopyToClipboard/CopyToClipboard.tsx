import React from 'react';

import { alpha, IconButton, useTheme, type SxProps } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { Copy as CopyIcon } from '@phosphor-icons/react';

import { CopyToClipboardStatus } from './CopyToClipboardStatus';

import { BUTTON_SIZE } from '@/Enum';

const alertPaddingMap = {
    [BUTTON_SIZE.small]: '5px',
    [BUTTON_SIZE.medium]: '8px',
    [BUTTON_SIZE.large]: '12px'
};

export interface CopyToClipboardProps {
    textToCopy: string;
    showStatusText?: boolean;
    isOutlined?: boolean;
    buttonSize?: BUTTON_SIZE;
    iconSize?: number;
    iconColor?: string;
    onClick?: (_: React.MouseEvent) => void;
    onCopySuccess?: VoidFunction;
    onCopyFail?: VoidFunction;
}

export const CopyToClipboard = ({
    textToCopy,
    showStatusText = false,
    isOutlined = false,
    buttonSize = BUTTON_SIZE.medium,
    iconSize = 24,
    iconColor = undefined,
    onClick = () => undefined,
    onCopySuccess = () => undefined,
    onCopyFail = () => undefined
}: CopyToClipboardProps) => {
    const theme = useTheme();

    const [showStatus, setShowStatus] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);

    const alertSx: SxProps = React.useMemo(() => {
        return {
            display: 'inline-flex',
            width: 'min-content',
            height: 'fit-content',
            '& .MuiAlert-message': { py: 0, lineHeight: 1.2 },
            '& .MuiAlert-icon': {
                mr: showStatusText ? undefined : 0,
                py: 0
            },
            p: alertPaddingMap[buttonSize],
            alignItems: 'center',
            border: isOutlined ? `1px solid ${grey[200]}` : undefined
        };
    }, [isOutlined, showStatusText, buttonSize]);

    const buttonSx: SxProps = React.useMemo(() => {
        return {
            ':hover': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.hoverOpacity
                ),
                border: isOutlined ? `1px solid ${blue[50]}` : undefined
            },
            borderRadius: 1,
            border: isOutlined ? `1px solid ${grey[200]}` : undefined
        };
    }, [
        isOutlined,
        theme.palette.action.hoverOpacity,
        theme.palette.primary.main
    ]);

    const copyToClipBoard = React.useCallback(
        async (text: string) => {
            try {
                await navigator.clipboard.writeText(text);
                setHasError(false);
                setShowStatus(true);
                onCopySuccess();
            } catch (err) {
                setHasError(true);
                setShowStatus(true);
                onCopyFail();
            } finally {
                setTimeout(() => {
                    setShowStatus(false);
                    setHasError(false);
                }, 1500);
            }
        },
        [onCopyFail, onCopySuccess]
    );

    const handleOnClick = React.useCallback(
        (e: React.MouseEvent) => {
            onClick?.(e);
            copyToClipBoard(textToCopy);
        },
        [copyToClipBoard, onClick, textToCopy]
    );

    return (
        <>
            {showStatus ? (
                <CopyToClipboardStatus
                    iconSize={iconSize}
                    showStatusText={showStatusText}
                    alertSx={alertSx}
                    hasError={hasError}
                />
            ) : (
                <IconButton
                    onClick={handleOnClick}
                    size={buttonSize}
                    sx={buttonSx}
                >
                    <CopyIcon size={iconSize} color={iconColor} />
                </IconButton>
            )}
        </>
    );
};
