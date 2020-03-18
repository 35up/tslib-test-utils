import typescript from '@rollup/plugin-typescript';
// eslint-disable-next-line import/extensions
import pkg from './package.json';

export default {
  input: './src/index.ts',
  output: {
    file: './build/library.esm.js',
    format: 'es',
    sourcemap: true,
  },
  external: Object.keys(pkg.dependencies || {}),
  plugins: [typescript()],
};
