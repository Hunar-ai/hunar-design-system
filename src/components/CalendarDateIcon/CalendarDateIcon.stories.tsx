import type { Meta, StoryObj } from '@storybook/react';

import { StorySection } from '@/components/storybook';
import { CalendarDateIcon } from './CalendarDateIcon';

const meta = {
    title: 'Components/CalendarDateIcon',
    component: CalendarDateIcon,
    parameters: { controls: { expanded: true } },
    args: {
        month: 'Mar',
        day: '17'
    }
} satisfies Meta<typeof CalendarDateIcon>;

export default meta;

type StoryProps = StoryObj<typeof CalendarDateIcon>;

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
        return <CalendarDateIcon {...props} />;
    }
};
