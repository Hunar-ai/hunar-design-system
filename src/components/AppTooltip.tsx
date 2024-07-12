import { Tooltip, type TooltipProps, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';

export type AppTooltipProps = TooltipProps;

export const AppTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black
    }
}));
