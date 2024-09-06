import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { StorySection } from '@/components/storybook';
import { HelperText } from '@/components/HelperText';
import {
    type DatePickerConfigProps,
    MobileDatePicker,
    type MobileDatePickerProps
} from './MobileDatePicker';

import { FIELD_SIZE, POPOVER_ORIGIN } from '@/Enum';

const onChange = action('change');

const customDateConfig: DatePickerConfigProps[] = [
    { type: 'year', format: 'YYYY', caption: 'Year', step: 1 },
    {
        type: 'month',
        format: 'MM',
        caption: 'Month',
        step: 1
    },
    { type: 'date', format: 'DD', caption: 'Day', step: 1 }
];
const customAnchorOrigin = POPOVER_ORIGIN.TOP_RIGHT;
const customTransformOrigin = POPOVER_ORIGIN.BOTTOM_RIGHT;

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

interface MobileDatePickerSectionProps extends MobileDatePickerProps {
    sectionTitle: string;
    sectionDescription?: string;
}

const MobileDatePickerSection = ({
    sectionTitle,
    sectionDescription,
    ...props
}: MobileDatePickerSectionProps) => {
    return (
        <StorySection title={sectionTitle} description={sectionDescription}>
            <ControlledMobileDatePicker {...props} />
        </StorySection>
    );
};

const MobileDatePickerStates = (props: MobileDatePickerProps) => {
    const getValuePreview = (modifiedValue: Date | string) => {
        return typeof modifiedValue === 'string'
            ? modifiedValue
            : modifiedValue.toLocaleDateString('en-IN', {
                  dateStyle: 'short'
              });
    };

    return (
        <>
            <MobileDatePickerSection
                sectionTitle="Default"
                {...props}
                name="default"
            />
            <MobileDatePickerSection
                sectionTitle="Filled Value"
                {...props}
                name="filled"
                value={new Date()}
            />
            <MobileDatePickerSection
                sectionTitle="Custom Value Preview"
                sectionDescription="The value is shown in DD/MM/YYYY format"
                {...props}
                name="value-preview"
                value={new Date()}
                getValuePreview={getValuePreview}
            />
            <MobileDatePickerSection
                sectionTitle="Custom Date Picker View"
                // eslint-disable-next-line max-len
                sectionDescription="The date picker is shown in YYYY MM DD format. Click on the input to see the behavior"
                {...props}
                name="custom-date-picker"
                dateConfig={customDateConfig}
            />
            <MobileDatePickerSection
                sectionTitle="Disabled"
                {...props}
                name="disabled"
                disabled
            />
            <MobileDatePickerSection
                sectionTitle="Required"
                {...props}
                name="required"
                required
            />
            <MobileDatePickerSection
                sectionTitle="Placeholder"
                sectionDescription='Here, the placeholder is "Choose Date". Try changing the placeholder from controls'
                {...props}
                name="placeholder"
                placeholder="Choose Date"
            />
            <MobileDatePickerSection
                sectionTitle="Field Size: small"
                {...props}
                size={FIELD_SIZE.small}
            />
            <MobileDatePickerSection
                sectionTitle="Min Date"
                sectionDescription="Min Date is set to 1 Jan 2023"
                {...props}
                name="min-date"
                minDate={new Date('1 Jan 2023')}
            />
            <MobileDatePickerSection
                sectionTitle="Max Date"
                sectionDescription="Max Date is set to Today"
                {...props}
                name="max-date"
                maxDate={new Date()}
            />
            <MobileDatePickerSection
                sectionTitle="Helper Text"
                {...props}
                name="helper-text"
                helperText={<HelperText msg="I have helper text" />}
            />
            <MobileDatePickerSection
                sectionTitle="Error"
                {...props}
                name="error"
                error
                helperText={<HelperText hasError errorMsg="I have error" />}
            />
            <MobileDatePickerSection
                sectionTitle="Custom Menu Placement (Desktop Only)"
                // eslint-disable-next-line max-len
                sectionDescription="Use `anchorOrigin`, `transformOrigin` and `menuMarginThreshold` to customize how the menu is placed"
                {...props}
                name="menu-placement"
                anchorOrigin={customAnchorOrigin}
                transformOrigin={customTransformOrigin}
            />
        </>
    );
};

const meta = {
    title: 'Components/MobileDatePicker',
    component: MobileDatePicker,
    parameters: {
        controls: { expanded: true },
        viewport: { defaultViewport: 'mobile1' }
    },
    argTypes: {
        size: {
            control: 'select',
            options: [FIELD_SIZE.small, FIELD_SIZE.medium]
        },
        anchorOrigin: {
            control: 'select',
            options: Object.values(POPOVER_ORIGIN)
        },
        transformOrigin: {
            control: 'select',
            options: Object.values(POPOVER_ORIGIN)
        }
    },
    args: {
        label: 'Date',
        name: 'date',
        value: null,
        onChange
    }
} satisfies Meta<typeof MobileDatePicker>;

export default meta;

type StoryProps = StoryObj<typeof MobileDatePicker>;

export const Playground: StoryProps = {
    render: function Playground(props) {
        return (
            <MobileDatePickerSection
                sectionTitle=""
                // eslint-disable-next-line max-len
                sectionDescription={`Change various props in the "Controls" panel to see how they change behavior of the component`}
                {...props}
            />
        );
    }
};

export const States: StoryProps = {
    parameters: {
        controls: {
            include: [
                'label',
                'id',
                'sx',
                'menuSx',
                'pickerHeaderTitle',
                'primaryColor',
                'placeholder',
                'anchorOrigin',
                'transformOrigin',
                'menuMarginThreshold'
            ]
        }
    },
    render: props => <MobileDatePickerStates {...props} />
};
