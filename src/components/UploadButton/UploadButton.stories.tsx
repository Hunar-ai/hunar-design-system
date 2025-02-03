import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { blue } from '@mui/material/colors';

import { StorySection } from '@/components/storybook';
import { UploadButton, type UploadButtonProps } from './UploadButton';

import { ALLOWED_EXTENSION, BUTTON_SIZE } from '@/Enum';

const onChange = action('change');
const onRemove = action('remove');

const ALLOWED_EXTENSIONS = [
    ALLOWED_EXTENSION.PDF,
    ALLOWED_EXTENSION.DOCX,
    ALLOWED_EXTENSION.DOC,
    ALLOWED_EXTENSION.JPEG,
    ALLOWED_EXTENSION.JPG,
    ALLOWED_EXTENSION.PNG
];

const ControlledUploadButton = ({ value, ...props }: UploadButtonProps) => {
    const [valueState, setValueState] = React.useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
        setValueState(e.target.value);
    };

    const handleRemove = (name: string) => {
        onRemove(name);
        setValueState('');
    };

    return (
        <UploadButton
            {...props}
            value={valueState}
            onChange={handleChange}
            onRemove={handleRemove}
        />
    );
};

interface UploadButtonSectionProps extends UploadButtonProps {
    sectionTitle: string;
    sectionDescription?: string;
}

const UploadButtonSection = ({
    sectionTitle,
    sectionDescription,
    ...props
}: UploadButtonSectionProps) => {
    return (
        <StorySection title={sectionTitle} description={sectionDescription}>
            <ControlledUploadButton {...props} />
        </StorySection>
    );
};

const UploadButtonStates = (props: UploadButtonProps) => {
    return (
        <>
            <UploadButtonSection
                sectionTitle="Default"
                {...props}
                name="default"
            />
            <UploadButtonSection
                sectionTitle="With File"
                sectionDescription="Click on Upload button to select a file"
                {...props}
                value="sample.pdf"
            />
            <UploadButtonSection
                sectionTitle="Loading"
                {...props}
                value="sample.pdf"
                isLoading
            />
            <UploadButtonSection
                sectionTitle="Disabled"
                {...props}
                isDisabled
            />
            <UploadButtonSection
                sectionTitle="With Error"
                {...props}
                hasError
            />
            <UploadButtonSection
                sectionTitle="Without Icon"
                {...props}
                isStartIconVisible={false}
            />
            <UploadButtonSection
                sectionTitle="Button Size: Small"
                {...props}
                size={BUTTON_SIZE.small}
            />
            <UploadButtonSection
                sectionTitle="Button Size: Large"
                {...props}
                size={BUTTON_SIZE.large}
            />
            <UploadButtonSection
                sectionTitle="Custom File Name Length"
                sectionDescription="Max length of file name is set to 15 characters"
                {...props}
                value="very_long_file_name.pdf"
                filenameMaxLength={15}
            />
        </>
    );
};

const meta = {
    title: 'Components/UploadButton',
    component: UploadButton,
    parameters: { controls: { expanded: true } },
    argTypes: {
        size: {
            control: 'select',
            options: Object.values(BUTTON_SIZE)
        }
    },
    args: {
        name: 'uploadButton',
        title: 'UPLOAD',
        value: '',
        acceptFileType: ALLOWED_EXTENSIONS,
        primaryColor: blue[700],
        isFullWidth: true,
        onChange,
        onRemove
    }
} satisfies Meta<typeof UploadButton>;

export default meta;

type StoryProps = StoryObj<typeof UploadButton>;

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
        return <ControlledUploadButton {...props} value={value} />;
    }
};

export const States: StoryProps = {
    render: props => <UploadButtonStates {...props} />
};
