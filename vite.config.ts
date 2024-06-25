import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default () => {
    return defineConfig({
        assetsInclude: ['**/*.gltf'],
        // depending on your application, base can also be "/"
        optimizeDeps: {
            include: ['@mui/material/Tooltip', '@emotion/styled'],
            exclude: ['js-big-decimal']
        },
        base: '/',
        plugins: [
            viteTsconfigPaths(),
            react({
                jsxImportSource: '@emotion/react',
                babel: {
                    plugins: ['@emotion/babel-plugin']
                }
            })
        ],
        resolve: {
            alias: {
                '@/*': path.resolve(__dirname, './src/*')
            }
        },

        server: {
            // this ensures that the browser opens upon server start
            open: true,
            // this sets a default port to 3000
            port: 3000
        }
    });
};
