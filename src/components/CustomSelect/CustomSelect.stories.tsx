import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/preview-api';

import { Options } from '@/interfaces';

import { StorySection } from '@/components/storybook';
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

interface CustomSelectSectionProps extends CustomSelectProps {
    sectionTitle: string;
    sectionDescription?: string;
}

const CustomSelectSection = ({
    sectionTitle,
    sectionDescription,
    ...props
}: CustomSelectSectionProps) => {
    return (
        <StorySection title={sectionTitle} description={sectionDescription}>
            <ControlledCustomSelect {...props} />
        </StorySection>
    );
};

const CustomSelectStates = (props: CustomSelectProps) => {
    return (
        <>
            <CustomSelectSection
                sectionTitle="Default"
                {...props}
                name="default"
            />
            <CustomSelectSection
                sectionTitle="Disabled"
                {...props}
                name="disabled"
                disabled
            />
            <CustomSelectSection
                sectionTitle="Disabled Options"
                {...props}
                name="disabledOptions "
                disabledOptions={disabledOptions}
            />
            <CustomSelectSection
                sectionTitle="No Options"
                {...props}
                name="noOptions"
                options={[]}
            />
            <CustomSelectSection
                sectionTitle="No Search Bar"
                {...props}
                name="noSearchBar"
                options={[options[0], options[1]]}
            />
            <CustomSelectSection
                sectionTitle="Required"
                {...props}
                name="required"
                required
            />
            <CustomSelectSection
                sectionTitle="Helper Text"
                {...props}
                name="helper-text"
                helperText={<HelperText msg="I have helper text" />}
            />
            <CustomSelectSection
                sectionTitle="Error"
                {...props}
                name="error"
                error
                helperText={<HelperText hasError errorMsg="I have error" />}
            />
        </>
    );
};

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
            <StorySection
                title=""
                // eslint-disable-next-line max-len
                description={`Change various props in the "Controls" panel to see how they change behavior of the component`}
            >
                <CustomSelect
                    {...props}
                    value={multiple ? multiSelectValue : singleSelectValue}
                    onChange={onSelectChange}
                />
            </StorySection>
        );
    }
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
