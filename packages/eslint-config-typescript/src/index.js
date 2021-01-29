module.exports = {
  globals: {
    MyGlobal: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  env: {
    node: true,
  },
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:mocha/recommended',
  ],
  rules: {
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'mocha/no-exclusive-tests': 'error',
  },
  ignorePatterns: [
    'dist',
    'src/migration/**/*.ts',
    'node_modules',
  ],
  overrides: [
    {
      files: [
        '*.js',
        '*.jsx',
      ],
      rules: {
        '@typescript-eslint/...': 'off',
        '@airbnb-typescript/...': 'off',
      },
    },
    {
      files: [
        '*.test.ts',
      ],
      rules: {
        'prefer-arrow-callback': 'off',
        'func-names': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        'mocha/no-hooks-for-single-case': 'off',
      },
    },
  ],
};
