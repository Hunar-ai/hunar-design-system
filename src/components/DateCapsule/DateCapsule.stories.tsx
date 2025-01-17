import type { Meta, StoryObj } from '@storybook/react';

import { StorySection } from '@/components/storybook';
import { DateCapsule } from './DateCapsule';

const meta = {
    title: 'Components/DateCapsule',
    component: DateCapsule,
    parameters: { controls: { expanded: true } },
    args: { date: new Date('2024-03-17') }
} satisfies Meta<typeof DateCapsule>;

export default meta;

type StoryProps = StoryObj<typeof DateCapsule>;

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
        return <DateCapsule {...props} />;
    }
};
