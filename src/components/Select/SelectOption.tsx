import React from 'react';

import { omit } from 'lodash';

import { Box, Button, Checkbox, Radio, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Plus } from '@phosphor-icons/react';

import type { OptionProps } from '@/interfaces';
import { COMMON_CONSTANT, SELECT_OPTION_TYPE } from '@/Enum';

interface SelectOptionProps {
    liProps: React.HTMLAttributes<HTMLLIElement>;
    option: OptionProps;
    optionType: SELECT_OPTION_TYPE;
    isSelected: boolean;
    isMultiple: boolean;
    isAutoFocusEnabled: boolean;
    onNewClick: VoidFunction;
}

export const SelectOption = ({
    liProps,
    option,
    optionType,
    isSelected,
    isMultiple,
    isAutoFocusEnabled,
    onNewClick
}: SelectOptionProps) => {
    const props = omit(liProps, ['key']);

    return (
        <React.Fragment>
            {option.value === COMMON_CONSTANT.NEW ? (
                <Button
                    fullWidth
                    variant="text"
                    onClick={onNewClick}
                    sx={{
                        px: 3,
                        py: 1.5,
                        justifyContent: 'start',
                        fontWeight: 600
                    }}
                    startIcon={<Plus size={16} weight="bold" />}
                >
                    {option.label}
                </Button>
            ) : (
                <li {...props}>
                    {optionType === SELECT_OPTION_TYPE.CHECKBOX ? (
                        isMultiple ? (
                            <Checkbox
                                size="small"
                                sx={{ mr: 1 }}
                                checked={isSelected}
                                autoFocus={isAutoFocusEnabled}
                            />
                        ) : (
                            <Radio checked={isSelected} />
                        )
                    ) : null}
                    <Box sx={{ textWrap: 'wrap', wordBreak: 'break-all' }}>
                        <Typography>{option.label}</Typography>
                        {option.labelHelperText && (
                            <Typography variant="caption" color={grey[600]}>
                                {option.labelHelperText}
                            </Typography>
                        )}
                    </Box>
                </li>
            )}
        </React.Fragment>
    );
};
