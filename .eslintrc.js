module.exports = {
  // root: true,
  'extends': [
    '@vue/prettier',
    'plugin:vue/recommended',
  ],
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2018
  },
  rules: {
    semi: ['error', 'never'],
    'vue/max-attributes-per-line': [
      'error',
      {
        'singleline': 4,
        'multiline': {
          'max': 1,
          'allowFirstLine': false
        }
      }
    ]
  }
}