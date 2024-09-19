import {
    Check as CheckIcon,
    WarningCircle as WarningCircleIcon
} from '@phosphor-icons/react';

interface CopyToClipboardStatusIconProps {
    hasError: boolean;
    iconSize: number;
}

export const CopyToClipboardStatusIcon = ({
    hasError,
    iconSize
}: CopyToClipboardStatusIconProps) => {
    return (
        <>
            {hasError ? (
                <WarningCircleIcon size={iconSize} />
            ) : (
                <CheckIcon size={iconSize} />
            )}
        </>
    );
};
