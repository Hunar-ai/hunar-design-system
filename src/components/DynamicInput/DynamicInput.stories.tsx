import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { StorySection } from '@/components/storybook';
import { HelperText } from '@/components/HelperText';
import { DynamicInput, type DynamicInputProps } from './DynamicInput';
import { options } from '@/components/Select/Select.stories';

import { FIELD_SIZE } from '@/Enum';

const onSelectChange = action('selectChange');
const onTextInputChange = action('textChange');

const ControlledDynamicInput = ({
    value,
    onSelectChange,
    onTextInputChange,
    ...props
}: DynamicInputProps) => {
    const [dynamicInputValue, setDynamicInputValue] =
        React.useState<DynamicInputProps['value']>(value);

    const handleSelectChange: DynamicInputProps['onSelectChange'] = (
        e,
        updatedValue,
        reason
    ) => {
        onSelectChange(e, updatedValue, reason);
        setDynamicInputValue(updatedValue?.value ?? '');
    };

    const handleTextChange: DynamicInputProps['onTextInputChange'] = e => {
        onTextInputChange(e);
        setDynamicInputValue(e.target.value);
    };

    return (
        <DynamicInput
            {...props}
            value={dynamicInputValue}
            onSelectChange={handleSelectChange}
            onTextInputChange={handleTextChange}
        />
    );
};

interface DynamicInputSectionProps extends DynamicInputProps {
    sectionTitle: string;
    sectionDescription?: string;
}

const DynamicInputSection = ({
    sectionTitle,
    sectionDescription,
    ...props
}: DynamicInputSectionProps) => {
    return (
        <StorySection title={sectionTitle} description={sectionDescription}>
            <ControlledDynamicInput {...props} />
        </StorySection>
    );
};

const DynamicInputStates = (props: DynamicInputProps) => {
    return (
        <>
            <DynamicInputSection
                sectionTitle="Default"
                {...props}
                name="default"
            />
            <DynamicInputSection
                sectionTitle="Disabled"
                {...props}
                name="disabled"
                isDisabled
            />
            <DynamicInputSection
                sectionTitle="Placeholder"
                selectPlaceHolder="Choose Option"
                textInputPlaceHolder="Enter Value"
                {...props}
                name="placeholder"
            />
            <DynamicInputSection
                sectionTitle="Required"
                {...props}
                name="required"
                isRequired
            />
            <DynamicInputSection
                sectionTitle="Helper Text"
                {...props}
                name="helper-text"
                helperText={<HelperText msg="I have helper text" />}
            />
            <DynamicInputSection
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
    title: 'Components/DynamicInput',
    component: DynamicInput,
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
} satisfies Meta<typeof DynamicInput>;

export default meta;

type StoryProps = StoryObj<typeof DynamicInput>;

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
        const [dynamicInputValue, setDynamicInputValue] =
            React.useState<DynamicInputProps['value']>('');

        const handleSelectChange: DynamicInputProps['onSelectChange'] = (
            e,
            updatedValue
        ) => {
            onSelectChange(e, updatedValue);
            setDynamicInputValue(updatedValue?.value ?? '');
        };

        const handleTextChange: DynamicInputProps['onTextInputChange'] = e => {
            onTextInputChange(e);
            setDynamicInputValue(e.target.value);
        };

        return (
            <DynamicInput
                {...props}
                value={dynamicInputValue}
                onSelectChange={handleSelectChange}
                onTextInputChange={handleTextChange}
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
    render: props => <DynamicInputStates {...props} />
};

export const TextInput: StoryProps = {
    parameters: {
        controls: {
            include: allowedControls
        }
    },
    args: { options: [] },
    render: props => <DynamicInputStates {...props} />
};
