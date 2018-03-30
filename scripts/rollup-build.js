import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/index.js',
  plugins: [
    nodeResolve({
      browser: {
        'socket.io-client': 'socket.io-client/dist/socket.io.js'
      }
    }),
    commonjs(),
    babel({
      plugins: ['external-helpers']
    }),
    uglify(),
  ],
  output: [
    {
      format: 'es',
      file: 'dist/vue-socket.io-ext.esm.js',
    },
    {
      format: 'umd',
      name: 'VueSocketIOExt',
      exports: 'default',
      file: 'dist/vue-socket.io-ext.min.js',
    },
  ]
}
