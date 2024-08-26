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
import { grey } from '@mui/material/colors';

import { MobileDatePickerHeader } from './MobileDatePickerHeader';
import { MobileDatePickerFooter } from './MobileDatePickerFooter';

import { useIsMobile } from '@/hooks/useIsMobile';

import { FIELD_SIZE } from '@/Enum';
import { BACKDROP_BG_COLOR } from '@/Constants';

const DATE_OPTION_HEIGHT = 56;
const SCROLL_TRANSFORM_FACTOR = DATE_OPTION_HEIGHT / 40;

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
                            bgcolor: 'white',
                            '.datepicker-scroll': {
                                transform: `translateY(calc(var(--translate-y) * ${SCROLL_TRANSFORM_FACTOR}px))`,
                                mt: `calc(var(--margin-top) * ${SCROLL_TRANSFORM_FACTOR}px)`
                            },
                            '.datepicker-scroll li': {
                                fontSize: '20px',
                                fontFamily: 'Lato',
                                py: 1
                            },
                            '.datepicker-col-1': { mt: -1, mx: 0.75 },
                            '.datepicker-wheel': {
                                height: DATE_OPTION_HEIGHT,
                                mt: `-${DATE_OPTION_HEIGHT / 2}px`,
                                borderTop: `1px solid ${grey[400]}`,
                                borderBottom: `1px solid ${grey[400]}`
                            },
                            '.datepicker-content': {
                                py: 2,
                                px: '22.5px'
                            },
                            '.datepicker-viewport': {
                                height: DATE_OPTION_HEIGHT * 5,
                                '&::after': {
                                    backgroundImage: `linear-gradient(
                    rgba(255, 255, 255, 0.45) ${DATE_OPTION_HEIGHT * 2}px,
                    rgba(255, 255, 255, 0) ${DATE_OPTION_HEIGHT * 2}px,
                    rgba(255, 255, 255, 0) ${DATE_OPTION_HEIGHT * 3 + 2}px,
                    rgba(255, 255, 255, 0.45) ${DATE_OPTION_HEIGHT * 3 + 2}px)`
                                }
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
