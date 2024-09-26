export interface OptionProps {
    value: string;
    label: string;
    labelHelperText?: string;
    state?: string;
    meta?: Record<string, unknown>;
}

export type OptionsProps = OptionProps[];
