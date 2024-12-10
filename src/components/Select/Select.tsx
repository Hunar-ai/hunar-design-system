import * as React from 'react';

import { uniqBy } from 'lodash';

import {
    Autocomplete,
    Chip,
    TextField,
    type AutocompleteProps,
    type AutocompleteChangeReason,
    type AutocompleteRenderGetTagProps,
    type OutlinedInputProps,
    type SxProps
} from '@mui/material';

import { SelectOption } from './SelectOption';

import type { OptionsProps, OptionProps } from '@/interfaces';
import { FIELD_SIZE, SELECT_OPTION_TYPE } from '@/Enum';

type BaseAutocompleteProps = AutocompleteProps<
    OptionProps,
    boolean,
    boolean,
    false
>;

export interface SelectProps {
    id: string;
    label: string;
    name: string;
    options: OptionsProps;
    value?: BaseAutocompleteProps['value'];
    placeholder?: string;
    inputValue?: string;
    autoComplete?: string;
    defaultValue?: BaseAutocompleteProps['defaultValue'];
    disabledOptions?: OptionsProps;
    fixedOptions?: OptionsProps;
    hasError?: boolean;
    helperText?: React.ReactNode;
    inputProps?: Partial<OutlinedInputProps>;
    isAutoFocusEnabled?: boolean;
    isBlurOnSelect?: boolean;
    isClearDisabled?: boolean;
    isClearOnBlur?: boolean;
    isDisabled?: boolean;
    isFilterable?: boolean;
    isFreeSolo?: boolean;
    isMultiple?: boolean;
    isPortalDisabled?: boolean;
    isRequired?: boolean;
    limitTags?: number;
    optionType?: SELECT_OPTION_TYPE;
    size?: FIELD_SIZE;
    ListboxProps?: BaseAutocompleteProps['ListboxProps'];
    sx?: SxProps;
    onChange: NonNullable<BaseAutocompleteProps['onChange']>;
    onBlur?: BaseAutocompleteProps['onBlur'];
    onInputChange?: BaseAutocompleteProps['onInputChange'];
    onNewClick?: () => void;
    onOpen?: (e: React.SyntheticEvent) => void;
}

export const Select = ({
    id = '',
    label,
    name,
    options,
    inputValue,
    value,
    placeholder = '',
    autoComplete = 'off',
    defaultValue = undefined,
    disabledOptions = [],
    fixedOptions = [],
    hasError = false,
    helperText = '',
    inputProps = {},
    isAutoFocusEnabled = false,
    isBlurOnSelect = false,
    isClearDisabled = false,
    isClearOnBlur = true,
    isDisabled = false,
    isFilterable = true,
    isMultiple = false,
    isPortalDisabled = false,
    isRequired = false,
    limitTags = 1,
    optionType = SELECT_OPTION_TYPE.CHECKBOX,
    size = FIELD_SIZE.medium,
    ListboxProps = {},
    sx = {},
    onChange,
    onBlur,
    onInputChange,
    onNewClick,
    onOpen
}: SelectProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

    const renderTags = React.useCallback(
        (tags: OptionsProps, getTagProps: AutocompleteRenderGetTagProps) =>
            tags.map((tag, index) => {
                const { key, ...restProps } = getTagProps({ index });
                const isFixed = fixedOptions.some(
                    fixedOption => fixedOption.value === tag.value
                );
                return (
                    <Chip
                        key={key}
                        label={tag.label}
                        {...restProps}
                        deleteIcon={isFixed ? <></> : undefined}
                    />
                );
            }),
        [fixedOptions]
    );

    const getDisabledOption = React.useCallback(
        (option: OptionProps) =>
            [...fixedOptions, ...disabledOptions].some(
                element => element.value === option.value
            ),
        [disabledOptions, fixedOptions]
    );

    const handleDropdownOpen = React.useCallback(
        (e: React.SyntheticEvent) => {
            onOpen?.(e);
            setIsDropdownOpen(true);
        },
        [onOpen]
    );

    const handleSelectChange = React.useCallback(
        (
            e: React.SyntheticEvent,
            value: OptionProps | OptionsProps | null,
            reason: AutocompleteChangeReason
        ) => {
            if (
                fixedOptions.length &&
                (reason === 'clear' || reason === 'removeOption') &&
                Array.isArray(value)
            ) {
                const selectedOptions = uniqBy(
                    [...fixedOptions, ...value],
                    option => option.value
                );
                onChange(e, selectedOptions, reason);
            } else {
                onChange(e, value, reason);
            }
        },
        [fixedOptions, onChange]
    );

    const handleNewClick = React.useCallback(() => {
        setIsDropdownOpen(false);
        onNewClick?.();
    }, [onNewClick]);

    return (
        <Autocomplete
            open={isDropdownOpen}
            onOpen={handleDropdownOpen}
            onClose={() => setIsDropdownOpen(false)}
            sx={sx}
            disablePortal={isPortalDisabled}
            size={size}
            autoComplete={false}
            fullWidth
            disableCloseOnSelect={isMultiple}
            limitTags={limitTags}
            id={id}
            defaultValue={defaultValue}
            disableClearable={isClearDisabled}
            multiple={isMultiple}
            options={options}
            onInputChange={onInputChange}
            onChange={handleSelectChange}
            onBlur={onBlur}
            getOptionLabel={option => option.label || ''}
            value={value}
            clearOnBlur={isClearOnBlur}
            disabled={isDisabled}
            ListboxProps={ListboxProps}
            blurOnSelect={isBlurOnSelect}
            renderTags={fixedOptions.length ? renderTags : undefined}
            getOptionDisabled={getDisabledOption}
            filterOptions={!isFilterable ? options => options : undefined}
            renderOption={(liProps, option, { selected }) => (
                <SelectOption
                    key={option.value}
                    liProps={liProps}
                    option={option}
                    optionType={optionType}
                    isMultiple={isMultiple}
                    isSelected={selected}
                    isAutoFocusEnabled={isAutoFocusEnabled}
                    onNewClick={handleNewClick}
                />
            )}
            inputValue={inputValue}
            renderInput={params => {
                return (
                    <TextField
                        {...params}
                        InputProps={{ ...params.InputProps, ...inputProps }}
                        autoComplete={autoComplete}
                        id={id}
                        error={hasError}
                        helperText={helperText}
                        required={isRequired}
                        placeholder={placeholder}
                        fullWidth
                        label={label}
                        autoFocus={isAutoFocusEnabled}
                        size={size}
                        name={name}
                    />
                );
            }}
        />
    );
};
