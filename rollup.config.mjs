import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { babel } from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";

// This is required to read package.json file when
// using Native ES modules in Node.js
// https://rollupjs.org/command-line-interface/#importing-package-json
import { createRequire } from "node:module";
const requireFile = createRequire(import.meta.url);
const packageJson = requireFile("./package.json");
const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default [
  {
    input: "src/index.ts",
    output: [
      {
        dir: "dist",
        entryFileNames: "[name].js",
        exports: "named",
        format: "cjs",
        preserveModules: true,
        preserveModulesRoot: "src",
      },
      {
        dir: "dist",
        entryFileNames: "[name].mjs",
        exports: "named",
        format: "es",
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions,
      }),
      commonjs(),
      terser({ compress: { directives: false } }),
      babel({
        babelHelpers: "runtime",
        extensions,
        exclude: "node_modules/**",
      }),
      typescript({
        tsconfig: "./tsconfig.build.json",
        declarationDir: "dist",
      }),
    ],
    external: [
      ...Object.keys(packageJson.dependencies || {}),
      ...Object.keys(packageJson.peerDependencies || {}),
    ],
  },
];

// TODO: test and add support for `'use client'`
// https://github.com/Ephem/rollup-plugin-preserve-directives?tab=readme-ov-file
