import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { StorySection } from '@/components/storybook';
import { ChatTextInput, ChatTextInputProps } from './ChatTextInput';

import { BUTTON_SIZE, TEXT_INPUT_VARIANT, FIELD_SIZE } from '@/Enum';

const onSave = action('save');

const ControlledChatTextInput = ({ value, ...props }: ChatTextInputProps) => {
    const [valueState, setValueState] = React.useState(value);

    return (
        <ChatTextInput
            {...props}
            value={valueState}
            onSave={modifiedValue => {
                onSave(modifiedValue);
                setValueState(modifiedValue);
            }}
        />
    );
};

interface ChatTextInputSectionProps extends ChatTextInputProps {
    sectionTitle: string;
    sectionDescription?: string;
}

const ChatTextInputSection = ({
    sectionTitle,
    sectionDescription,
    ...props
}: ChatTextInputSectionProps) => {
    return (
        <StorySection title={sectionTitle} description={sectionDescription}>
            <ControlledChatTextInput {...props} />
        </StorySection>
    );
};

const ChatTextInputStates = (props: ChatTextInputProps) => {
    return (
        <>
            <ChatTextInputSection
                sectionTitle="Default"
                {...props}
                name="default"
            />
            <ChatTextInputSection
                sectionTitle="Filled value"
                sectionDescription="Click on edit icon to change the filled value"
                {...props}
                value="1234"
            />
            <ChatTextInputSection sectionTitle="Disabled" {...props} disabled />
            <ChatTextInputSection sectionTitle="Required" {...props} required />
            <ChatTextInputSection
                sectionTitle="Placeholder"
                sectionDescription="Try different value of `placeholder` from controls"
                {...props}
                label=""
            />
            <ChatTextInputSection
                sectionTitle="Field Size: Medium"
                {...props}
                fieldSize={FIELD_SIZE.medium}
            />
            <ChatTextInputSection
                sectionTitle="Button Size: Medium"
                {...props}
                buttonSize={BUTTON_SIZE.medium}
            />
            <ChatTextInputSection
                sectionTitle="Button Size: Small"
                {...props}
                buttonSize={BUTTON_SIZE.small}
            />
            <ChatTextInputSection
                sectionTitle="HelperText"
                {...props}
                helperMsg="This is helper text"
            />
            <ChatTextInputSection
                sectionTitle="With validation"
                sectionDescription="Enter text longer than 4 characters to see error"
                {...props}
                handleIsValidCheck={inputValue => inputValue.length > 4}
                errorMsg="Must be smaller than 5 characters"
            />
            <ChatTextInputSection
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
    title: 'Components/ChatTextInput',
    component: ChatTextInput,
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
                TEXT_INPUT_VARIANT.TEXT_AREA,
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
} satisfies Meta<typeof ChatTextInput>;

export default meta;

type StoryProps = StoryObj<typeof ChatTextInput>;

export const Playground: StoryProps = {
    render: function Playground(props) {
        return (
            <ChatTextInputSection
                sectionTitle=""
                // eslint-disable-next-line max-len
                sectionDescription={`Change various props in the "Controls" panel to see how they change behavior of the component`}
                {...props}
            />
        );
    }
};

const variantAllowedControls = [
    'name',
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
    args: { variant: TEXT_INPUT_VARIANT.TEXT_FIELD, label: 'TextField' },
    render: props => <ChatTextInputStates {...props} />
};

export const TextArea: StoryProps = {
    parameters: {
        controls: {
            include: variantAllowedControls
        }
    },
    args: { variant: TEXT_INPUT_VARIANT.TEXT_AREA, label: 'TextArea' },
    render: props => <ChatTextInputStates {...props} />
};

export const CurrencyField: StoryProps = {
    parameters: {
        controls: {
            include: variantAllowedControls
        }
    },
    args: { variant: TEXT_INPUT_VARIANT.CURRENCY, label: 'Currency' },
    render: props => <ChatTextInputStates {...props} />
};
