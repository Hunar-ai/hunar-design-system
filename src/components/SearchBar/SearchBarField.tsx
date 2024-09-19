import { IconButton, InputAdornment, TextField } from '@mui/material';

import {
    MagnifyingGlass as MagnifyingGlassIcon,
    X as ClearIcon
} from '@phosphor-icons/react';

interface SearchBarFieldProps {
    value: string;
    placeholder: string;
    onChange: (_: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (_: React.KeyboardEvent<HTMLInputElement>) => void;
    onClearClick: VoidFunction;
}

export const SearchBarField = ({
    value,
    placeholder,
    onChange,
    onKeyPress,
    onClearClick
}: SearchBarFieldProps) => {
    const onClearMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
        // this prevents focus loss on textfield
        e.preventDefault();
    };

    return (
        <TextField
            size="small"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <MagnifyingGlassIcon size={24} />
                    </InputAdornment>
                ),
                endAdornment: value ? (
                    <IconButton
                        onClick={onClearClick}
                        onMouseDown={onClearMouseDown}
                        sx={{ p: 0 }}
                    >
                        <ClearIcon size={20} />
                    </IconButton>
                ) : (
                    <></>
                )
            }}
            fullWidth
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onKeyDown={onKeyPress}
        />
    );
};
