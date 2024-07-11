import { type PopoverOrigin as PopoverOriginProps } from '@mui/material';

import { POPOVER_ORIGIN } from '@/Enum';

export const BACKDROP_BG_COLOR = 'rgba(0, 0, 0, 0.2)';

export const POPOVER_ORIGIN_MAP: Record<POPOVER_ORIGIN, PopoverOriginProps> = {
    [POPOVER_ORIGIN.TOP_LEFT]: { vertical: 'top', horizontal: 'left' },
    [POPOVER_ORIGIN.TOP_CENTER]: { vertical: 'top', horizontal: 'center' },
    [POPOVER_ORIGIN.TOP_RIGHT]: { vertical: 'top', horizontal: 'right' },
    [POPOVER_ORIGIN.CENTER_LEFT]: { vertical: 'center', horizontal: 'left' },
    [POPOVER_ORIGIN.CENTER_CENTER]: {
        vertical: 'center',
        horizontal: 'center'
    },
    [POPOVER_ORIGIN.CENTER_RIGHT]: { vertical: 'center', horizontal: 'right' },
    [POPOVER_ORIGIN.BOTTOM_LEFT]: { vertical: 'bottom', horizontal: 'left' },
    [POPOVER_ORIGIN.BOTTOM_CENTER]: {
        vertical: 'bottom',
        horizontal: 'center'
    },
    [POPOVER_ORIGIN.BOTTOM_RIGHT]: { vertical: 'bottom', horizontal: 'right' }
};
