import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { StorySection } from '@/components/storybook';
import { EditableTextArea, EditableTextAreaProps } from './EditableTextArea';

import { BUTTON_SIZE, FIELD_SIZE } from '@/Enum';

const onSave = action('save');

const ControlledEditableTextArea = ({
    value,
    ...props
}: EditableTextAreaProps) => {
    const [valueState, setValueState] = React.useState(value);

    return (
        <EditableTextArea
            {...props}
            value={valueState}
            onSave={modifiedValue => {
                onSave(modifiedValue);
                setValueState(modifiedValue);
            }}
        />
    );
};

interface EditableTextAreaSectionProps extends EditableTextAreaProps {
    sectionTitle: string;
    sectionDescription?: string;
}

const EditableTextAreaSection = ({
    sectionTitle,
    sectionDescription,
    ...props
}: EditableTextAreaSectionProps) => {
    return (
        <StorySection title={sectionTitle} description={sectionDescription}>
            <ControlledEditableTextArea {...props} />
        </StorySection>
    );
};

const EditableTextAreaStates = (props: EditableTextAreaProps) => {
    return (
        <>
            <EditableTextAreaSection
                sectionTitle="Default"
                {...props}
                name="default"
            />
            <EditableTextAreaSection
                sectionTitle="Filled value"
                sectionDescription="Click on edit icon to change the filled value"
                {...props}
                value="1234"
            />
            <EditableTextAreaSection
                sectionTitle="Disabled"
                {...props}
                disabled
            />
            <EditableTextAreaSection
                sectionTitle="Required"
                {...props}
                required
            />
            <EditableTextAreaSection
                sectionTitle="Placeholder"
                sectionDescription="Try different value of `placeholder` from controls"
                {...props}
            />
            <EditableTextAreaSection
                sectionTitle="Field Size: Medium"
                {...props}
                fieldSize={FIELD_SIZE.medium}
            />
            <EditableTextAreaSection
                sectionTitle="Button Size: Medium"
                {...props}
                buttonSize={BUTTON_SIZE.medium}
            />
            <EditableTextAreaSection
                sectionTitle="Button Size: Small"
                {...props}
                buttonSize={BUTTON_SIZE.small}
            />
            <EditableTextAreaSection
                sectionTitle="HelperText"
                {...props}
                helperMsg="This is helper text"
            />
            <EditableTextAreaSection
                sectionTitle="With validation"
                sectionDescription="Enter text longer than 4 characters to see error"
                {...props}
                handleIsValidCheck={inputValue => inputValue.length > 4}
                errorMsg="Must be smaller than 5 characters"
            />
            <EditableTextAreaSection
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
    title: 'Components/EditableTextArea',
    component: EditableTextArea,
    parameters: { controls: { expanded: true } },
    argTypes: {
        fieldSize: {
            control: 'select',
            options: [FIELD_SIZE.small, FIELD_SIZE.medium]
        },
        buttonSize: {
            control: 'select',
            options: [BUTTON_SIZE.small, BUTTON_SIZE.medium, BUTTON_SIZE.large]
        }
    },
    args: { value: '', onSave }
} satisfies Meta<typeof EditableTextArea>;

export default meta;

type StoryProps = StoryObj<typeof EditableTextArea>;

export const Playground: StoryProps = {
    render: function Playground(props) {
        return (
            <EditableTextAreaSection
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
    'variant',
    'id',
    'label',
    'primaryColor',
    'placeholder',
    'textFieldType',
    'inputFieldSx',
    'previewSx'
];

export const States: StoryProps = {
    parameters: {
        controls: {
            include: variantAllowedControls
        }
    },
    render: props => <EditableTextAreaStates {...props} />
};
