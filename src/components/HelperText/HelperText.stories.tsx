import type { Meta, StoryObj } from '@storybook/react';

import { TextField } from '@mui/material';

import { StorySection } from '@/components/storybook';
import { HelperText } from './HelperText';

const meta = {
    title: 'Components/HelperText',
    component: HelperText,
    parameters: { controls: { expanded: true } },
    args: { errorMsg: 'Error', msg: 'This is helper text' }
} satisfies Meta<typeof HelperText>;

export default meta;

type StoryProps = StoryObj<typeof HelperText>;

export const Playground: StoryProps = {
    decorators: Story => (
        <StorySection
            title=""
            description='Change various props in the "Controls" panel to see how they change behavior of the component'
        >
            <TextField
                fullWidth
                helperText={<Story />}
                placeholder="Text input"
            />
        </StorySection>
    ),
    render: function Playground(props) {
        return <HelperText {...props} />;
    }
};
