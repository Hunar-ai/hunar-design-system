import type { Meta, StoryObj } from '@storybook/react';

import { DotDivider } from './DotDivider';
import { Box } from '@mui/material';

const meta = {
    title: 'Components/DotDivider',
    component: DotDivider,
    parameters: { controls: { expanded: true } },
    argTypes: {
        fontSize: {
            table: { type: { summary: `number | string` } },
            control: {
                type: 'number',
                min: 0,
                step: 1
            }
        }
    },
    args: { fontSize: 6 }
} satisfies Meta<typeof DotDivider>;

export default meta;

type StoryProps = StoryObj<typeof DotDivider>;

export const Playground: StoryProps = {
    parameters: {
        description:
            'Change various props in the "Controls" panel to see how they change behavior of the component',
        hasDefaultSection: true
    },
    render: function Playground(props) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
                columnGap={0.5}
            >
                Apple <DotDivider {...props} />
                Mango <DotDivider {...props} />
                Orange
            </Box>
        );
    }
};
