import React from 'react';

import {
    Alert,
    alpha,
    IconButton,
    useTheme,
    type SxProps
} from '@mui/material';
import {
    ContentCopy as ContentCopyIcon,
    Check as CheckIcon
} from '@mui/icons-material';
import { blue, grey } from '@mui/material/colors';

import { AppTooltip } from '@/components/AppTooltip';

import { BUTTON_SIZE } from '@/Enum';

const alertPaddingMap = {
    [BUTTON_SIZE.small]: '5px',
    [BUTTON_SIZE.medium]: '8px',
    [BUTTON_SIZE.large]: '12px'
};

export interface CopyToClipboardProps {
    textToCopy: string;
    showCopiedMsg?: boolean;
    isOutlined?: boolean;
    buttonSize?: BUTTON_SIZE;
    iconFontSize?: number;
    iconSx?: SxProps;
    onClick?: (_: React.MouseEvent) => void;
}

export const CopyToClipboard = ({
    textToCopy,
    showCopiedMsg = true,
    isOutlined = false,
    buttonSize = BUTTON_SIZE.medium,
    iconFontSize = 24,
    iconSx = {},
    onClick = () => undefined
}: CopyToClipboardProps) => {
    const theme = useTheme();

    const [copyMessage, setCopyMessage] = React.useState('');
    const [hasError, setHasError] = React.useState(false);

    const alertSx: SxProps = React.useMemo(() => {
        return {
            width: 'min-content',
            height: 'fit-content',
            '& .MuiAlert-message': { py: 0, lineHeight: 1.2 },
            '& .MuiAlert-icon': {
                mr: showCopiedMsg ? undefined : 0,
                py: 0
            },
            p: alertPaddingMap[buttonSize],
            alignItems: 'center',
            border: isOutlined ? `1px solid ${grey[200]}` : undefined
        };
    }, [isOutlined, showCopiedMsg, buttonSize]);

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

    const copyToClipBoard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setHasError(false);
            setCopyMessage('Copied');
        } catch (err) {
            setHasError(true);
            setCopyMessage('Retry');
        } finally {
            setTimeout(() => {
                setCopyMessage('');
                setHasError(false);
            }, 1500);
        }
    };

    const handleOnClick = (e: React.MouseEvent) => {
        onClick?.(e);
        copyToClipBoard(textToCopy);
    };

    return (
        <>
            {copyMessage ? (
                <AppTooltip title={copyMessage}>
                    <Alert
                        sx={alertSx}
                        severity={hasError ? 'error' : 'success'}
                        icon={
                            hasError ? undefined : (
                                <CheckIcon sx={{ fontSize: iconFontSize }} />
                            )
                        }
                    >
                        {showCopiedMsg && copyMessage}
                    </Alert>
                </AppTooltip>
            ) : (
                <IconButton
                    onClick={handleOnClick}
                    size={buttonSize}
                    sx={buttonSx}
                >
                    <ContentCopyIcon
                        sx={{ ...iconSx, fontSize: iconFontSize }}
                    />
                </IconButton>
            )}
        </>
    );
};
