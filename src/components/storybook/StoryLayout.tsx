import { Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

interface StoryLayoutProps {
    title: string;
    children: React.ReactNode;
    description?: string;
}

export const StoryLayout = ({
    title,
    children,
    description
}: StoryLayoutProps) => {
    return (
        <Grid
            display="flex"
            flexDirection="column"
            gap={2}
            p={1}
            bgcolor={grey[50]}
        >
            <Grid>
                <Typography variant="h5" fontWeight={700}>
                    {title}
                </Typography>
                {description && (
                    <Typography color={grey[700]} variant="body2" mt={0.5}>
                        {description}
                    </Typography>
                )}
            </Grid>
            {children}
        </Grid>
    );
};
