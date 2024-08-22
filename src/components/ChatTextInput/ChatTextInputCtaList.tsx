import { Grid } from '@mui/material';

import { BrandedButton } from '@/components/BrandedButton';

import { BUTTON_SIZE } from '@/Enum';

interface ChatTextInputCtaListProps {
    buttonSize: BUTTON_SIZE;
    primaryColor: string;
    isCancelDisabled: boolean;
    isSaveDisabled: boolean;
    onCancelClick: VoidFunction;
    onSaveClick: VoidFunction;
}

export const ChatTextInputCtaList = ({
    buttonSize,
    primaryColor,
    isCancelDisabled,
    isSaveDisabled,
    onCancelClick,
    onSaveClick
}: ChatTextInputCtaListProps) => {
    return (
        <Grid item xs={12} display="flex" justifyContent="end" columnGap={1.5}>
            <BrandedButton
                variant="outlined"
                size={buttonSize}
                primaryColor={primaryColor}
                onClick={onCancelClick}
                disabled={isCancelDisabled}
            >
                CANCEL
            </BrandedButton>
            <BrandedButton
                variant="contained"
                size={buttonSize}
                primaryColor={primaryColor}
                onClick={onSaveClick}
                disabled={isSaveDisabled}
            >
                SAVE
            </BrandedButton>
        </Grid>
    );
};
