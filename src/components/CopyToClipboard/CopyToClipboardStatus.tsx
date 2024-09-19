import React from 'react';

import { Alert, type SxProps } from '@mui/material';

import { AppTooltip } from '@/components/AppTooltip';
import { CopyToClipboardStatusIcon } from './CopyToClipboardStatusIcon';

interface CopyToClipboardStatusProps {
    iconSize: number;
    showStatusText: boolean;
    alertSx: SxProps;
    hasError: boolean;
}

export const CopyToClipboardStatus = ({
    iconSize,
    showStatusText,
    alertSx,
    hasError
}: CopyToClipboardStatusProps) => {
    const statusText = React.useMemo(
        () => (hasError ? 'Retry' : 'Copied'),
        [hasError]
    );

    return (
        <AppTooltip title={statusText}>
            <Alert
                sx={alertSx}
                severity={hasError ? 'error' : 'success'}
                icon={
                    <CopyToClipboardStatusIcon
                        hasError={hasError}
                        iconSize={iconSize}
                    />
                }
            >
                {showStatusText && statusText}
            </Alert>
        </AppTooltip>
    );
};
