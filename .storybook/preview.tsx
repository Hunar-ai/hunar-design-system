import React from 'react';

import type { Preview } from '@storybook/react';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { grey } from '@mui/material/colors';

import { theme } from '../src/theme';
import { StoryLayout } from '../src/components/storybook';
import '../src/index.css';

const preview: Preview = {
    parameters: {
        backgrounds: {
            default: 'grey',
            values: [
                {
                    name: 'grey',
                    value: grey[50]
                }
            ]
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        }
    },
    tags: ['autodocs'],
    decorators: [
        withThemeFromJSXProvider({
            GlobalStyles: CssBaseline,
            Provider: ThemeProvider,
            themes: {
                light: theme
            },
            defaultTheme: 'light'
        }),
        (Story, { name, parameters }) => (
            <StoryLayout title={name} description={parameters.description}>
                <Story />
            </StoryLayout>
        )
    ]
};

export default preview;
