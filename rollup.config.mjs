import deleteOutputDir from "rollup-plugin-delete";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import { createRequire } from "node:module";

const requireFile = createRequire(import.meta.url);
const packageJson = requireFile("./package.json");
const extensions = [".js", ".jsx", ".ts", ".tsx"];
const outputDir = "dist";
const externalPkgs = [
  ...Object.keys(packageJson.dependencies || {}),
  ...Object.keys(packageJson.peerDependencies || {}),
];

export default [
  {
    external: (id) => externalPkgs.some((pkg) => id.includes(pkg)),
    input: "src/index.ts",
    output: [
      {
        dir: outputDir,
        entryFileNames: "[name].js",
        format: "cjs",
        preserveModules: true,
        preserveModulesRoot: "src",
      },
      {
        dir: outputDir,
        entryFileNames: "[name].esm.js",
        format: "es",
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    ],
    plugins: [
      deleteOutputDir({ targets: `${outputDir}/*` }),
      resolve({
        extensions,
      }),
      commonjs(),
      babel({
        babelHelpers: "runtime",
        extensions,
        exclude: "node_modules/**",
      }),
      typescript({
        tsconfig: "./tsconfig.build.json",
        declaration: false,
      }),
    ],
  },
];

// TODO: test and add support for `'use client'`
// https://github.com/Ephem/rollup-plugin-preserve-directives?tab=readme-ov-file
