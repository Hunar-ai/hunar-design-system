import React from 'react';

import { Grid, type SxProps, useTheme } from '@mui/material';

import { EditableTextFieldPreview } from './EditableTextFieldPreview';
import { EditableTextFieldCtaList } from './EditableTextFieldCtaList';
import { EditableTextInput } from './EditableTextInput';

import { BUTTON_SIZE, TEXT_INPUT_VARIANT, FIELD_SIZE } from '@/Enum';
import { NumberUtils } from '@/utils/NumberUtils';

export interface EditableTextFieldProps {
    name: string;
    value: string;
    id: string;
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
    onEditStart?: () => void;
    onEditEnd?: () => void;
    handleIsValidCheck?: (_: string) => boolean;
}

export const EditableTextField = ({
    name,
    value,
    id,
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
    onEditStart = () => undefined,
    onEditEnd = () => undefined,
    handleIsValidCheck = undefined
}: EditableTextFieldProps) => {
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

    const formattedPreviewText = React.useMemo(() => {
        return variant === TEXT_INPUT_VARIANT.CURRENCY
            ? NumberUtils.toINR(parseInt(value))
            : value;
    }, [value, variant]);

    const onFieldChange = (e: React.BaseSyntheticEvent) => {
        setEditedValue(e.target.value);
    };

    const handleEditStart = () => {
        onEditStart();
        setIsEditing(true);
    };

    const handleEditEnd = () => {
        onEditEnd();
        setIsEditing(false);
    };

    const onBlur = () => {
        if (!value && !editedValue) {
            handleEditEnd();
        }
    };

    const handleCancelClick = () => {
        handleEditEnd();
        setEditedValue(value);
    };

    const handleSaveClick = () => {
        handleEditEnd();
        onSave(editedValue);
    };

    return (
        <Grid container rowGap={0.5} justifyContent="end">
            {!value || isEditing ? (
                <EditableTextInput
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
                    onFocus={handleEditStart}
                    onBlur={onBlur}
                />
            ) : (
                <EditableTextFieldPreview
                    previewText={formattedPreviewText}
                    fieldSize={fieldSize}
                    sx={previewSx}
                    isDisabled={disabled}
                    onEditClick={handleEditStart}
                />
            )}
            {isEditing && (
                <EditableTextFieldCtaList
                    buttonSize={buttonSize}
                    primaryColor={selectedPrimaryColor}
                    isCancelDisabled={!editedValue || hasErrors || disabled}
                    isSaveDisabled={!editedValue || hasErrors || disabled}
                    onCancelClick={handleCancelClick}
                    onSaveClick={handleSaveClick}
                />
            )}
        </Grid>
    );
};
