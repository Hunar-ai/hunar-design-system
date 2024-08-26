import React from 'react';

import DatePicker from 'react-mobile-datepicker-ts';
import 'react-mobile-datepicker-ts/dist/main.css';

import {
    FormControl,
    InputLabel,
    Select,
    type SxProps,
    type MenuProps,
    FormHelperText,
    useTheme,
    Box
} from '@mui/material';

import { MobileDatePickerHeader } from './MobileDatePickerHeader';
import { MobileDatePickerFooter } from './MobileDatePickerFooter';

import { useIsMobile } from '@/hooks/useIsMobile';

import { FIELD_SIZE } from '@/Enum';
import { BACKDROP_BG_COLOR } from '@/Constants';
import { grey } from '@mui/material/colors';

export interface MobileDatePickerProps {
    label: string;
    name: string;
    value: Date;
    id?: string;
    size?: FIELD_SIZE;
    required?: boolean;
    disabled?: boolean;
    error?: boolean;
    helperText?: React.ReactNode;
    optionsHeaderTitle?: string;
    primaryColor?: string;
    onChange: (_: Date) => void;
}

export const MobileDatePicker = ({
    label,
    name,
    value,
    id = '',
    size = FIELD_SIZE.medium,
    required = false,
    disabled = false,
    error = false,
    helperText = '',
    optionsHeaderTitle = undefined,
    primaryColor = undefined,
    onChange
}: MobileDatePickerProps) => {
    const isMobile = useIsMobile();
    const theme = useTheme();

    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(value);

    React.useEffect(() => {
        setSelectedValue(value);
    }, [value]);

    const onCloseClick = React.useCallback(() => {
        setIsOpen(false);
        setSelectedValue(value);
    }, [value]);

    const menuProps: Partial<MenuProps> = React.useMemo(
        () => ({
            onClose: onCloseClick,
            anchorReference: isMobile ? 'anchorPosition' : 'anchorEl',
            anchorPosition: isMobile ? { top: 0, left: 0 } : undefined,
            sx: {
                '.MuiMenu-paper': isMobile ? { width: '100%' } : {},
                '.MuiMenu-list': { py: 0 },
                '.MuiBackdrop-root': {
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

    const getValuePreview = React.useCallback(() => {
        return value.toLocaleDateString();
    }, [value]);

    const onConfirmClick = React.useCallback(() => {
        onChange(selectedValue);
        setIsOpen(false);
    }, [onChange, selectedValue]);

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
                value={value}
                renderValue={getValuePreview}
                MenuProps={menuProps}
                onOpen={() => setIsOpen(true)}
            >
                <MobileDatePickerHeader
                    title={optionsHeaderTitle || label}
                    onCloseClick={onCloseClick}
                />
                <Box
                    sx={{
                        '.datepicker.default': {
                            position: 'static',
                            bgcolor: 'unset',
                            '.datepicker-scroll li': {
                                fontSize: '20px',
                                fontFamily: 'Lato',
                                color: grey[500]
                                // height: 48
                            },
                            '.datepicker-wheel': {
                                borderTop: `1px solid ${grey[400]}`,
                                borderBottom: `1px solid ${grey[400]}`
                            }
                        }
                    }}
                >
                    <DatePicker
                        isPopup={false}
                        showHeader={false}
                        showFooter={false}
                        value={selectedValue}
                        onChange={(modifiedValue: Date) =>
                            setSelectedValue(modifiedValue)
                        }
                    />
                </Box>
                <MobileDatePickerFooter
                    primaryColor={selectedPrimaryColor}
                    onConfirmClick={onConfirmClick}
                />
            </Select>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
};
