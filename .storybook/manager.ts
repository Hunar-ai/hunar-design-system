import { addons } from '@storybook/manager-api';

import { create } from '@storybook/theming/create';

const customTheme = create({
    base: 'light',
    brandTitle: 'Hunar',
    brandUrl: './',
    brandImage: '/logo-light.svg',
    brandTarget: '_self'
});

addons.setConfig({ theme: customTheme });
