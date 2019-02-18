import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';

export default {
  input: 'src/js/EasyScroll.js',
  output: {
    file: 'dist/js/EasyScroll.js',
    format: 'umd',
    name: 'EasyScroll',
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    buble()
  ]
};
