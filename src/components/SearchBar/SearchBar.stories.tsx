import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Box } from '@mui/material';

import { StorySection } from '@/components/storybook';
import { SearchBar, type SearchBarProps } from './SearchBar';

const setSearchValue = action('setSearchValue');

interface SearchBarSectionProps extends SearchBarProps {
    sectionTitle: string;
    sectionDescription?: string;
}

const SearchBarSection = ({
    sectionTitle,
    sectionDescription,
    ...props
}: SearchBarSectionProps) => {
    return (
        <StorySection title={sectionTitle} description={sectionDescription}>
            <Box width="100%" textAlign="end">
                <SearchBar {...props} />
            </Box>
        </StorySection>
    );
};

const meta = {
    title: 'Components/SearchBar',
    component: SearchBar,
    parameters: { controls: { expanded: true } },
    args: { setSearchValue, xsWidth: 'calc(100vw - 88px)' }
} satisfies Meta<typeof SearchBar>;

export default meta;

type StoryProps = StoryObj<typeof SearchBar>;

export const Playground: StoryProps = {
    decorators: Story => (
        <StorySection
            title=""
            description='Change various props in the "Controls" panel to see how they change behavior of the component'
        >
            <Box width="100%" textAlign="end">
                <Story />
            </Box>
        </StorySection>
    ),
    render: function Playground(props) {
        return <SearchBar {...props} />;
    }
};

export const States: StoryProps = {
    parameters: {
        controls: { exclude: ['placeholder', 'showMobileSearch'] },
        viewport: { defaultViewport: 'mobile2' }
    },
    render: function States(props) {
        return (
            <>
                <SearchBarSection sectionTitle="Default" {...props} />
                <SearchBarSection
                    sectionTitle="Placeholder"
                    {...props}
                    placeholder="Type here..."
                />
                <SearchBarSection
                    sectionTitle="Full width SearchBar on Mobile"
                    // eslint-disable-next-line max-len
                    sectionDescription="Set `showMobileSearch=false` to show desktop style SearchBar on Mobile. (Change screen size to mobile to note difference)"
                    {...props}
                    showMobileSearch={false}
                />
            </>
        );
    }
};
