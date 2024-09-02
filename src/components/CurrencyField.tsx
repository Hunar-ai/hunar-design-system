import {
    NumericFormat,
    type NumericFormatProps,
    type NumberFormatValues as NumberFormatValuesProps,
    type SourceInfo as SourceInfoProps
} from 'react-number-format';

import { InputAdornment, SxProps, TextField } from '@mui/material';

import { FIELD_SIZE } from '@/Enum';

interface CurrencyFieldProps {
    id: string;
    name: string;
    value: string | number | null;
    label?: string;
    required?: boolean;
    placeholder?: string;
    sx?: SxProps;
    size?: FIELD_SIZE;
    disabled?: boolean;
    fullWidth?: boolean;
    error?: boolean;
    helperText?: React.ReactNode;
    decimalScale?: number;
    allowNegative?: boolean;
    thousandsGroupStyle?: NumericFormatProps['thousandsGroupStyle'];
    onChange?: (_: React.BaseSyntheticEvent) => void;
    onFocus?: (_: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (_: React.FocusEvent<HTMLInputElement>) => void;
    onClick?: (_: React.MouseEvent<HTMLInputElement>) => void;
    handleIsValidCheck?: (_: string) => boolean;
}

export const CurrencyField = ({
    id,
    name,
    value,
    label = '',
    placeholder = '00,00,000',
    sx = {},
    size = FIELD_SIZE.medium,
    disabled = false,
    required = false,
    fullWidth = false,
    error = false,
    helperText = '',
    decimalScale = 0,
    allowNegative = false,
    thousandsGroupStyle = 'lakh',
    onChange = () => undefined,
    onFocus = () => undefined,
    onBlur = () => undefined,
    onClick = () => undefined,
    handleIsValidCheck = () => true
}: CurrencyFieldProps) => {
    const onValueChange = (
        modifiedValues: NumberFormatValuesProps,
        sourceInfo: SourceInfoProps
    ) => {
        if (sourceInfo.source === 'prop') return;

        const event = {
            target: { name, value: modifiedValues.value }
        } as React.BaseSyntheticEvent;
        onChange(event);
    };

    return (
        <NumericFormat
            id={id}
            name={name}
            label={label}
            required={required}
            placeholder={placeholder}
            fullWidth={fullWidth}
            sx={sx}
            size={size}
            value={`${value ?? ''}`}
            disabled={disabled}
            onFocus={onFocus}
            onBlur={onBlur}
            onClick={onClick}
            onValueChange={onValueChange}
            error={error}
            helperText={helperText}
            customInput={TextField}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                )
            }}
            isAllowed={modifiedValues =>
                handleIsValidCheck(modifiedValues.value)
            }
            valueIsNumericString
            decimalScale={decimalScale}
            allowNegative={allowNegative}
            thousandSeparator=","
            thousandsGroupStyle={thousandsGroupStyle}
        />
    );
};
