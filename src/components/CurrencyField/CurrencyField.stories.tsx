import type { Meta, StoryObj } from '@storybook/react';

import { StorySection } from '@/components/storybook';
import { CurrencyField } from './CurrencyField';

import { FIELD_SIZE } from '@/Enum';

const meta = {
    title: 'Components/CurrencyField',
    component: CurrencyField,
    parameters: { controls: { expanded: true } },
    argTypes: {
        size: {
            control: 'select',
            options: Object.values(FIELD_SIZE)
        },
        thousandsGroupStyle: {
            control: 'select',
            options: ['thousand', 'lakh', 'wan', 'none']
        }
    },
    args: {
        id: 'currency-field',
        name: 'currencyField',
        value: '123456',
        label: 'Currency',
        fullWidth: true
    }
} satisfies Meta<typeof CurrencyField>;

export default meta;

type StoryProps = StoryObj<typeof CurrencyField>;

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
        return <CurrencyField {...props} />;
    }
};
