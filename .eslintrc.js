// Defines console.error() as sole allowed console method
const errorMethodOnly = ['error', { allow: ['error'] }]
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  root: true,
  env: { node: true },
  extends: ['plugin:vue/recommended', '@vue/prettier'],
  parserOptions: { parser: 'babel-eslint' },
  rules: {
    'no-console': isDev ? 'off' : errorMethodOnly,
    'no-debugger': isDev ? 'off' : 'error',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 4,
        multiline: { max: 1, allowFirstLine: false },
      },
    ],
  },
}
