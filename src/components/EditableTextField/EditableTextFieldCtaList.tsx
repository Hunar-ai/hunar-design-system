import { Grid } from '@mui/material';

import { CustomButton } from '@/components/CustomButton';

import { BUTTON_SIZE } from '@/Enum';

interface EditableTextFieldCtaListProps {
    buttonSize: BUTTON_SIZE;
    primaryColor: string;
    isCancelDisabled: boolean;
    isSaveDisabled: boolean;
    onCancelClick: VoidFunction;
    onSaveClick: VoidFunction;
}

export const EditableTextFieldCtaList = ({
    buttonSize,
    primaryColor,
    isCancelDisabled,
    isSaveDisabled,
    onCancelClick,
    onSaveClick
}: EditableTextFieldCtaListProps) => {
    return (
        <Grid item xs={12} display="flex" justifyContent="end" columnGap={1.5}>
            <CustomButton
                variant="outlined"
                size={buttonSize}
                primaryColor={primaryColor}
                onClick={onCancelClick}
                disabled={isCancelDisabled}
            >
                CANCEL
            </CustomButton>
            <CustomButton
                variant="contained"
                size={buttonSize}
                primaryColor={primaryColor}
                onClick={onSaveClick}
                disabled={isSaveDisabled}
            >
                SAVE
            </CustomButton>
        </Grid>
    );
};
