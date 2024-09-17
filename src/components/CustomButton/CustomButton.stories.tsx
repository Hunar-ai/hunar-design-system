import type { Meta, StoryObj } from '@storybook/react';

import { blue } from '@mui/material/colors';

import { StorySection } from '@/components/storybook';

import { CustomButton } from './CustomButton';

const meta = {
    title: 'Components/CustomButton',
    component: CustomButton,
    parameters: { controls: { expanded: true } },
    argTypes: {
        variant: {
            control: 'select',
            table: {
                type: { summary: `contained | outlined | text` }
            },
            options: ['contained', 'outlined', 'text']
        }
    },
    args: {
        primaryColor: blue[700],
        children: 'Button',
        variant: 'contained'
    }
} satisfies Meta<typeof CustomButton>;

export default meta;

type StoryProps = StoryObj<typeof CustomButton>;

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
        return <CustomButton {...props} />;
    }
};
