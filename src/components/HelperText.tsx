import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ErrorOutline as ErrorOutlineIcon } from '@mui/icons-material';

type HelperTextMsgProps =
    | { msg: string; errorMsg?: string }
    | { msg?: string; errorMsg: string };

export type HelperTextProps = HelperTextMsgProps & {
    hasError?: boolean;
};

export const HelperText = ({
    hasError = false,
    errorMsg = '',
    msg = ''
}: HelperTextProps) => {
    const theme = useTheme();

    if (!hasError) {
        return <>{msg}</>;
    }

    return (
        <Grid
            container
            alignItems="center"
            columnGap={1}
            color={theme.palette.error.main}
            component="span"
        >
            <ErrorOutlineIcon fontSize="small" />
            <Grid item xs component="span">
                <Typography component="span" variant="caption">
                    {errorMsg}
                </Typography>
            </Grid>
        </Grid>
    );
};
