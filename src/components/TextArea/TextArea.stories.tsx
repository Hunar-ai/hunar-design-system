import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { StorySection } from '@/components/storybook';
import { HelperText } from '@/components/HelperText';
import { TextArea, type TextAreaProps } from './TextArea';

import { FIELD_SIZE } from '@/Enum';

const onChange = action('change');

const ControlledTextArea = ({ value, ...props }: TextAreaProps) => {
    const [valueState, setValueState] = React.useState(value);

    return (
        <TextArea
            {...props}
            value={valueState}
            onChange={e => {
                onChange(e);
                setValueState(e.target.value);
            }}
        />
    );
};

interface TextAreaSectionProps extends TextAreaProps {
    sectionTitle: string;
    sectionDescription?: string;
}

const TextAreaSection = ({
    sectionTitle,
    sectionDescription,
    ...props
}: TextAreaSectionProps) => {
    return (
        <StorySection title={sectionTitle} description={sectionDescription}>
            <ControlledTextArea {...props} />
        </StorySection>
    );
};

const meta = {
    title: 'Components/TextArea',
    component: TextArea,
    parameters: { controls: { expanded: true } },
    argTypes: {
        size: {
            control: 'select',
            options: Object.values(FIELD_SIZE)
        },
        resize: {
            table: {
                type: { summary: `React.CSSProperties['resize']` }
            },
            control: 'select',
            options: [
                'none',
                'both',
                'horizontal',
                'vertical',
                'block',
                'inline'
            ]
        }
    },
    args: {
        id: 'textarea',
        name: 'textarea',
        placeholder: 'Type here...',
        value: '',
        onChange,
        fullWidth: true
    }
} satisfies Meta<typeof TextArea>;

export default meta;

type StoryProps = StoryObj<typeof TextArea>;

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
            <TextArea
                {...props}
                value={valueState}
                onChange={e => {
                    onChange(e);
                    setValueState(e.target.value);
                }}
            />
        );
    }
};

export const States: StoryProps = {
    parameters: {
        controls: {
            exclude: [
                'size',
                'required',
                'disabled',
                'error',
                'helperText',
                'minRows',
                'maxRows'
            ]
        }
    },
    render: function States(props) {
        return (
            <>
                <TextAreaSection
                    sectionTitle="Default"
                    {...props}
                    name="default"
                />
                <TextAreaSection sectionTitle="Disabled" {...props} disabled />
                <TextAreaSection sectionTitle="Required" {...props} required />
                <TextAreaSection
                    sectionTitle="Placeholder"
                    sectionDescription="Try different value of `placeholder` from controls"
                    {...props}
                    value=""
                />
                <TextAreaSection
                    sectionTitle="Field Size: Small"
                    {...props}
                    size={FIELD_SIZE.small}
                />
                <TextAreaSection
                    sectionTitle="Min. rows: 1"
                    {...props}
                    minRows={1}
                />
                <TextAreaSection
                    sectionTitle="Max. rows: 4"
                    sectionDescription="Enter very long text to see the textarea increase to upto 4 rows"
                    {...props}
                    maxRows={4}
                />
                <TextAreaSection
                    sectionTitle="Show Character helper text"
                    sectionDescription="Enter 4 or more characters to see remaining character text"
                    {...props}
                    value="lorem"
                    showCharHelpText
                />
                <TextAreaSection
                    sectionTitle="HelperText"
                    {...props}
                    helperText={<HelperText msg="This is helper text" />}
                />
                <TextAreaSection
                    sectionTitle="With Error"
                    {...props}
                    error
                    helperText={
                        <HelperText hasError errorMsg="Invalid input" />
                    }
                />
            </>
        );
    }
};
