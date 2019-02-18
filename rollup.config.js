import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';

export default {
  input: 'src/js/smoothscroll.js',
  output: {
    file: 'dist/js/smoothscroll.js',
    format: 'umd',
    name: 'smoothscroll',
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    buble()
  ]
};
