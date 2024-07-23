import React from 'react';

import type { OptionProps, OptionsProps } from '@/interfaces';

export const useHelper = () => {
    const getValueToLabelMap = React.useCallback(
        (options: OptionsProps): { [key: string]: string } => {
            const optionsMap = options.reduce(
                (acc: { [key: string]: string }, key: OptionProps) => {
                    acc = {
                        ...acc,
                        [key.value]: key.label
                    };
                    return acc;
                },
                {}
            );
            return optionsMap;
        },
        []
    );

    return { getValueToLabelMap };
};
