import React from 'react';

import { type SxProps, useTheme } from '@mui/material';
import { FilePlus } from '@phosphor-icons/react';

import { CustomButton } from '@/components/CustomButton';
import { UploadFilenamePreview } from './UploadFilenamePreview';

import { ALLOWED_EXTENSION, BUTTON_SIZE } from '@/Enum';

const SUCCESS_ICON_VISIBLE_DURATION = 750;

export interface UploadButtonProps {
    name: string;
    value: string;
    title: string;
    acceptFileType: Array<ALLOWED_EXTENSION>;
    primaryColor?: string;
    size?: BUTTON_SIZE;
    filenameMaxLength?: number;
    isLoading?: boolean;
    isDisabled?: boolean;
    isFullWidth?: boolean;
    isStartIconVisible?: boolean;
    hasError?: boolean;
    buttonSx?: SxProps;
    filenamePreviewSx?: SxProps;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: (_: string) => void;
}

export const UploadButton = ({
    name,
    value,
    title,
    acceptFileType,
    primaryColor,
    size = BUTTON_SIZE.medium,
    filenameMaxLength = 28,
    isLoading = false,
    isDisabled = false,
    isFullWidth = false,
    isStartIconVisible = true,
    hasError = false,
    buttonSx = {},
    filenamePreviewSx = {},
    onChange,
    onRemove
}: UploadButtonProps) => {
    const theme = useTheme();

    const [isSuccessIconVisible, setIsSuccessIconVisible] =
        React.useState(false);

    React.useEffect(() => {
        let successTimeout: NodeJS.Timeout;

        if (!isLoading && value) {
            setIsSuccessIconVisible(true);
            successTimeout = setTimeout(() => {
                setIsSuccessIconVisible(false);
            }, SUCCESS_ICON_VISIBLE_DURATION);
        }

        return () => {
            clearTimeout(successTimeout);
        };
    }, [isLoading, value]);

    const selectedPrimaryColor = React.useMemo(() => {
        return primaryColor ?? theme.palette.primary.main;
    }, [primaryColor, theme.palette.primary.main]);

    const formattedFilename = React.useMemo(() => {
        if (value.length <= filenameMaxLength) return value;

        const extension = value.slice(value.lastIndexOf('.'), value.length);
        const shortenedFilename = value.slice(
            value.lastIndexOf('/') + 1,
            value.lastIndexOf('/') + filenameMaxLength - extension.length - 1
        );
        const formattedFilename = `${shortenedFilename}...${extension}`;
        return formattedFilename;
    }, [value, filenameMaxLength]);

    return (
        <>
            {value ? (
                <UploadFilenamePreview
                    size={size}
                    isStartIconVisible={isStartIconVisible}
                    filename={formattedFilename}
                    isLoading={isLoading}
                    isDisabled={isDisabled}
                    hasError={hasError}
                    isSuccessIconVisible={isSuccessIconVisible}
                    onRemove={() => onRemove(name)}
                    sx={filenamePreviewSx}
                />
            ) : (
                <CustomButton
                    size={size}
                    variant="outlined"
                    component="label"
                    isDisabled={isDisabled}
                    isFullWidth={isFullWidth}
                    hasError={hasError}
                    sx={buttonSx}
                    primaryColor={selectedPrimaryColor}
                    startIcon={isStartIconVisible ? <FilePlus /> : null}
                >
                    {title}
                    <input
                        type="file"
                        hidden
                        onChange={onChange}
                        name={`${name}`}
                        accept={acceptFileType?.join(',')}
                    />
                </CustomButton>
            )}
        </>
    );
};
