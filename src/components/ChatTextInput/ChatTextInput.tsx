import React from 'react';

import { Grid, type SxProps, useTheme } from '@mui/material';

import { ChatTextInputPreview } from './ChatTextInputPreview';
import { ChatTextInputCtaList } from './ChatTextInputCtaList';
import { ChatTextInputField } from './ChatTextInputField';

import { BUTTON_SIZE, TEXT_INPUT_VARIANT, FIELD_SIZE } from '@/Enum';

export interface ChatTextInputProps {
    name: string;
    value: string;
    id?: string;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    primaryColor?: string;
    variant?: TEXT_INPUT_VARIANT;
    placeholder?: string;
    fieldSize?: FIELD_SIZE;
    buttonSize?: BUTTON_SIZE;
    errorMsg?: string;
    helperMsg?: string;
    textFieldType?: React.HTMLInputTypeAttribute;
    inputFieldSx?: SxProps;
    previewSx?: SxProps;
    onSave: (_: string) => void;
    handleIsValidCheck?: (_: string) => boolean;
}

export const ChatTextInput = ({
    name,
    value,
    id = '',
    label = '',
    required = false,
    disabled = false,
    primaryColor = undefined,
    variant = TEXT_INPUT_VARIANT.TEXT_FIELD,
    placeholder = 'Type here...',
    fieldSize = FIELD_SIZE.small,
    buttonSize = BUTTON_SIZE.large,
    errorMsg = '',
    helperMsg = '',
    textFieldType = 'text',
    inputFieldSx = {},
    previewSx = {},
    onSave,
    handleIsValidCheck = undefined
}: ChatTextInputProps) => {
    const theme = useTheme();
    const [editedValue, setEditedValue] = React.useState(value);
    const [isEditing, setIsEditing] = React.useState(false);

    const hasErrors = React.useMemo(() => {
        return handleIsValidCheck ? handleIsValidCheck(editedValue) : false;
    }, [editedValue, handleIsValidCheck]);

    const selectedPrimaryColor = React.useMemo(
        () => primaryColor || theme.palette.primary.main,
        [primaryColor, theme.palette.primary.main]
    );

    const onFieldChange = (e: React.BaseSyntheticEvent) => {
        setEditedValue(e.target.value);
    };

    const onFocus = () => setIsEditing(true);

    const onBlur = () => {
        if (!value && !editedValue) {
            setIsEditing(false);
        }
    };

    const handleCancelClick = () => {
        setEditedValue(value);
        setIsEditing(false);
    };

    const handleSaveClick = () => {
        onSave(editedValue);
        setIsEditing(false);
    };

    return (
        <Grid container rowGap={0.5} justifyContent="end">
            {!value || isEditing ? (
                <ChatTextInputField
                    id={id}
                    name={name}
                    label={label}
                    variant={variant}
                    required={required}
                    disabled={disabled}
                    primaryColor={selectedPrimaryColor}
                    value={editedValue}
                    fieldSize={fieldSize}
                    placeholder={placeholder}
                    error={hasErrors}
                    errorMsg={errorMsg}
                    helperMsg={helperMsg}
                    textFieldType={textFieldType}
                    inputFieldSx={inputFieldSx}
                    onFieldChange={onFieldChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            ) : (
                <ChatTextInputPreview
                    value={value}
                    fieldSize={fieldSize}
                    variant={variant}
                    sx={previewSx}
                    onEditClick={() => setIsEditing(true)}
                />
            )}
            {isEditing && (
                <ChatTextInputCtaList
                    buttonSize={buttonSize}
                    primaryColor={selectedPrimaryColor}
                    isCancelDisabled={!editedValue || hasErrors}
                    isSaveDisabled={!editedValue || hasErrors}
                    onCancelClick={handleCancelClick}
                    onSaveClick={handleSaveClick}
                />
            )}
        </Grid>
    );
};
