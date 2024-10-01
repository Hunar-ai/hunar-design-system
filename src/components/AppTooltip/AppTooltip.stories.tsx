import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@mui/material';

import { StorySection } from '@/components/storybook';
import { AppTooltip } from './AppTooltip';

import { TOOLTIP_PLACEMENT } from '@/Enum';

const meta = {
    title: 'Components/AppTooltip',
    component: AppTooltip,
    parameters: {
        controls: { expanded: true },
        description: `All props of MUI's Tooltip component can to be passed to AppTooltip`
    },
    argTypes: {
        placement: {
            control: 'select',
            options: Object.values(TOOLTIP_PLACEMENT),
            table: {
                type: { summary: `TooltipProps['placement']` },
                defaultValue: { summary: 'bottom' }
            }
        }
    },
    args: { title: 'Tooltip message', placement: 'bottom', leaveDelay: 100 }
} satisfies Meta<typeof AppTooltip>;

export default meta;

type StoryProps = StoryObj<typeof AppTooltip>;

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
        return (
            <AppTooltip {...props}>
                <Button>HOVER OVER ME</Button>
            </AppTooltip>
        );
    }
};
