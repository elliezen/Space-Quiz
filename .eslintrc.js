module.exports = {
  env: {
    browser: true,
  },
  parser: 'babel-eslint',
  'plugins': [
    'html'
  ],
  'extends': 'standard',
  rules: {
    'semi': 0,
    'space-before-function-paren': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
};
