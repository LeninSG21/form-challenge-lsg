module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  env: {
    jest: true,
    browser: true,
    node: true,
  },
  rules: {
    // prettier
    'prettier/prettier': ['error'],

    // react overrides
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
    'react/function-component-definition': [
      2,
      {
        namedComponents: ['function-declaration', 'arrow-function'],
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/react-in-jsx-scope': 'off', // not needed in React v18

    // import
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.jsx',
          '**/*.spec.jsx',
          '**/*.test.js',
          '**/*.spec.js',
          '**/*.test.tsx',
          '**/*.spec.tsx',
          '**/*.test.ts',
          '**/*.spec.ts',
        ],
      },
    ],

    // others
    'no-console': ['error', { allow: ['warn', 'info'] }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
