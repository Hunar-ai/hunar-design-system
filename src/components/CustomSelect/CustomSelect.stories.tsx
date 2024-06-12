import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/preview-api';

import { Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

import { Options } from '@/interfaces';

import { HelperText } from '@/components/HelperText';
import { CustomSelect, CustomSelectProps } from './CustomSelect';

import { FIELD_SIZE } from '@/Enum';

const onChange = action('change');

const options: Options = [
    { label: 'The Shawshank Redemption', value: 'THE_SHAWSHANK_REDEMPTION' },
    { label: 'The Godfather', value: 'THE_GODFATHER' },
    { label: 'The Godfather: Part II', value: 'THE_GODFATHER_PART_II' },
    { label: 'The Dark Knight', value: 'THE_DARK_KNIGHT' },
    { label: '12 Angry Men', value: '12_ANGRY_MEN' },
    { label: 'Pulp Fiction', value: 'PULP_FICTION' },
    { label: 'Fight Club', value: 'FIGHT_CLUB' },
    { label: 'Forrest Gump', value: 'FORREST_GUMP' },
    { label: 'Inception', value: 'INCEPTION' },
    { label: 'The Matrix', value: 'THE_MATRIX' }
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
        label: 'Movies',
        name: 'movies',
        options,
        value: null,
        onChange
    }
} satisfies Meta<typeof CustomSelect>;

export default meta;

type Story = StoryObj<typeof CustomSelect>;

interface PreviewWrapperProps {
    title: string;
    children: React.ReactNode;
}

const PreviewWrapper = ({ title, children }: PreviewWrapperProps) => {
    return (
        <Grid container p={1} rowGap={1} flexDirection="column">
            <Typography fontWeight={700}>{title}</Typography>
            <Grid
                width="100%"
                border={`1px solid ${grey[200]}`}
                borderRadius={3}
                p={2}
            >
                <Grid width={{ xs: '100%', sm: '40%' }} mx="auto">
                    {children}
                </Grid>
            </Grid>
        </Grid>
    );
};

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
            <PreviewWrapper title="Playground">
                <CustomSelect
                    {...props}
                    value={multiple ? multiSelectValue : singleSelectValue}
                    onChange={onSelectChange}
                />
            </PreviewWrapper>
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

interface PreviewProps extends CustomSelectProps {
    title: string;
}

const Preview = ({ title, ...props }: PreviewProps) => {
    return (
        <PreviewWrapper title={title}>
            <ControlledCustomSelect {...props} />
        </PreviewWrapper>
    );
};

const CustomSelectStates = (props: CustomSelectProps) => {
    return (
        <Grid container gap={2}>
            <Preview {...props} title="Default" name="default" />
            <Preview {...props} title="Disabled" name="disabled" disabled />
            <Preview
                {...props}
                title="Disabled Options"
                name="disabledOptions"
                disabledOptions={disabledOptions}
            />
            <Preview
                {...props}
                title="No Options"
                name="noOptions"
                options={[]}
            />
            <Preview
                {...props}
                title="No Search Bar"
                name="noSearchBar"
                options={[options[0], options[1]]}
            />
            <Preview {...props} title="Required" name="required" required />
            <Preview
                {...props}
                title="Helper Text"
                name="helper-text"
                helperText={<HelperText msg="I have helper text" />}
            />
            <Preview
                {...props}
                title="Error"
                name="error"
                error
                helperText={<HelperText hasError errorMsg="I have error" />}
            />
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
