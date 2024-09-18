import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { StorySection } from '@/components/storybook';
import { HelperText } from '@/components/HelperText';
import { CurrencyField, type CurrencyFieldProps } from './CurrencyField';

import { FIELD_SIZE } from '@/Enum';

const onChange = action('change');

const ControlledCurrencyField = ({ value, ...props }: CurrencyFieldProps) => {
    const [valueState, setValueState] = React.useState(value);

    return (
        <CurrencyField
            {...props}
            value={valueState}
            onChange={e => {
                onChange(e);
                setValueState(e.target.value);
            }}
        />
    );
};

interface CurrencyFieldSectionProps extends CurrencyFieldProps {
    sectionTitle: string;
    sectionDescription?: string;
}

const CurrencyFieldSection = ({
    sectionTitle,
    sectionDescription,
    ...props
}: CurrencyFieldSectionProps) => {
    return (
        <StorySection title={sectionTitle} description={sectionDescription}>
            <ControlledCurrencyField {...props} />
        </StorySection>
    );
};

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
        value: '1234567',
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

export const States: StoryProps = {
    parameters: {
        controls: {
            exclude: [
                'required',
                'size',
                'disabled',
                'error',
                'helperText',
                'thousandsGroupStyle'
            ]
        }
    },
    render: function States(props) {
        return (
            <>
                <CurrencyFieldSection
                    sectionTitle="Default"
                    {...props}
                    name="default"
                />
                <CurrencyFieldSection
                    sectionTitle="Disabled"
                    {...props}
                    disabled
                />
                <CurrencyFieldSection
                    sectionTitle="Required"
                    {...props}
                    required
                />
                <CurrencyFieldSection
                    sectionTitle="Placeholder"
                    sectionDescription="Try different value of `placeholder` from controls"
                    {...props}
                    label=""
                    value=""
                />
                <CurrencyFieldSection
                    sectionTitle="Field Size: Small"
                    {...props}
                    size={FIELD_SIZE.small}
                />
                <CurrencyFieldSection
                    sectionTitle="Thousands Group Style: thousand"
                    {...props}
                    thousandsGroupStyle="thousand"
                />

                <CurrencyFieldSection
                    sectionTitle="HelperText"
                    {...props}
                    helperText={<HelperText msg="This is helper text" />}
                />
                <CurrencyFieldSection
                    sectionTitle="With Error"
                    {...props}
                    error
                    helperText={
                        <HelperText hasError errorMsg="Invalid input" />
                    }
                />
            </>
        );
    }
};
