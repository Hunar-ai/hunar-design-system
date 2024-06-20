<p align='center'>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".storybook/public/logo-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset=".storybook/public/logo-light.svg" />

  <img align="center" width="200px" height="70px" src=".storybook/public/logo-light.svg"/>
</picture>
</p>

<h1 align='center'>Hunar Design System</h1>

<p align="center">
  <a title="package-version" href="https://www.npmjs.com/package/@hunar.ai/hunar-design-system">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@hunar.ai/hunar-design-system?color=blue">
  </a>
  <a title="build status" href="#">
    <img src="https://img.shields.io/static/v1?label=build&message=passing&color=GREEN" />
  </a>
  <a href="https://github.com/Hunar-ai/hunar-design-system/blob/main/LICENSE.md">
        <img src="https://img.shields.io/static/v1?label=license&message=MIT&color=GREEN" alt="License">
    </a>
  <a href="https://yarnpkg.com/" alt="yarn">
     <img src="https://img.shields.io/static/v1?label=maintained%20with&message=yarn&color=2188b6"/>
  </a>
</p>

[Docs](https://storybook--666ac08efe69dd9c59a1e4c6.chromatic.com) • [Installation](#installation) • [Usage](#usage)

Hunar Design System is a React component library used to build accessible and consistent experiences at [Hunar.ai](https://www.hunar.ai)

## Using the components

### Installation

The components library is built on top of [Material UI](https://mui.com/material-ui). Material UI needs to be installed in order to use this library. Run the following commands to install the necessary packages

```sh
yarn add @hunar.ai/hunar-design-system@latest @mui/material @emotion/react @emotion/styled
```

**Note**: ESM and commonJS module pattern are supported out of box

### Usage

1. Setup Material UI theme and global styles

   ```ts
   const root = ReactDOM.createRoot(document.getElementById("root")!);

   root.render(
     <ThemeProvider theme={theme}>
       <GlobalStyles styles={globalStyles} />
       <CssBaseline />
       <App />
     </ThemeProvider>
   );
   ```

2. Import and use components

   ```ts
   import * as React from "react";

   import { CustomSelect } from "@hunar.ai/hunar-design-system";

   export const App = () => {
     return <CustomSelect {...props} />;
   };
   ```

## Development

### Setup

Install packages and setup project using the following commands

```sh
yarn install
yarn run hook-install
```

Run the following command to start the development server

```sh
yarn start
```

## Publish

### Publishing storybook

Build storybook using the following command

```sh
yarn run build:storybook
```

In order to publish new version of storybook you should have `CHROMATIC_PROJECT_TOKEN` env variable present in `.env.local` file. Run the following command to publish a new version

```sh
yarn run publish:storybook
```

<!--
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fhshoff%2Fvx.svg?type=large)](https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fhshoff%2Fvx?ref=badge_large) -->

## Browser Support

This library works best on latest versions of Google Chrome and Chrome mobile. The browsers which satisfy the following browserlist conditions are supported

```json
"browserslist": [
  ">0.2%",
  "not dead",
  "not op_mini all"
],
```

For all non-supported browsers, the library will graceful degradate without any explicit error handling.
