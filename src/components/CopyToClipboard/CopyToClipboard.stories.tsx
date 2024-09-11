import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Grid } from '@mui/material';

import { StorySection } from '@/components/storybook';
import { CopyToClipboard } from './CopyToClipboard';
import { BUTTON_SIZE } from '@/Enum';

const onClick = action('click');

const meta = {
    title: 'Components/CopyToClipboard',
    component: CopyToClipboard,
    parameters: { controls: { expanded: true } },
    args: {
        textToCopy: 'Text copied by clicking on button',
        iconFontSize: 24,
        onClick
    },
    argTypes: {
        buttonSize: { control: 'select', options: Object.values(BUTTON_SIZE) }
    }
} satisfies Meta<typeof CopyToClipboard>;

export default meta;

type StoryProps = StoryObj<typeof CopyToClipboard>;

export const Playground: StoryProps = {
    render: function Playground(props) {
        return (
            <StorySection
                title=""
                // eslint-disable-next-line max-len
                description={`Change various props in the "Controls" panel to see how they change behavior of the component`}
            >
                <CopyToClipboard {...props} />
            </StorySection>
        );
    }
};

export const States: StoryProps = {
    parameters: {
        controls: {
            include: ['textToCopy', 'iconSx']
        }
    },
    render: function States(props) {
        return (
            <>
                <StorySection title="Default">
                    <CopyToClipboard {...props} />
                </StorySection>
                <StorySection
                    title="Outlined"
                    description="left: 'Copied' message hidden; right: 'Copied' message visible"
                >
                    <Grid
                        container
                        flexDirection="row"
                        justifyContent="center"
                        gap={1}
                    >
                        <Grid item display="flex" justifyContent="center">
                            <CopyToClipboard
                                {...props}
                                isOutlined
                                showCopiedMsg={false}
                            />
                        </Grid>
                        <Grid
                            item
                            minWidth="100px"
                            display="flex"
                            justifyContent="center"
                        >
                            <CopyToClipboard {...props} isOutlined />
                        </Grid>
                    </Grid>
                </StorySection>
                <StorySection title="Hide 'Copied' message">
                    <CopyToClipboard {...props} showCopiedMsg={false} />
                </StorySection>
                <StorySection
                    title="Custom Icon Size"
                    description="Icon Font Size: 14, 16, 24 respectively (left to right)"
                >
                    <Grid
                        container
                        flexDirection="row"
                        justifyContent="center"
                        alignItems="center"
                        gap={1}
                    >
                        <CopyToClipboard
                            {...props}
                            iconFontSize={14}
                            showCopiedMsg={false}
                        />
                        <CopyToClipboard
                            {...props}
                            iconFontSize={16}
                            showCopiedMsg={false}
                        />
                        <CopyToClipboard
                            {...props}
                            iconFontSize={24}
                            showCopiedMsg={false}
                        />
                    </Grid>
                </StorySection>
                <StorySection
                    title="Custom Button Size"
                    description="Button Size: small, medium, large respectively (left to right)"
                >
                    <Grid
                        container
                        flexDirection="row"
                        justifyContent="center"
                        alignItems="center"
                        gap={1}
                    >
                        <CopyToClipboard
                            {...props}
                            buttonSize={BUTTON_SIZE.small}
                            showCopiedMsg={false}
                        />
                        <CopyToClipboard
                            {...props}
                            buttonSize={BUTTON_SIZE.medium}
                            showCopiedMsg={false}
                        />
                        <CopyToClipboard
                            {...props}
                            buttonSize={BUTTON_SIZE.large}
                            showCopiedMsg={false}
                        />
                    </Grid>
                </StorySection>
                <StorySection
                    title="Custom Button Size (isOutlined)"
                    description="Button Size: small, medium, large respectively (left to right)"
                >
                    <Grid
                        container
                        width="100%"
                        flexDirection="row"
                        justifyContent="center"
                        alignItems="center"
                        gap={1}
                    >
                        <CopyToClipboard
                            {...props}
                            buttonSize={BUTTON_SIZE.small}
                            isOutlined
                            showCopiedMsg={false}
                        />
                        <CopyToClipboard
                            {...props}
                            buttonSize={BUTTON_SIZE.medium}
                            isOutlined
                            showCopiedMsg={false}
                        />
                        <CopyToClipboard
                            {...props}
                            buttonSize={BUTTON_SIZE.large}
                            isOutlined
                            showCopiedMsg={false}
                        />
                    </Grid>
                </StorySection>
            </>
        );
    }
};
