import { Grid, IconButton, SxProps, Typography } from '@mui/material';
import { EditOutlined as EditOutlinedIcon } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

import { FIELD_SIZE } from '@/Enum';

interface ChatTextInputPreviewProps {
    value: string;
    fieldSize: FIELD_SIZE;
    sx?: SxProps;
    onEditClick: VoidFunction;
}

export const ChatTextInputPreview = ({
    value,
    fieldSize,
    sx = {},
    onEditClick
}: ChatTextInputPreviewProps) => {
    return (
        <Grid
            item
            display="flex"
            alignItems="center"
            columnGap={1}
            sx={{ outline: `1px solid ${grey[400]}`, ...sx }}
            borderRadius={1}
            px={1.75}
            py={fieldSize === FIELD_SIZE.small ? 0 : 1}
            maxWidth="100%"
        >
            <Typography
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
            >
                {value}
            </Typography>
            <IconButton sx={{ p: 1.25, mr: -1.25 }} onClick={onEditClick}>
                <EditOutlinedIcon fontSize="small" />
            </IconButton>
        </Grid>
    );
};
