// Configuration adapted from https://github.com/algolia/rollup-jest-boilerplate

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import { uglify } from "rollup-plugin-uglify";

import { sizeSnapshot } from "rollup-plugin-size-snapshot";

const input = 'src/main.js';

const external = ['@bemto/core'];

const umdOutput = {
  name: 'index',
  file: pkg.browser,
  format: 'umd',
  globals: {
    '@bemto/core': 'bemto',
  }
};

const cjsOutput = {
  file: pkg.main,
  format: 'cjs',
};

const esOutput = {
  file: pkg.module,
  format: 'es',
};

const umdPlugins = [
  resolve(),
  babel({ exclude: 'node_modules/**' }),
  commonjs(),
];

// TODO: Should I include resolve/commonjs here?
const esPlugins = [
  babel({ exclude: 'node_modules/**' }),
];

if (process.env.SNAPSHOTS) {
  umdPlugins.push(sizeSnapshot());
  esPlugins.push(sizeSnapshot());
}

// Should go after the snapshots
umdPlugins.push(uglify());

const defaultBuildConfig = [
  {
    input,
    external,
    output: umdOutput,
    plugins: umdPlugins,
  },
  {
    input,
    external,
    output: [cjsOutput, esOutput],
    plugins: esPlugins,
  },
];

const testBuildConfig = [
  {
    input,
    external,
    output: cjsOutput,
    plugins: esPlugins,
  },
];

const buildConfig = process.env.TESTING ? testBuildConfig : defaultBuildConfig;

export default buildConfig;
