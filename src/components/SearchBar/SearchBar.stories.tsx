import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { SearchBar } from './SearchBar';
import { Box } from '@mui/material';

const setSearchValue = action('setSearchValue');

const meta = {
    title: 'Components/SearchBar',
    component: SearchBar,
    parameters: { controls: { expanded: true } },
    args: { setSearchValue, mobileSearchWidth: 'calc(100vw - 88px)' }
} satisfies Meta<typeof SearchBar>;

export default meta;

type StoryProps = StoryObj<typeof SearchBar>;

export const Playground: StoryProps = {
    parameters: {
        description:
            'Change various props in the "Controls" panel to see how they change behavior of the component',
        hasDefaultSection: true
    },
    decorators: Story => (
        <Box width="100%" textAlign="end">
            <Story />
        </Box>
    ),
    render: function Playground(props) {
        return <SearchBar {...props} />;
    }
};
