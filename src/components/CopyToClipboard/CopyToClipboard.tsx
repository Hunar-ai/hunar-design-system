import React from 'react';

import IconButton from '@mui/material/IconButton';
import { type SxProps } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import Alert from '@mui/material/Alert';
import { AppTooltip } from '@/components/AppTooltip';

export interface CopyToClipboardProps {
    textToCopy: string;
    padding?: number;
    showCopiedText?: boolean;
    size?: 'medium' | 'small';
    fontSize?: 'medium' | 'small';
    buttonSx?: SxProps;
    iconSx?: SxProps;
    onClick?: (_: React.MouseEvent) => void;
}

export const CopyToClipboard = ({
    textToCopy,
    padding = 4,
    showCopiedText = true,
    size = 'medium',
    fontSize = 'medium',
    buttonSx = {},
    iconSx = {},
    onClick = () => undefined
}: CopyToClipboardProps) => {
    const [copyMessage, setCopyMessage] = React.useState('');
    const [isError, setIsError] = React.useState(false);

    const copyToClipBoard = async (copyMe: string) => {
        try {
            await navigator.clipboard.writeText(copyMe);
            setIsError(false);
            setCopyMessage('Copied');
        } catch (err) {
            setIsError(true);
            setCopyMessage('Retry');
        } finally {
            setTimeout(() => {
                setCopyMessage('');
                setIsError(false);
            }, 1500);
        }
    };

    const handleOnClick = (e: React.MouseEvent) => {
        onClick?.(e);
        copyToClipBoard(textToCopy);
    };

    const sx = showCopiedText
        ? {
              width: '100%',
              py: 0
          }
        : {
              py: padding,
              '& .MuiAlert-icon': {
                  mr: 0,
                  fontSize: size === 'small' ? 14 : 16
              },
              '& .MuiAlert-message': {
                  py: { padding }
              },
              alignItems: 'center',
              width: 32,
              justifyContent: 'center',
              height: 32
          };

    return (
        <>
            {copyMessage ? (
                <AppTooltip title={copyMessage}>
                    <Alert sx={sx} severity={isError ? 'error' : 'success'}>
                        {showCopiedText && copyMessage}
                    </Alert>
                </AppTooltip>
            ) : (
                <IconButton onClick={handleOnClick} size={size} sx={buttonSx}>
                    <ContentCopyIcon fontSize={fontSize} sx={iconSx} />
                </IconButton>
            )}
        </>
    );
};
