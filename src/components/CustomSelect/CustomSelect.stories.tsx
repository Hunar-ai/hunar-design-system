import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/preview-api';

import Grid from '@mui/material/Grid';

import { Options } from '@/interfaces';

import { HelperText } from '@/components/HelperText';
import { CustomSelect, CustomSelectProps } from './CustomSelect';

import { FIELD_SIZE } from '@/Enum';

const onChange = action('change');

const options: Options = [
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
    { label: 'Option 4', value: 'option-4' },
    { label: 'Option 5', value: 'option-5' },
    { label: 'Option 6', value: 'option-6' },
    { label: 'Option 7', value: 'option-7' },
    { label: 'Option 8', value: 'option-8' },
    { label: 'Option 9', value: 'option-9' },
    { label: 'Option 10', value: 'option-10' }
];

const disabledOptions: Options = [options[1], options[3], options[4]];

const meta = {
    title: 'Components/CustomSelect',
    component: CustomSelect,
    parameters: { controls: { expanded: true } },
    argTypes: {
        value: {
            table: {
                type: { summary: `Option | Options | null` }
            }
        },
        size: {
            control: 'select',
            options: [FIELD_SIZE.small, FIELD_SIZE.medium]
        }
    },
    args: {
        label: 'Custom Select',
        name: 'customSelect',
        options,
        value: null,
        onChange
    }
} satisfies Meta<typeof CustomSelect>;

export default meta;

type Story = StoryObj<typeof CustomSelect>;

export const Playground: Story = {
    args: { disabledOptions: [] },
    render: function Playground(props) {
        const [{ multiple }, updateArg] = useArgs<NonNullable<Story['args']>>();

        const [singleSelectValue, setSingleSelectValue] =
            React.useState<CustomSelectProps['value']>(null);
        const [multiSelectValue, setMultiSelectValue] = React.useState<
            CustomSelectProps['value']
        >([]);

        const onSelectChange: CustomSelectProps['onChange'] = updatedValue => {
            onChange(updatedValue);
            updateArg({ value: updatedValue });
            if (Array.isArray(updatedValue)) {
                setMultiSelectValue(updatedValue);
            } else {
                setSingleSelectValue(updatedValue);
            }
        };

        return (
            <CustomSelect
                {...props}
                value={multiple ? multiSelectValue : singleSelectValue}
                onChange={onSelectChange}
            />
        );
    }
};

const ControlledCustomSelect = ({
    value,
    onChange,
    ...props
}: CustomSelectProps) => {
    const [selectedValue, setSelectedValue] =
        React.useState<CustomSelectProps['value']>(value);

    const onSelectChange: CustomSelectProps['onChange'] = modifiedValue => {
        setSelectedValue(modifiedValue);
        onChange(modifiedValue);
    };

    return (
        <CustomSelect
            {...props}
            value={selectedValue}
            onChange={onSelectChange}
        />
    );
};

const CustomSelectStates = (props: CustomSelectProps) => {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <ControlledCustomSelect
                    {...props}
                    label="Default"
                    name="default"
                />
            </Grid>
            <Grid item xs={12}>
                <ControlledCustomSelect
                    {...props}
                    label="Disabled"
                    name="disabled"
                    disabled
                />
            </Grid>
            <Grid item xs={12}>
                <ControlledCustomSelect
                    {...props}
                    label="Disabled Options"
                    name="disabledOptions"
                    disabledOptions={disabledOptions}
                />
            </Grid>
            <Grid item xs={12}>
                <ControlledCustomSelect
                    {...props}
                    label="No Options"
                    name="noOptions"
                    options={[]}
                />
            </Grid>
            <Grid item xs={12}>
                <ControlledCustomSelect
                    {...props}
                    label="No Search Bar"
                    name="noSearchBar"
                    options={[options[0], options[1]]}
                />
            </Grid>
            <Grid item xs={12}>
                <ControlledCustomSelect
                    {...props}
                    label="Required"
                    name="required"
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <ControlledCustomSelect
                    {...props}
                    label="Helper Text"
                    name="helper-text"
                    helperText={<HelperText msg="I have helper text" />}
                />
            </Grid>
            <Grid item xs={12}>
                <ControlledCustomSelect
                    {...props}
                    label="Error"
                    name="error"
                    error
                    helperText={<HelperText hasError errorMsg="I have error" />}
                />
            </Grid>
        </Grid>
    );
};

export const SingleSelect: Story = {
    parameters: {
        controls: {
            include: ['multiple', 'size', 'primaryColor', 'optionsHeaderTitle']
        }
    },
    argTypes: { multiple: { control: 'select', options: [false] } },
    args: {
        multiple: false
    },
    render: props => <CustomSelectStates {...props} />
};

export const MultiSelect: Story = {
    parameters: {
        controls: {
            include: ['multiple', 'size', 'primaryColor', 'optionsHeaderTitle']
        }
    },
    argTypes: { multiple: { control: 'select', options: [true] } },
    args: {
        multiple: true,
        value: []
    },
    render: props => <CustomSelectStates {...props} />
};
