import React from 'react';

import { type SxProps, TextField } from '@mui/material';

import { CurrencyField } from '@/components/CurrencyField';
import { HelperText } from '@/components/HelperText';

import { FIELD_SIZE, TEXT_INPUT_VARIANT } from '@/Enum';

interface EditableTextInputProps {
    name: string;
    value: string;
    variant: TEXT_INPUT_VARIANT;
    id: string;
    label: string;
    required: boolean;
    disabled: boolean;
    primaryColor: string;
    placeholder: string;
    fieldSize: FIELD_SIZE;
    error: boolean;
    errorMsg: string;
    helperMsg: string;
    textFieldType: React.HTMLInputTypeAttribute;
    inputFieldSx: SxProps;
    onFieldChange: (_: React.BaseSyntheticEvent) => void;
    onFocus: VoidFunction;
    onBlur: VoidFunction;
}

export const EditableTextInput = ({
    name,
    value,
    variant,
    id,
    label,
    required,
    disabled,
    primaryColor,
    placeholder,
    fieldSize,
    error,
    errorMsg,
    helperMsg,
    textFieldType,
    inputFieldSx,
    onFieldChange,
    onFocus,
    onBlur
}: EditableTextInputProps) => {
    const borderColorSx = React.useMemo(() => {
        return {
            '& .MuiInputBase-root.Mui-focused fieldset': {
                borderColor: error ? undefined : primaryColor
            }
        };
    }, [error, primaryColor]);

    switch (variant) {
        case TEXT_INPUT_VARIANT.CURRENCY:
            return (
                <CurrencyField
                    fullWidth
                    name={name}
                    id={id}
                    label={label}
                    required={required}
                    disabled={disabled}
                    sx={{ ...borderColorSx, ...inputFieldSx }}
                    value={value}
                    size={fieldSize}
                    placeholder={placeholder}
                    onChange={onFieldChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    error={error}
                    helperText={
                        <HelperText
                            hasError={error}
                            errorMsg={errorMsg}
                            msg={helperMsg}
                        />
                    }
                />
            );
        case TEXT_INPUT_VARIANT.TEXT_FIELD:
        default:
            return (
                <TextField
                    type={textFieldType}
                    fullWidth
                    name={name}
                    id={id}
                    label={label}
                    required={required}
                    disabled={disabled}
                    value={value}
                    sx={{ ...borderColorSx, ...inputFieldSx }}
                    size={fieldSize}
                    placeholder={placeholder}
                    onChange={onFieldChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    error={error}
                    helperText={
                        <HelperText
                            hasError={error}
                            errorMsg={errorMsg}
                            msg={helperMsg}
                        />
                    }
                />
            );
    }
};
