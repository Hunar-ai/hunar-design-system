import { Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

interface StorySectionProps {
    title: string;
    children: React.ReactNode;
    description?: string;
}

export const StorySection = ({
    title,
    children,
    description
}: StorySectionProps) => {
    return (
        <Grid
            container
            justifyContent="center"
            p={2}
            pb={3}
            rowGap={3}
            border={`1px solid ${grey[100]}`}
            borderRadius={1.5}
            bgcolor="#FFF"
            id={`story-section-${title.toLowerCase()}`}
        >
            <Grid item xs={12}>
                <Typography fontWeight={600}>{title}</Typography>
                {description && (
                    <Typography color={grey[700]} variant="body2" mt={0.5}>
                        {description}
                    </Typography>
                )}
            </Grid>
            <Grid item xs={12} sm={5} display="flex" justifyContent="center">
                {children}
            </Grid>
        </Grid>
    );
};
