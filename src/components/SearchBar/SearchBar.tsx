import React from 'react';
import { debounce } from 'lodash-es';

import { Box, IconButton } from '@mui/material';

import {
    ArrowLeft as ArrowLeftIcon,
    MagnifyingGlass as MagnifyingGlassIcon
} from '@phosphor-icons/react';

import { SearchBarField } from './SearchBarField';

import { useIsMobile } from '@/hooks/useIsMobile';

export interface SearchBarProps {
    placeholder?: string;
    showMobileSearch?: boolean;
    xsWidth?: string;
    setSearchValue: (_: string) => void;
    onClearClick?: VoidFunction;
    onEnterPress?: VoidFunction;
    onBackClick?: VoidFunction;
}
export const SearchBar = ({
    placeholder = 'Search',
    showMobileSearch = true,
    xsWidth = 'calc(100vw - 32px)',
    setSearchValue,
    onClearClick = () => undefined,
    onEnterPress = () => undefined,
    onBackClick = () => undefined
}: SearchBarProps) => {
    const isMobile = useIsMobile();

    const [fieldValue, setFieldValue] = React.useState('');
    const [showMobileInput, setShowMobileInput] = React.useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const updateDebouncedSearchValue = React.useCallback(
        debounce((value: string) => setSearchValue(value), 2000),
        []
    );

    const onSearchFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(e.target.value);
        updateDebouncedSearchValue(e.target.value.trim());
    };

    const onSearchClear = () => {
        onClearClick();
        setFieldValue('');
        updateDebouncedSearchValue('');
    };

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onEnterPress();
        }
    };

    const handleBackClick = () => {
        updateDebouncedSearchValue.cancel();
        setShowMobileInput(false);
        setFieldValue('');
        setSearchValue('');
        onBackClick();
    };

    return (
        <Box position="relative">
            {isMobile && showMobileSearch ? (
                <>
                    <IconButton onClick={() => setShowMobileInput(true)}>
                        <MagnifyingGlassIcon />
                    </IconButton>
                    {showMobileInput && (
                        <Box
                            position="absolute"
                            top={0}
                            bottom={0}
                            right={0}
                            width={xsWidth}
                            bgcolor="white"
                            display="flex"
                            alignItems="center"
                            columnGap={3}
                        >
                            <IconButton sx={{ p: 0 }} onClick={handleBackClick}>
                                <ArrowLeftIcon />
                            </IconButton>
                            <SearchBarField
                                value={fieldValue}
                                placeholder={placeholder}
                                onChange={onSearchFieldChange}
                                onKeyPress={onKeyPress}
                                onClearClick={onSearchClear}
                            />
                        </Box>
                    )}
                </>
            ) : (
                <SearchBarField
                    value={fieldValue}
                    placeholder={placeholder}
                    onChange={onSearchFieldChange}
                    onKeyPress={onKeyPress}
                    onClearClick={onSearchClear}
                />
            )}
        </Box>
    );
};
