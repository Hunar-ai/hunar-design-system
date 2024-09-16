import { Alert, type SxProps } from '@mui/material';

import { AppTooltip } from '@/components/AppTooltip';
import { CopyToClipboardStatusIcon } from './CopyToClipboardStatusIcon';

interface CopyToClipboardStatusProps {
    iconSize: number;
    statusText: string;
    showStatusText: boolean;
    alertSx: SxProps;
    hasError: boolean;
}

export const CopyToClipboardStatus = ({
    iconSize,
    statusText,
    showStatusText,
    alertSx,
    hasError
}: CopyToClipboardStatusProps) => {
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
