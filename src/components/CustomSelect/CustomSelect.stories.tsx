import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/preview-api';

import { StorySection } from '@/components/storybook';
import { HelperText } from '@/components/HelperText';
import { CustomSelect, CustomSelectProps } from './CustomSelect';

import { FIELD_SIZE, POPOVER_ORIGIN } from '@/Enum';
import { OptionsProps } from '@/interfaces';

const onChange = action('change');

const options: OptionsProps = [
    {
        label: 'VeryLongOptionWithoutAnySpaceVeryLongOptionWithoutAnySpace',
        value: 'VERY_LONG_OPTION_WITHOUT_ANY_SPACE'
    },
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

const disabledOptions: OptionsProps = [options[1], options[3], options[4]];
const noClearAllOptions = options.slice(0, 4);
const customAnchorOrigin = POPOVER_ORIGIN.TOP_RIGHT;
const customTransformOrigin = POPOVER_ORIGIN.BOTTOM_RIGHT;

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
                sectionTitle="Placeholder"
                // eslint-disable-next-line max-len
                sectionDescription='Here, the placeholder is "Choose Option". Try changing the placeholder from controls'
                {...props}
                name="placeholder"
                placeholder="Choose Option"
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
                sectionDescription="Search Bar is only shown when there are more than 2 options"
                options={[options[0], options[1]]}
            />
            <CustomSelectSection
                sectionTitle="No Clear All Button"
                sectionDescription="Clear All button is not shown when there are less than 5 options"
                {...props}
                name="noClearAll"
                options={noClearAllOptions}
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
            <CustomSelectSection
                sectionTitle="Custom Menu Placement (Desktop Only)"
                // eslint-disable-next-line max-len
                sectionDescription="Use `anchorOrigin`, `transformOrigin` and `menuMarginThreshold` to customize how the menu is placed"
                {...props}
                name="menu-placement"
                anchorOrigin={customAnchorOrigin}
                transformOrigin={customTransformOrigin}
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
                type: { summary: `OptionProps | OptionsProps | null` }
            }
        },
        size: {
            control: 'select',
            options: [FIELD_SIZE.small, FIELD_SIZE.medium]
        },
        anchorOrigin: {
            control: 'select',
            options: Object.values(POPOVER_ORIGIN)
        },
        transformOrigin: {
            control: 'select',
            options: Object.values(POPOVER_ORIGIN)
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

type StoryProps = StoryObj<typeof CustomSelect>;

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
        const [{ multiple }, updateArg] =
            useArgs<NonNullable<StoryProps['args']>>();

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

const allowedControls = [
    'multiple',
    'size',
    'sx',
    'menuSx',
    'primaryColor',
    'optionsHeaderTitle',
    'placeholder',
    'anchorOrigin',
    'transformOrigin',
    'menuMarginThreshold'
];

export const SingleSelect: StoryProps = {
    parameters: {
        controls: {
            include: allowedControls
        }
    },
    argTypes: { multiple: { control: 'select', options: [false] } },
    args: {
        multiple: false
    },
    render: props => <CustomSelectStates {...props} />
};

export const MultiSelect: StoryProps = {
    parameters: {
        controls: {
            include: allowedControls
        }
    },
    argTypes: { multiple: { control: 'select', options: [true] } },
    args: {
        multiple: true,
        value: []
    },
    render: props => <CustomSelectStates {...props} />
};
