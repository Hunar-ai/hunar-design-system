import React from 'react';

import { Grid, type SxProps, useTheme } from '@mui/material';

import { EditableTextFieldPreview } from '@/components/EditableTextField/EditableTextFieldPreview';
import { EditableTextFieldCtaList } from '@/components/EditableTextField/EditableTextFieldCtaList';
import { HelperText } from '@/components/HelperText';
import { TextArea } from '@/components/TextArea';

import { BUTTON_SIZE, FIELD_SIZE } from '@/Enum';

export interface EditableTextAreaProps {
    name: string;
    value: string;
    id: string;
    required?: boolean;
    disabled?: boolean;
    primaryColor?: string;
    placeholder?: string;
    fieldSize?: FIELD_SIZE;
    buttonSize?: BUTTON_SIZE;
    errorMsg?: string;
    helperMsg?: string;
    inputFieldSx?: SxProps;
    previewSx?: SxProps;
    onSave: (_: string) => void;
    onEditStart?: () => void;
    onEditEnd?: () => void;
    handleIsValidCheck?: (_: string) => boolean;
}

export const EditableTextArea = ({
    name,
    value,
    id,
    required = false,
    disabled = false,
    primaryColor = undefined,
    placeholder = 'Type here...',
    fieldSize = FIELD_SIZE.small,
    buttonSize = BUTTON_SIZE.large,
    errorMsg = '',
    helperMsg = '',
    inputFieldSx = {},
    previewSx = {},
    onSave,
    onEditStart = () => undefined,
    onEditEnd = () => undefined,
    handleIsValidCheck = undefined
}: EditableTextAreaProps) => {
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

    const onFocus = () => {
        onEditStart();
        setIsEditing(true);
    };

    const onBlur = () => {
        if (!value && !editedValue) {
            onEditEnd();
            setIsEditing(false);
        }
    };

    const onEditClick = () => {
        onEditStart();
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        onEditEnd();
        setEditedValue(value);
        setIsEditing(false);
    };

    const handleSaveClick = () => {
        onEditEnd();
        onSave(editedValue);
        setIsEditing(false);
    };

    return (
        <Grid container rowGap={0.5} justifyContent="end">
            {!value || isEditing ? (
                <TextArea
                    fullWidth
                    id={id}
                    name={name}
                    required={required}
                    disabled={disabled}
                    primaryColor={selectedPrimaryColor}
                    value={editedValue}
                    placeholder={placeholder}
                    error={hasErrors}
                    sx={inputFieldSx}
                    onChange={onFieldChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    helperText={
                        <HelperText
                            hasError={hasErrors}
                            errorMsg={errorMsg}
                            msg={helperMsg}
                        />
                    }
                />
            ) : (
                <EditableTextFieldPreview
                    previewText={value}
                    fieldSize={fieldSize}
                    isDisabled={disabled}
                    sx={previewSx}
                    onEditClick={onEditClick}
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
