import React from 'react';

import { Grid, InputAdornment, type SxProps, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { FIELD_SIZE } from '@/Enum';

interface CustomSelectSearchBarProps {
    search: string;
    primaryColor: string;
    setSearch: (_: string) => void;
}

export const CustomSelectSearchBar = ({
    search,
    primaryColor,
    setSearch
}: CustomSelectSearchBarProps) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const sx: SxProps = React.useMemo(
        () => ({
            '& label.Mui-focused': {
                color: primaryColor
            },
            '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                    borderColor: primaryColor
                }
            }
        }),
        [primaryColor]
    );

    return (
        <Grid px={2} py={0.5}>
            <TextField
                fullWidth
                size={FIELD_SIZE.small}
                autoComplete="nope"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon fontSize="small" />
                        </InputAdornment>
                    )
                }}
                placeholder="Search here..."
                value={search}
                sx={sx}
                onKeyDown={e => e.stopPropagation()}
                onChange={onChange}
            />
        </Grid>
    );
};
