import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { StorySection } from '@/components/storybook';
import {
    KebabMenu,
    type KebabMenuProps,
    type KebabMenuOptionProps
} from './KebabMenu';
import { BUTTON_SIZE, POPOVER_ORIGIN, THEME_COLOR } from '@/Enum';

const onOptionClick = action('optionClick');
const onBtnClick = action('btnClick');
const onMenuClose = action('menuClose');

const options: KebabMenuOptionProps[] = [
    { label: 'Open', onClick: onOptionClick },
    { label: 'Close', onClick: onOptionClick },
    { label: 'Duplicate', onClick: onOptionClick }
];

const KebabMenuStates = (props: KebabMenuProps) => {
    return (
        <>
            <StorySection title="Default">
                <KebabMenu {...props} />
            </StorySection>
            <StorySection title="Disabled">
                <KebabMenu {...props} isDisabled />
            </StorySection>
            <StorySection title="Dense Menu: False">
                <KebabMenu {...props} isMenuDense={false} />
            </StorySection>
            <StorySection title="Size: Small">
                <KebabMenu {...props} size={BUTTON_SIZE.small} />
            </StorySection>
            <StorySection title="Size: Large">
                <KebabMenu {...props} size={BUTTON_SIZE.large} />
            </StorySection>
            <StorySection title="Color: Default">
                <KebabMenu {...props} color={THEME_COLOR.default} />
            </StorySection>
            <StorySection title="Color: Secondary">
                <KebabMenu {...props} color={THEME_COLOR.secondary} />
            </StorySection>
        </>
    );
};

const meta = {
    title: 'Components/KebabMenu',
    component: KebabMenu,
    parameters: { controls: { expanded: true } },
    argTypes: {
        size: { control: 'select', options: Object.values(BUTTON_SIZE) },
        color: { control: 'select', options: Object.values(THEME_COLOR) },
        anchorOrigin: {
            control: 'select',
            options: Object.values(POPOVER_ORIGIN)
        },
        transformOrigin: {
            control: 'select',
            options: Object.values(POPOVER_ORIGIN)
        }
    },
    args: { options, onBtnClick, onMenuClose }
} satisfies Meta<typeof KebabMenu>;

export default meta;

type StoryProps = StoryObj<typeof KebabMenu>;

export const Playground: StoryProps = {
    render: function Playground(props) {
        return (
            <StorySection
                title=""
                // eslint-disable-next-line max-len
                description={`Change various props in the "Controls" panel to see how they change behavior of the component`}
            >
                <KebabMenu {...props} />
            </StorySection>
        );
    }
};

export const DefaultVariant: StoryProps = {
    parameters: {
        controls: { include: ['anchorOrigin', 'transformOrigin', 'iconSx'] }
    },
    args: { isOutlined: false },
    render: function Outlined(props) {
        return <KebabMenuStates {...props} />;
    }
};

export const OutlinedVariant: StoryProps = {
    parameters: {
        controls: { include: ['anchorOrigin', 'transformOrigin', 'iconSx'] }
    },
    args: { isOutlined: true },
    render: function Outlined(props) {
        return <KebabMenuStates {...props} />;
    }
};
