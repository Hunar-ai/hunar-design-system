import type { Preview } from '@storybook/react';
import '../src/index.css';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';

import { theme } from '../src/theme';

const preview: Preview = {
    parameters: {
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
        })
    ]
};

export default preview;
