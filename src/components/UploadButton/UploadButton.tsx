import React from 'react';

import { type SxProps, useTheme } from '@mui/material';
import { FilePlus } from '@phosphor-icons/react';

import { CustomButton } from '@/components/CustomButton';
import { UploadFileNamePreview } from './UploadFileNamePreview';

import { ALLOWED_EXTENSION, BUTTON_SIZE } from '@/Enum';

const SUCCESS_ICON_VISIBLE_DURATION = 750;

export interface UploadButtonProps {
    name: string;
    fileName: string;
    title: string;
    acceptFileType: Array<ALLOWED_EXTENSION>;
    primaryColor?: string;
    size?: BUTTON_SIZE;
    fileNameMaxLength?: number;
    isLoading?: boolean;
    isDisabled?: boolean;
    isFullWidth?: boolean;
    isStartIconVisible?: boolean;
    hasError?: boolean;
    buttonSx?: SxProps;
    fileNamePreviewSx?: SxProps;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: (_: string) => void;
}

export const UploadButton = ({
    name,
    fileName,
    title,
    acceptFileType,
    primaryColor,
    size = BUTTON_SIZE.medium,
    fileNameMaxLength = 28,
    isLoading = false,
    isDisabled = false,
    isFullWidth = false,
    isStartIconVisible = true,
    hasError = false,
    buttonSx = {},
    fileNamePreviewSx = {},
    onChange,
    onRemove
}: UploadButtonProps) => {
    const theme = useTheme();

    const [isSuccessIconVisible, setIsSuccessIconVisible] =
        React.useState(false);

    React.useEffect(() => {
        let successTimeout: NodeJS.Timeout;

        if (!isLoading && fileName) {
            setIsSuccessIconVisible(true);
            successTimeout = setTimeout(() => {
                setIsSuccessIconVisible(false);
            }, SUCCESS_ICON_VISIBLE_DURATION);
        }

        return () => {
            clearTimeout(successTimeout);
        };
    }, [isLoading, fileName]);

    const selectedPrimaryColor = React.useMemo(() => {
        return primaryColor ?? theme.palette.primary.main;
    }, [primaryColor, theme.palette.primary.main]);

    const formattedFileName = React.useMemo(() => {
        if (fileName.length <= fileNameMaxLength) return fileName;

        const extension = fileName.slice(
            fileName.lastIndexOf('.'),
            fileName.length
        );
        const shortenedFileName = fileName.slice(
            fileName.lastIndexOf('/') + 1,
            fileName.lastIndexOf('/') + fileNameMaxLength - extension.length - 1
        );
        const formattedFileName = `${shortenedFileName}...${extension}`;
        return formattedFileName;
    }, [fileName, fileNameMaxLength]);

    return (
        <>
            {fileName ? (
                <UploadFileNamePreview
                    size={size}
                    isStartIconVisible={isStartIconVisible}
                    fileName={formattedFileName}
                    isLoading={isLoading}
                    isDisabled={isDisabled}
                    hasError={hasError}
                    isSuccessIconVisible={isSuccessIconVisible}
                    onRemove={() => onRemove(name)}
                    sx={fileNamePreviewSx}
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
