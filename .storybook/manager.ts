import { addons } from '@storybook/manager-api';

import { create } from '@storybook/theming/create';

const customTheme = create({
    base: 'dark',
    brandTitle: 'Hunar',
    brandUrl: './',
    brandImage: '/logo-dark.svg',
    brandTarget: '_self'
});

addons.setConfig({ theme: customTheme });
