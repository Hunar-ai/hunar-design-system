import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Grid } from '@mui/material';

import { StorySection } from '@/components/storybook';
import { CopyToClipboard } from './CopyToClipboard';

import { BUTTON_SIZE } from '@/Enum';

const onClick = action('click');

interface CopyToClipboardSectionProps {
    children: React.ReactNode;
    sectionTitle: string;
    sectionDescription?: string;
}

const CopyToClipboardSection = ({
    sectionTitle,
    sectionDescription,
    children
}: CopyToClipboardSectionProps) => {
    return (
        <StorySection title={sectionTitle} description={sectionDescription}>
            <Grid
                container
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                gap={1}
            >
                {children}
            </Grid>
        </StorySection>
    );
};

const meta = {
    title: 'Components/CopyToClipboard',
    component: CopyToClipboard,
    parameters: { controls: { expanded: true } },
    args: {
        textToCopy: 'Text copied by clicking on button',
        iconSize: 24,
        onClick
    },
    argTypes: {
        buttonSize: { control: 'select', options: Object.values(BUTTON_SIZE) }
    }
} satisfies Meta<typeof CopyToClipboard>;

export default meta;

type StoryProps = StoryObj<typeof CopyToClipboard>;

export const Playground: StoryProps = {
    parameters: {
        description:
            'Change various props in the "Controls" panel to see how they change behavior of the component',
        hasDefaultSection: true
    },
    render: function Playground(props) {
        return <CopyToClipboard {...props} />;
    }
};

export const States: StoryProps = {
    parameters: {
        controls: {
            include: ['textToCopy', 'iconColor']
        }
    },
    render: function States(props) {
        return (
            <>
                <CopyToClipboardSection sectionTitle="Default">
                    <CopyToClipboard {...props} />
                </CopyToClipboardSection>
                <CopyToClipboardSection
                    sectionTitle="Outlined"
                    sectionDescription="left: 'Copied' message hidden; right: 'Copied' message visible"
                >
                    <CopyToClipboard {...props} isOutlined />
                    <Grid
                        item
                        minWidth="100px"
                        display="flex"
                        justifyContent="center"
                    >
                        <CopyToClipboard {...props} isOutlined showCopiedMsg />
                    </Grid>
                </CopyToClipboardSection>
                <CopyToClipboardSection sectionTitle="Show 'Copied' message">
                    <CopyToClipboard {...props} showCopiedMsg />
                </CopyToClipboardSection>
                <CopyToClipboardSection
                    sectionTitle="Custom Icon Size"
                    sectionDescription="Icon Font Size: 14, 16, 24 respectively (left to right)"
                >
                    <CopyToClipboard {...props} iconSize={14} />
                    <CopyToClipboard {...props} iconSize={16} />
                    <CopyToClipboard {...props} iconSize={24} />
                </CopyToClipboardSection>
                <CopyToClipboardSection
                    sectionTitle="Custom Button Size"
                    sectionDescription="Button Size: small, medium, large respectively (left to right)"
                >
                    <CopyToClipboard
                        {...props}
                        buttonSize={BUTTON_SIZE.small}
                    />
                    <CopyToClipboard
                        {...props}
                        buttonSize={BUTTON_SIZE.medium}
                    />
                    <CopyToClipboard
                        {...props}
                        buttonSize={BUTTON_SIZE.large}
                    />
                </CopyToClipboardSection>
                <CopyToClipboardSection
                    sectionTitle="Custom Button Size (Outlined )"
                    sectionDescription="Button Size: small, medium, large respectively (left to right)"
                >
                    <CopyToClipboard
                        {...props}
                        buttonSize={BUTTON_SIZE.small}
                        isOutlined
                    />
                    <CopyToClipboard
                        {...props}
                        buttonSize={BUTTON_SIZE.medium}
                        isOutlined
                    />
                    <CopyToClipboard
                        {...props}
                        buttonSize={BUTTON_SIZE.large}
                        isOutlined
                    />
                </CopyToClipboardSection>
            </>
        );
    }
};
