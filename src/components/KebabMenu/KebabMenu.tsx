import React from 'react';

import {
    IconButton,
    Menu,
    MenuItem,
    type SxProps,
    useTheme
} from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

import { AppTooltip } from '@/components/AppTooltip';

import { BUTTON_SIZE, POPOVER_ORIGIN, THEME_COLOR } from '@/Enum';
import { POPOVER_ORIGIN_MAP } from '@/Constants';

export interface KebabMenuOptionProps {
    label: React.ReactNode;
    onClick: (_: React.MouseEvent<HTMLLIElement>) => void;
    meta?: Record<string, unknown>;
}

export interface KebabMenuProps {
    options: KebabMenuOptionProps[];
    isMenuDense?: boolean;
    isDisabled?: boolean;
    isOutlined?: boolean;
    iconSx?: SxProps;
    size?: BUTTON_SIZE;
    color?: THEME_COLOR;
    anchorOrigin?: POPOVER_ORIGIN;
    transformOrigin?: POPOVER_ORIGIN;
    onBtnClick?: (_: React.MouseEvent<HTMLButtonElement>) => void;
    onMenuClose?: (_: React.BaseSyntheticEvent) => void;
}

export const KebabMenu = ({
    options,
    isMenuDense = true,
    isDisabled = false,
    isOutlined = false,
    iconSx = {},
    size = BUTTON_SIZE.medium,
    color = THEME_COLOR.primary,
    anchorOrigin = POPOVER_ORIGIN.BOTTOM_LEFT,
    transformOrigin = POPOVER_ORIGIN.TOP_LEFT,
    onBtnClick = () => undefined,
    onMenuClose = () => undefined
}: KebabMenuProps) => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = React.useMemo(() => !!anchorEl, [anchorEl]);

    const buttonSx: SxProps = React.useMemo(() => {
        return {
            borderRadius: isOutlined ? 1 : undefined,
            border: isOutlined ? '1px solid' : undefined,
            bgcolor: isMenuOpen ? theme.palette.action.hover : undefined
        };
    }, [isMenuOpen, isOutlined, theme.palette.action.hover]);

    const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        onBtnClick(e);
        setAnchorEl(e.currentTarget);
    };
    const handleMenuClose = (e: React.BaseSyntheticEvent) => {
        onMenuClose(e);
        setAnchorEl(null);
    };

    return (
        <>
            <AppTooltip title="More actions">
                <IconButton
                    id="kebab-menu-button"
                    aria-controls={isMenuOpen ? 'kebab-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={isMenuOpen ? 'true' : undefined}
                    onClick={handleBtnClick}
                    color={color}
                    size={size}
                    sx={buttonSx}
                    disabled={isDisabled}
                >
                    <MoreVertIcon sx={iconSx} />
                </IconButton>
            </AppTooltip>
            <Menu
                id="kebab-menu"
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                MenuListProps={{
                    'aria-labelledby': 'kebab-menu-button'
                }}
                anchorOrigin={POPOVER_ORIGIN_MAP[anchorOrigin]}
                transformOrigin={POPOVER_ORIGIN_MAP[transformOrigin]}
            >
                {options.map((option: KebabMenuOptionProps, index: number) => (
                    <MenuItem
                        dense={isMenuDense}
                        key={index}
                        onClick={e => {
                            option.onClick(e);
                            handleMenuClose(e);
                        }}
                        {...option.meta}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};
