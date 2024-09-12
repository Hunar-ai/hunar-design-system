import { Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { StorySection } from './StorySection';

interface StoryLayoutProps {
    title: string;
    children: React.ReactNode;
    description?: string;
    hasDefaultSection?: boolean;
}

export const StoryLayout = ({
    title,
    children,
    description,
    hasDefaultSection = false
}: StoryLayoutProps) => {
    return (
        <Grid
            display="flex"
            flexDirection="column"
            gap={2}
            p={1}
            bgcolor={grey[50]}
            id="story-layout"
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
            {hasDefaultSection ? (
                <StorySection title="">{children}</StorySection>
            ) : (
                <>{children}</>
            )}
        </Grid>
    );
};
