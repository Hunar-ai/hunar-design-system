export interface OptionProps {
    value: string;
    label: string;
    labelHelperText?: string;
    state?: string;
    meta?: Record<string, string>;
}

export type OptionsProps = OptionProps[];
