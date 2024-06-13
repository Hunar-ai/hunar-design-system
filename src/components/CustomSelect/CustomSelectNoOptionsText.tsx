import { MenuItem } from '@mui/material';
import { grey } from '@mui/material/colors';

export const CustomSelectNoOptionsText = () => {
    return (
        <MenuItem
            disabled
            sx={{
                py: 1,
                '&.Mui-disabled': {
                    opacity: 'unset',
                    color: grey[600]
                }
            }}
        >
            No Options
        </MenuItem>
    );
};
