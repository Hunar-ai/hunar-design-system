import type { Option, Options } from '@/interfaces';

export const useHelper = () => {
    const getValueToLabelMap = (
        options: Options
    ): { [key: string]: string } => {
        const optionsMap = options.reduce(
            (acc: { [key: string]: string }, key: Option) => {
                acc = {
                    ...acc,
                    [key.value]: key.label
                };
                return acc;
            },
            {}
        );
        return optionsMap;
    };

    return { getValueToLabelMap };
};
