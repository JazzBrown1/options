import babel from 'rollup-plugin-babel';
import cleanup from 'rollup-plugin-cleanup';

export default [
  {
    input: 'src/index.js',
    plugins: [
      babel(), cleanup()
    ],
    output: [
      {
        file: './dist/main.js',
        format: 'cjs',
        name: 'options',
        esModule: false,
      }
    ]
  },
  {
    input: 'src/index.js',
    plugins: [
      babel(), cleanup()
    ],
    output: [
      {
        file: './dist/module.js',
        format: 'esm',
        name: 'options',
      }
    ]
  }
];
