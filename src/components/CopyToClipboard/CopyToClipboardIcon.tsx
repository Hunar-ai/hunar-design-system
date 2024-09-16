import {
    Check as CheckIcon,
    WarningCircle as WarningCircleIcon
} from '@phosphor-icons/react';

interface CopyToClipboardIconProps {
    hasError: boolean;
    iconSize: number;
}

export const CopyToClipboardIcon = ({
    hasError,
    iconSize
}: CopyToClipboardIconProps) => {
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
