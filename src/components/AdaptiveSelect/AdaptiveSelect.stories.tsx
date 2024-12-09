import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { StorySection } from '@/components/storybook';
import { HelperText } from '@/components/HelperText';
import { AdaptiveSelect, type AdaptiveSelectProps } from './AdaptiveSelect';
import { options } from '@/components/Select/Select.stories';

import { FIELD_SIZE } from '@/Enum';

const onSelectChange = action('selectChange');
const onTextInputChange = action('textChange');

const ControlledAdaptiveSelect = ({
    value,
    onSelectChange,
    onTextInputChange,
    ...props
}: AdaptiveSelectProps) => {
    const [adaptiveSelectValue, setAdaptiveSelectValue] =
        React.useState<AdaptiveSelectProps['value']>(value);

    const onAdaptiveSelectChange: AdaptiveSelectProps['onSelectChange'] = (
        e,
        updatedValue,
        reason
    ) => {
        onSelectChange(e, updatedValue, reason);
        setAdaptiveSelectValue(updatedValue?.value ?? '');
    };

    const onAdaptiveSelectTextChange: AdaptiveSelectProps['onTextInputChange'] =
        e => {
            onTextInputChange(e);
            setAdaptiveSelectValue(e.target.value);
        };

    return (
        <AdaptiveSelect
            {...props}
            value={adaptiveSelectValue}
            onSelectChange={onAdaptiveSelectChange}
            onTextInputChange={onAdaptiveSelectTextChange}
        />
    );
};

interface AdaptiveSelectSectionProps extends AdaptiveSelectProps {
    sectionTitle: string;
    sectionDescription?: string;
}

const AdaptiveSelectSection = ({
    sectionTitle,
    sectionDescription,
    ...props
}: AdaptiveSelectSectionProps) => {
    return (
        <StorySection title={sectionTitle} description={sectionDescription}>
            <ControlledAdaptiveSelect {...props} />
        </StorySection>
    );
};

const AdaptiveSelectStates = (props: AdaptiveSelectProps) => {
    return (
        <>
            <AdaptiveSelectSection
                sectionTitle="Default"
                {...props}
                name="default"
            />
            <AdaptiveSelectSection
                sectionTitle="Disabled"
                {...props}
                name="disabled"
                isDisabled
            />
            <AdaptiveSelectSection
                sectionTitle="Placeholder"
                selectPlaceHolder="Choose Option"
                textInputPlaceHolder="Enter Value"
                {...props}
                name="placeholder"
            />
            <AdaptiveSelectSection
                sectionTitle="Required"
                {...props}
                name="required"
                isRequired
            />
            <AdaptiveSelectSection
                sectionTitle="Helper Text"
                {...props}
                name="helper-text"
                helperText={<HelperText msg="I have helper text" />}
            />
            <AdaptiveSelectSection
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
    title: 'Components/AdaptiveSelect',
    component: AdaptiveSelect,
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
        }
    },
    args: {
        label: 'Movies',
        name: 'movies',
        options,
        value: '',
        onSelectChange,
        onTextInputChange
    }
} satisfies Meta<typeof AdaptiveSelect>;

export default meta;

type StoryProps = StoryObj<typeof AdaptiveSelect>;

export const Playground: StoryProps = {
    decorators: Story => (
        <StorySection
            title=""
            description='Change various props in the "Controls" panel to see how they change behavior of the component'
        >
            <Story />
        </StorySection>
    ),
    render: function Playground(props) {
        const [adaptiveSelectValue, setAdaptiveSelectValue] =
            React.useState<AdaptiveSelectProps['value']>('');

        const onAdaptiveSelectChange: AdaptiveSelectProps['onSelectChange'] = (
            e,
            updatedValue
        ) => {
            onSelectChange(e, updatedValue);
            setAdaptiveSelectValue(updatedValue?.value ?? '');
        };

        const onAdaptiveSelectTextChange: AdaptiveSelectProps['onTextInputChange'] =
            e => {
                onTextInputChange(e);
                setAdaptiveSelectValue(e.target.value);
            };

        return (
            <AdaptiveSelect
                {...props}
                value={adaptiveSelectValue}
                onSelectChange={onAdaptiveSelectChange}
                onTextInputChange={onAdaptiveSelectTextChange}
            />
        );
    }
};

const allowedControls = ['label', 'name', 'id', 'size', 'sx'];

export const SelectInput: StoryProps = {
    parameters: {
        controls: {
            include: allowedControls
        }
    },
    render: props => <AdaptiveSelectStates {...props} />
};

export const TextInput: StoryProps = {
    parameters: {
        controls: {
            include: allowedControls
        }
    },
    args: { options: [] },
    render: props => <AdaptiveSelectStates {...props} />
};
