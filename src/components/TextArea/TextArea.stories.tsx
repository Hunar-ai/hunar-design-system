import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { StorySection } from '@/components/storybook';
import { TextArea } from './TextArea';

import { FIELD_SIZE } from '@/Enum';

const onChange = action('change');

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
    render: function Playground(props) {
        return <TextArea {...props} />;
    }
};

export const States: StoryProps = {
    render: function States(props) {
        return (
            <>
                <StorySection title="Default">
                    <TextArea {...props} />
                </StorySection>
            </>
        );
    }
};
