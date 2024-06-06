import React from 'react';

import { useWidth } from '@/hooks/useWidth';

export const useIsMobile = (): boolean => {
    const screenWidth = useWidth();
    const isMobile = React.useMemo(() => screenWidth === 'xs', [screenWidth]);
    return isMobile;
};
