import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { StorySection } from '@/components/storybook';
import { MobileDatePicker, MobileDatePickerProps } from './MobileDatePicker';

import { FIELD_SIZE } from '@/Enum';

const onChange = action('change');

const ControlledMobileDatePicker = ({
    value,
    ...props
}: MobileDatePickerProps) => {
    const [selectedValue, setSelectedValue] = React.useState(value);

    return (
        <MobileDatePicker
            {...props}
            value={selectedValue}
            onChange={modifiedValue => {
                onChange(modifiedValue);
                setSelectedValue(modifiedValue);
            }}
        />
    );
};

const meta = {
    title: 'Components/MobileDatePicker',
    component: MobileDatePicker,
    parameters: { controls: { expanded: true } },
    argTypes: {
        size: {
            control: 'select',
            options: [FIELD_SIZE.small, FIELD_SIZE.medium]
        }
    },
    args: {
        label: 'Dates',
        name: 'dates',
        value: null,
        onChange
    }
} satisfies Meta<typeof MobileDatePicker>;

export default meta;

type StoryProps = StoryObj<typeof MobileDatePicker>;

export const Playground: StoryProps = {
    render: function Playground(props) {
        return (
            <StorySection
                title=""
                // eslint-disable-next-line max-len
                description={`Change various props in the "Controls" panel to see how they change behavior of the component`}
            >
                <ControlledMobileDatePicker {...props} />
            </StorySection>
        );
    }
};
