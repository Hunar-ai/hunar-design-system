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
import { PlaceholderPreview } from '@/components/MobileDatePicker/PlaceholderPreview';

import { useHelper } from '@/hooks/useHelper';
import { useIsMobile } from '@/hooks/useIsMobile';

import type { OptionProps, OptionsProps } from '@/interfaces';
import { FIELD_SIZE, POPOVER_ORIGIN } from '@/Enum';
import { BACKDROP_BG_COLOR, POPOVER_ORIGIN_MAP } from '@/Constants';

export interface CustomSelectProps {
    label: string;
    name: string;
    options: OptionsProps;
    value: OptionProps | OptionsProps | null;
    id: string;
    size?: FIELD_SIZE;
    multiple?: boolean;
    required?: boolean;
    disabled?: boolean;
    error?: boolean;
    placeholder?: string;
    helperText?: React.ReactNode;
    optionsHeaderTitle?: string;
    disabledOptions?: OptionsProps;
    primaryColor?: string;
    sx?: SxProps;
    anchorOrigin?: POPOVER_ORIGIN;
    transformOrigin?: POPOVER_ORIGIN;
    onChange: (_: OptionProps | OptionsProps | null) => void;
}

export const CustomSelect = ({
    label,
    name,
    options,
    value,
    id,
    size = FIELD_SIZE.medium,
    multiple = false,
    required = false,
    disabled = false,
    error = false,
    placeholder = '',
    helperText = '',
    optionsHeaderTitle = undefined,
    disabledOptions = [],
    primaryColor = undefined,
    sx = {},
    anchorOrigin = POPOVER_ORIGIN.BOTTOM_CENTER,
    transformOrigin = POPOVER_ORIGIN.TOP_CENTER,
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

    React.useEffect(() => {
        setSelectedValue(initialSelectedValue);
    }, [initialSelectedValue]);

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
            anchorOrigin: POPOVER_ORIGIN_MAP[anchorOrigin],
            transformOrigin: POPOVER_ORIGIN_MAP[transformOrigin],
            sx: {
                '.MuiMenu-paper': isMobile ? { width: '100%' } : {},
                '.MuiMenu-list': { py: 0 },
                '.MuiBackdrop-root': {
                    bgcolor: isMobile ? BACKDROP_BG_COLOR : undefined
                }
            }
        }),
        [anchorOrigin, isMobile, onCloseClick, transformOrigin]
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
                return (
                    valueToLabelMap[selectValue] || (
                        <PlaceholderPreview placeholderText={placeholder} />
                    )
                );
            } else {
                return (
                    selectValue
                        .map(value => valueToLabelMap[value])
                        .join(', ') || (
                        <PlaceholderPreview placeholderText={placeholder} />
                    )
                );
            }
        },
        [valueToLabelMap, placeholder]
    );

    const isOptionDisabled = React.useCallback(
        (option: OptionProps) => {
            return !!disabledOptions.find(
                element => element.value === option.value
            );
        },
        [disabledOptions]
    );

    const onOptionClick = React.useCallback(
        (option: OptionProps) => {
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

    const valueWithPlaceholder = React.useMemo(() => {
        if (Array.isArray(initialSelectedValue)) {
            return initialSelectedValue.length === 0 && placeholder
                ? [placeholder]
                : initialSelectedValue;
        } else {
            return initialSelectedValue || placeholder;
        }
    }, [initialSelectedValue, placeholder]);

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
                sx={sx}
                multiple={multiple}
                value={valueWithPlaceholder}
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
                    optionsLength={options.length}
                    isMultiple={multiple}
                    isRequired={required}
                    primaryColor={selectedPrimaryColor}
                    onClearClick={onClearClick}
                    onConfirmClick={onConfirmClick}
                />
            </Select>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
};
