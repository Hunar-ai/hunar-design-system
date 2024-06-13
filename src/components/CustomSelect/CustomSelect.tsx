import React from 'react';

import tinycolor from 'tinycolor2';

import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    type SxProps,
    type MenuProps,
    FormHelperText,
    useTheme
} from '@mui/material';
import { grey } from '@mui/material/colors';

import { CustomSelectFooter } from './CustomSelectFooter';
import { CustomSelectHeader } from './CustomSelectHeader';
import { CustomSelectOption } from './CustomSelectOption';
import { CustomSelectNoOptionsText } from './CustomSelectNoOptionsText';

import { useHelper } from '@/hooks/useHelper';
import { useIsMobile } from '@/hooks/useIsMobile';

import type { Option, Options } from '@/interfaces';
import { FIELD_SIZE } from '@/Enum';
import { BACKDROP_BG_COLOR } from '@/Constants';

export interface CustomSelectProps {
    label: string;
    name: string;
    options: Options;
    value: Option | Options | null;
    id?: string;
    size?: FIELD_SIZE;
    multiple?: boolean;
    required?: boolean;
    disabled?: boolean;
    error?: boolean;
    helperText?: React.ReactNode;
    optionsHeaderTitle?: string;
    disabledOptions?: Options;
    primaryColor?: string;
    onChange: (_: Option | Options | null) => void;
}

export const CustomSelect = ({
    label,
    name,
    options,
    value,
    id = '',
    size = FIELD_SIZE.medium,
    multiple = false,
    required = false,
    disabled = false,
    error = false,
    helperText = '',
    optionsHeaderTitle = undefined,
    disabledOptions = [],
    primaryColor = undefined,
    onChange
}: CustomSelectProps) => {
    const isMobile = useIsMobile();
    const theme = useTheme();
    const { getValueToLabelMap } = useHelper();

    const initialSelectedValue = React.useMemo(() => {
        return Array.isArray(value)
            ? value.map(option => option.value)
            : value?.value ?? '';
    }, [value]);

    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] =
        React.useState(initialSelectedValue);
    const [search, setSearch] = React.useState('');

    const valueToLabelMap = React.useMemo(() => {
        return getValueToLabelMap(options);
    }, [options, getValueToLabelMap]);

    const filteredOptions = React.useMemo(() => {
        let modifiedOptions;

        if (search) {
            modifiedOptions = options.filter(option =>
                option.label.toLowerCase().includes(search.toLowerCase())
            );
        } else {
            modifiedOptions = [...options];
        }

        return modifiedOptions;
    }, [options, search]);

    const onCloseClick = React.useCallback(() => {
        setIsOpen(false);
        setSelectedValue(initialSelectedValue);
        setSearch('');
    }, [initialSelectedValue]);

    const menuProps: Partial<MenuProps> = React.useMemo(
        () => ({
            onClose: onCloseClick,
            anchorReference: isMobile ? 'anchorPosition' : 'anchorEl',
            anchorPosition: isMobile ? { top: 0, left: 0 } : undefined,
            sx: {
                '.MuiMenu-paper': isMobile ? { width: '100%' } : {},
                '.MuiMenu-list': { py: 0 },
                '.MuiModal-backdrop': {
                    bgcolor: isMobile ? BACKDROP_BG_COLOR : undefined
                }
            }
        }),
        [isMobile, onCloseClick]
    );

    const selectedPrimaryColor = React.useMemo(() => {
        return primaryColor || theme.palette.primary.main;
    }, [primaryColor, theme.palette.primary.main]);

    const selectSx: SxProps = React.useMemo(() => {
        return {
            '& label.Mui-focused': {
                color: error ? undefined : selectedPrimaryColor
            },
            '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                    borderColor: error ? undefined : selectedPrimaryColor
                }
            }
        };
    }, [selectedPrimaryColor, error]);

    const getOptionSx = React.useCallback(
        (isSelected: boolean, isLastOption: boolean): SxProps => {
            const bgColor = tinycolor(selectedPrimaryColor)
                .setAlpha(0.08)
                .toString();
            const hoverBGColor = tinycolor(selectedPrimaryColor)
                .setAlpha(0.12)
                .toString();

            return {
                py: 1,
                borderBottom: isLastOption
                    ? undefined
                    : `1px solid ${grey[200]}`,
                bgcolor: isSelected ? bgColor : undefined,
                '&:hover': {
                    bgcolor: isSelected ? hoverBGColor : undefined
                },
                '&.Mui-selected': {
                    bgcolor: isSelected ? bgColor : 'unset',
                    '&:hover': {
                        bgcolor: isSelected ? hoverBGColor : 'unset'
                    }
                }
            };
        },
        [selectedPrimaryColor]
    );

    const getSelectValuePreview = React.useCallback(
        (selectValue: string | string[]) => {
            if (typeof selectValue === 'string') {
                return valueToLabelMap[selectValue];
            } else {
                return selectValue
                    .map(value => valueToLabelMap[value])
                    .join(', ');
            }
        },
        [valueToLabelMap]
    );

    const isOptionDisabled = React.useCallback(
        (option: Option) => {
            return !!disabledOptions.find(
                element => element.value === option.value
            );
        },
        [disabledOptions]
    );

    const onOptionClick = React.useCallback(
        (option: Option) => {
            setSelectedValue(prevSelectedValue => {
                if (multiple) {
                    const optionIndex = prevSelectedValue.indexOf(option.value);

                    if (optionIndex > -1) {
                        const modifiedSelectedValue = [...prevSelectedValue];
                        modifiedSelectedValue.splice(optionIndex, 1);
                        return [...modifiedSelectedValue];
                    } else {
                        return [...prevSelectedValue, option.value];
                    }
                } else {
                    return option.value;
                }
            });
        },
        [multiple]
    );

    const onClearClick = React.useCallback(() => {
        setSelectedValue(multiple ? [] : '');
    }, [multiple]);

    const onConfirmClick = React.useCallback(() => {
        let modifiedSelectedOptions;

        if (typeof selectedValue === 'string') {
            modifiedSelectedOptions = selectedValue
                ? {
                      value: selectedValue,
                      label: valueToLabelMap[selectedValue]
                  }
                : null;
        } else {
            modifiedSelectedOptions = selectedValue.map(value => ({
                value: value,
                label: valueToLabelMap[value]
            }));
        }

        onChange(modifiedSelectedOptions);
        setIsOpen(false);
        setSearch('');
    }, [onChange, selectedValue, valueToLabelMap]);

    return (
        <FormControl
            fullWidth
            size={size}
            required={required}
            disabled={disabled}
            error={error}
            sx={selectSx}
        >
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
                open={isOpen}
                name={name}
                id={id}
                labelId={`${name}-label`}
                label={label}
                multiple={multiple}
                value={initialSelectedValue}
                renderValue={getSelectValuePreview}
                MenuProps={menuProps}
                onOpen={() => setIsOpen(true)}
            >
                <CustomSelectHeader
                    title={optionsHeaderTitle || label}
                    optionsLength={options.length}
                    search={search}
                    primaryColor={selectedPrimaryColor}
                    setSearch={setSearch}
                    onCloseClick={onCloseClick}
                />
                {filteredOptions.map((option, index) => {
                    const isSelectedOption = multiple
                        ? selectedValue.indexOf(option.value) > -1
                        : selectedValue === option.value;
                    const isLastOption = filteredOptions.length - 1 === index;

                    return (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                            onClick={() => onOptionClick(option)}
                            disabled={isOptionDisabled(option)}
                            sx={getOptionSx(isSelectedOption, isLastOption)}
                        >
                            <CustomSelectOption
                                option={option}
                                multiple={multiple}
                                isSelected={isSelectedOption}
                                primaryColor={selectedPrimaryColor}
                            />
                        </MenuItem>
                    );
                })}
                {!filteredOptions.length && <CustomSelectNoOptionsText />}
                <CustomSelectFooter
                    hasOptions={!!options.length}
                    primaryColor={selectedPrimaryColor}
                    onClearClick={onClearClick}
                    onConfirmClick={onConfirmClick}
                />
            </Select>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
};
