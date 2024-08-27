import { Grid } from '@mui/material';
import { grey } from '@mui/material/colors';
import { CustomButton } from '../CustomButton';

interface MobileDatePickerFooterProps {
    primaryColor: string;
    onConfirmClick: VoidFunction;
}

export const MobileDatePickerFooter = ({
    primaryColor,
    onConfirmClick
}: MobileDatePickerFooterProps) => {
    return (
        <Grid
            id="mobile-date-picker-footer"
            container
            justifyContent="end"
            alignItems="center"
            position="sticky"
            bottom={0}
            left={0}
            bgcolor="white"
            px={2}
            py={1.5}
            borderTop={`1px solid ${grey[200]}`}
        >
            <CustomButton
                size="large"
                variant="contained"
                onClick={onConfirmClick}
                primaryColor={primaryColor}
            >
                CONFIRM
            </CustomButton>
        </Grid>
    );
};
