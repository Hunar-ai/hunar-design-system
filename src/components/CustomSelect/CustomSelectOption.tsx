import React from 'react';

import tinycolor from 'tinycolor2';

import { Checkbox, Grid, Radio, type SxProps, Typography } from '@mui/material';

import type { Option } from '@/interfaces';

interface CustomSelectOptionProps {
    option: Option;
    multiple: boolean;
    isSelected: boolean;
    primaryColor: string;
}

export const CustomSelectOption = ({
    option,
    multiple,
    isSelected,
    primaryColor
}: CustomSelectOptionProps) => {
    const sx: SxProps = React.useMemo(() => {
        const hoverBGColor = tinycolor(primaryColor).setAlpha(0.04).toString();

        return {
            p: 0.5,
            ':hover': {
                bgcolor: hoverBGColor
            },
            '&.Mui-checked': {
                color: primaryColor
            }
        };
    }, [primaryColor]);

    return (
        <Grid container alignItems="center" columnSpacing={1.5}>
            <Grid item>
                {multiple ? (
                    <Checkbox checked={isSelected} sx={sx} size="small" />
                ) : (
                    <Radio checked={isSelected} sx={sx} size="small" />
                )}
            </Grid>
            <Grid item xs sx={{ textWrap: 'wrap' }}>
                <Typography>{option.label}</Typography>
            </Grid>
        </Grid>
    );
};
