import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { StorySection } from '@/components/storybook';
import { HelperText } from '@/components/HelperText';
import { Select, type SelectProps } from './Select';

import { COMMON_CONSTANT, FIELD_SIZE } from '@/Enum';
import { OptionsProps } from '@/interfaces';

const onChange = action('change');
const onNewClick = action('newClick');

export const options: OptionsProps = [
    {
        label: 'Option with label helper text',
        value: 'LABEL_HELPER_TEXT',
        labelHelperText: 'This is helper text for label'
    },
    {
        label: 'VeryLongOptionWithoutAnySpaceVeryLongOptionWithoutAnySpace',
        value: 'VERY_LONG_OPTION_WITHOUT_ANY_SPACE'
    },
    {
        label: 'The Godfather',
        value: 'THE_GODFATHER'
    },
    {
        label: 'The Godfather: Part II',
        value: 'THE_GODFATHER_PART_II'
    },
    {
        label: 'The Dark Knight',
        value: 'THE_DARK_KNIGHT'
    },
    { label: '12 Angry Men', value: '12_ANGRY_MEN' },
    { label: 'Pulp Fiction', value: 'PULP_FICTION' },
    { label: 'Fight Club', value: 'FIGHT_CLUB' },
    { label: 'Forrest Gump', value: 'FORREST_GUMP' },
    { label: 'Inception', value: 'INCEPTION' },
    { label: 'The Matrix', value: 'THE_MATRIX' }
];

const disabledOptions: OptionsProps = [options[3], options[4], options[6]];

const ControlledSelect = ({ value, onChange, ...props }: SelectProps) => {
    const [selectedValue, setSelectedValue] =
        React.useState<SelectProps['value']>(value);

    const onSelectChange: SelectProps['onChange'] = (
        e,
        modifiedValue,
        reason
    ) => {
        setSelectedValue(modifiedValue);
        onChange(e, modifiedValue, reason);
    };

    return (
        <Select {...props} value={selectedValue} onChange={onSelectChange} />
    );
};

interface SelectSectionProps extends SelectProps {
    sectionTitle: string;
    sectionDescription?: string;
}

const SelectSection = ({
    sectionTitle,
    sectionDescription,
    ...props
}: SelectSectionProps) => {
    return (
        <StorySection title={sectionTitle} description={sectionDescription}>
            <ControlledSelect {...props} />
        </StorySection>
    );
};

const SelectStates = (props: SelectProps) => {
    return (
        <>
            <SelectSection sectionTitle="Default" {...props} name="default" />
            <SelectSection
                sectionTitle="Disabled"
                {...props}
                name="disabled"
                isDisabled
            />
            <SelectSection
                sectionTitle="Placeholder"
                // eslint-disable-next-line max-len
                sectionDescription='Here, the placeholder is "Choose Option". Try changing the placeholder from controls'
                placeholder="Choose Option"
                {...props}
                name="placeholder"
            />
            <SelectSection
                sectionTitle="With 'Add New' Option"
                {...props}
                name="disabledOptions "
                options={[
                    { value: COMMON_CONSTANT.NEW, label: 'Add New Option' },
                    ...options
                ]}
            />
            <SelectSection
                sectionTitle="Disabled Options"
                {...props}
                name="disabledOptions "
                disabledOptions={disabledOptions}
            />
            <SelectSection
                sectionTitle="No Options"
                {...props}
                name="noOptions"
                options={[]}
            />
            <SelectSection
                sectionTitle="Required"
                {...props}
                name="required"
                isRequired
            />
            <SelectSection
                sectionTitle="Helper Text"
                {...props}
                name="helper-text"
                helperText={<HelperText msg="I have helper text" />}
            />
            <SelectSection
                sectionTitle="Error"
                {...props}
                name="error"
                hasError
                helperText={<HelperText hasError errorMsg="I have error" />}
            />
        </>
    );
};

const meta = {
    title: 'Components/Select',
    component: Select,
    parameters: { controls: { expanded: true } },
    excludeStories: ['options'],
    argTypes: {
        value: {
            table: {
                type: { summary: `OptionProps | OptionsProps | null` }
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
        onChange,
        onNewClick
    }
} satisfies Meta<typeof Select>;

export default meta;

type StoryProps = StoryObj<typeof Select>;

export const Playground: StoryProps = {
    args: { disabledOptions: [] },
    decorators: Story => (
        <StorySection
            title=""
            description='Change various props in the "Controls" panel to see how they change behavior of the component'
        >
            <Story />
        </StorySection>
    ),
    render: function Playground(props) {
        const [singleSelectValue, setSingleSelectValue] =
            React.useState<SelectProps['value']>(null);
        const [multiSelectValue, setMultiSelectValue] = React.useState<
            SelectProps['value']
        >([]);

        const onSelectChange: SelectProps['onChange'] = (e, updatedValue) => {
            onChange(e, updatedValue);
            if (Array.isArray(updatedValue)) {
                setMultiSelectValue(updatedValue);
            } else {
                setSingleSelectValue(updatedValue);
            }
        };

        return (
            <Select
                {...props}
                value={props.isMultiple ? multiSelectValue : singleSelectValue}
                onChange={onSelectChange}
            />
        );
    }
};

const allowedControls = [
    'isMultiple',
    'size',
    'sx',
    'menuSx',
    'primaryColor',
    'placeholder'
];

export const SingleSelect: StoryProps = {
    parameters: {
        controls: {
            include: allowedControls
        }
    },
    argTypes: { isMultiple: { control: 'select', options: [false] } },
    args: {
        isMultiple: false
    },
    render: props => <SelectStates {...props} />
};

export const MultiSelect: StoryProps = {
    parameters: {
        controls: {
            include: allowedControls
        }
    },
    argTypes: { isMultiple: { control: 'select', options: [true] } },
    args: {
        isMultiple: true,
        value: []
    },
    render: props => <SelectStates {...props} />
};
