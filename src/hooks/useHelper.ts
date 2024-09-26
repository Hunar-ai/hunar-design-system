import React from 'react';

import type { OptionProps, OptionsProps } from '@/interfaces';

export const useHelper = () => {
    const getValueToOptionMap = React.useCallback(
        (options: OptionsProps): Record<string, OptionProps> => {
            const optionsMap = options.reduce(
                (map: Record<string, OptionProps>, option: OptionProps) => {
                    return {
                        ...map,
                        [option.value]: option
                    };
                },
                {}
            );
            return optionsMap;
        },
        []
    );

    return { getValueToOptionMap };
};
