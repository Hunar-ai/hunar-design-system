import {
    type AutocompleteChangeReason,
    type SxProps,
    TextField
} from '@mui/material';

import { Select } from '@/components/Select';

import { useFormUtils } from '@/hooks/useFormUtils';

import { FIELD_SIZE } from '@/Enum';
import type { OptionProps, OptionsProps } from '@/interfaces';

export interface AdaptiveSelectProps {
    label: string;
    name: string;
    id: string;
    options: OptionsProps;
    value: string;
    selectPlaceHolder?: string;
    textInputPlaceHolder?: string;
    isRequired?: boolean;
    isDisabled?: boolean;
    size?: FIELD_SIZE;
    limitTags?: number;
    sx?: SxProps;
    helperText?: React.ReactNode;
    hasError?: boolean;
    onSelectChange: (
        _: React.SyntheticEvent,
        __: OptionProps | null,
        reason: AutocompleteChangeReason
    ) => void;
    onTextInputChange: (_: React.ChangeEvent<HTMLInputElement>) => void;
    onSelectOpen?: (_: React.SyntheticEvent) => void;
    onTextInputClick?: (_: React.MouseEvent<HTMLDivElement>) => void;
}

export const AdaptiveSelect = ({
    label,
    name,
    id,
    options,
    value,
    selectPlaceHolder = '',
    textInputPlaceHolder = '',
    isRequired = false,
    isDisabled = false,
    size = FIELD_SIZE.medium,
    limitTags = undefined,
    sx = {},
    helperText = undefined,
    hasError = false,
    onSelectChange,
    onTextInputChange,
    onSelectOpen,
    onTextInputClick
}: AdaptiveSelectProps) => {
    const { getSelectedOption } = useFormUtils();

    const handleSelectChange = (
        e: React.SyntheticEvent,
        selectedOption: OptionsProps | OptionProps | null,
        reason: AutocompleteChangeReason
    ) => {
        if (Array.isArray(selectedOption)) return;

        onSelectChange(e, selectedOption, reason);
    };

    return (
        <>
            {options.length > 0 ? (
                <Select
                    isRequired={isRequired}
                    label={label}
                    name={name}
                    id={id}
                    placeholder={selectPlaceHolder}
                    size={size}
                    limitTags={limitTags}
                    isDisabled={isDisabled}
                    options={options}
                    value={getSelectedOption({
                        options,
                        fieldValue: value
                    })}
                    sx={sx}
                    helperText={helperText}
                    hasError={hasError}
                    onChange={handleSelectChange}
                    onOpen={onSelectOpen}
                />
            ) : (
                <TextField
                    fullWidth
                    name={name}
                    id={id}
                    label={label}
                    placeholder={textInputPlaceHolder}
                    size={size}
                    disabled={isDisabled}
                    required={isRequired}
                    value={value}
                    sx={sx}
                    helperText={helperText}
                    error={hasError}
                    onChange={onTextInputChange}
                    onClick={onTextInputClick}
                />
            )}
        </>
    );
};
