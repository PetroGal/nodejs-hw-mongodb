// import globals from 'globals';
// import pluginJs from '@eslint/js';

// export default [
//   pluginJs.configs.recommended,
//   {
//     files: ['src/**/*.js'],
//     languageOptions: {
//       globals: globals.node,
//       env: { node: true }, // Ensure the Node.js environment is set
//     },
//     rules: {
//       semi: 'error',
//       'no-unused-vars': ['error', { args: 'none' }],
//       'no-undef': 'error',
//     },
//   },
// ];

import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  pluginJs.configs.recommended,
  {
    files: ['src/**/*.js'],
    languageOptions: { globals: globals.node },
    rules: {
      semi: 'error',
      'no-unused-vars': ['error', { args: 'none' }],
      'no-undef': 'error',
    },
  },
];
