import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { StorySection } from '@/components/storybook';
import { EditableTextField, EditableTextFieldProps } from './EditableTextField';

import { BUTTON_SIZE, TEXT_INPUT_VARIANT, FIELD_SIZE } from '@/Enum';

const onSave = action('save');

const ControlledEditableTextField = ({
    value,
    ...props
}: EditableTextFieldProps) => {
    const [valueState, setValueState] = React.useState(value);

    return (
        <EditableTextField
            {...props}
            value={valueState}
            onSave={modifiedValue => {
                onSave(modifiedValue);
                setValueState(modifiedValue);
            }}
        />
    );
};

interface EditableTextFieldSectionProps extends EditableTextFieldProps {
    sectionTitle: string;
    sectionDescription?: string;
}

const EditableTextFieldSection = ({
    sectionTitle,
    sectionDescription,
    ...props
}: EditableTextFieldSectionProps) => {
    return (
        <StorySection title={sectionTitle} description={sectionDescription}>
            <ControlledEditableTextField {...props} />
        </StorySection>
    );
};

const EditableTextFieldStates = (props: EditableTextFieldProps) => {
    return (
        <>
            <EditableTextFieldSection
                sectionTitle="Default"
                {...props}
                name="default"
            />
            <EditableTextFieldSection
                sectionTitle="Filled value"
                sectionDescription="Click on edit icon to change the filled value"
                {...props}
                value="1234"
            />
            <EditableTextFieldSection
                sectionTitle="Disabled"
                {...props}
                disabled
            />
            <EditableTextFieldSection
                sectionTitle="Required"
                {...props}
                required
            />
            <EditableTextFieldSection
                sectionTitle="Placeholder"
                sectionDescription="Try different value of `placeholder` from controls"
                {...props}
                label=""
            />
            <EditableTextFieldSection
                sectionTitle="Field Size: Medium"
                {...props}
                fieldSize={FIELD_SIZE.medium}
            />
            <EditableTextFieldSection
                sectionTitle="Button Size: Medium"
                {...props}
                buttonSize={BUTTON_SIZE.medium}
            />
            <EditableTextFieldSection
                sectionTitle="Button Size: Small"
                {...props}
                buttonSize={BUTTON_SIZE.small}
            />
            <EditableTextFieldSection
                sectionTitle="HelperText"
                {...props}
                helperMsg="This is helper text"
            />
            <EditableTextFieldSection
                sectionTitle="With validation"
                sectionDescription="Enter text longer than 4 characters to see error"
                {...props}
                handleIsValidCheck={inputValue => inputValue.length > 4}
                errorMsg="Must be smaller than 5 characters"
            />
            <EditableTextFieldSection
                sectionTitle="With validation"
                sectionDescription="Enter text longer than 5 characters to remove error"
                {...props}
                handleIsValidCheck={inputValue => inputValue.length < 5}
                errorMsg="Must be longer than 5 characters"
            />
        </>
    );
};

const meta = {
    title: 'Components/EditableTextField',
    component: EditableTextField,
    parameters: { controls: { expanded: true } },
    argTypes: {
        fieldSize: {
            control: 'select',
            options: [FIELD_SIZE.small, FIELD_SIZE.medium]
        },
        buttonSize: {
            control: 'select',
            options: [BUTTON_SIZE.small, BUTTON_SIZE.medium, BUTTON_SIZE.large]
        },
        variant: {
            control: 'select',
            options: [
                TEXT_INPUT_VARIANT.TEXT_FIELD,
                TEXT_INPUT_VARIANT.CURRENCY
            ]
        },
        textFieldType: {
            table: {
                type: { summary: `React.HTMLInputTypeAttribute` }
            },
            control: 'text'
        }
    },
    args: { value: '', onSave }
} satisfies Meta<typeof EditableTextField>;

export default meta;

type StoryProps = StoryObj<typeof EditableTextField>;

export const Playground: StoryProps = {
    decorators: Story => (
        <StorySection
            title=""
            description='Change various props in the "Controls" panel to see how they change behavior of the component'
        >
            <Story />
        </StorySection>
    ),
    render: function Playground({ value, ...props }) {
        const [valueState, setValueState] = React.useState(value);

        return (
            <EditableTextField
                {...props}
                value={valueState}
                onSave={modifiedValue => {
                    onSave(modifiedValue);
                    setValueState(modifiedValue);
                }}
            />
        );
    }
};

const variantAllowedControls = [
    'name',
    'variant',
    'id',
    'label',
    'primaryColor',
    'placeholder',
    'textFieldType',
    'inputFieldSx',
    'previewSx'
];

export const TextField: StoryProps = {
    parameters: {
        controls: {
            include: variantAllowedControls
        }
    },
    argTypes: { variant: { options: [TEXT_INPUT_VARIANT.TEXT_FIELD] } },
    args: { variant: TEXT_INPUT_VARIANT.TEXT_FIELD, label: 'TextField' },
    render: props => <EditableTextFieldStates {...props} />
};

export const CurrencyField: StoryProps = {
    parameters: {
        controls: {
            include: variantAllowedControls
        }
    },
    argTypes: { variant: { options: [TEXT_INPUT_VARIANT.CURRENCY] } },
    args: { variant: TEXT_INPUT_VARIANT.CURRENCY, label: 'Currency' },
    render: props => <EditableTextFieldStates {...props} />
};
