module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2020: true,
    node: true
  },
  extends: ['standard', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 11
  },
  rules: {
    camelcase: 'off',
    'no-console': ['warn'],
    'prettier/prettier': ['error']
  },
  ignorePatterns: ['**/__mocks__/**', 'node_modules/**', 'dist/**']
}
