import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

interface PlaceholderPreviewProps {
    placeholderText: string;
}

export const PlaceholderPreview = ({
    placeholderText
}: PlaceholderPreviewProps) => {
    return <Typography sx={{ color: grey[600] }}>{placeholderText}</Typography>;
};
