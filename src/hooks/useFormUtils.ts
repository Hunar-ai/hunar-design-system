import React from 'react';

import type { OptionsProps } from '@/interfaces';

interface GetSelectedOptionProps<TValue> {
    options: OptionsProps;
    fieldValue: TValue;
}

export const useFormUtils = () => {
    const getSelectedOption = React.useCallback(
        ({ options, fieldValue }: GetSelectedOptionProps<string>) => {
            return options.find(option => option.value === fieldValue) || null;
        },
        []
    );

    const getMultiSelectedOptions = React.useCallback(
        ({ options, fieldValue }: GetSelectedOptionProps<string[]>) => {
            return fieldValue.reduce<OptionsProps>((selectedOptions, value) => {
                const selectedOption = options.find(
                    option => option.value === value
                );
                return selectedOption
                    ? [...selectedOptions, selectedOption]
                    : selectedOptions;
            }, []);
        },
        []
    );

    return {
        getSelectedOption,
        getMultiSelectedOptions
    };
};
