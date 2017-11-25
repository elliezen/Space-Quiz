module.exports = {
  env: {
    browser: true,
  },
  parser: 'babel-eslint',
  'plugins': [
    'html'
  ],
  'extends': 'airbnb-base',
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'webpack.config.js'
      }
    }
  },
  'rules': {
    'import/extensions': ['error', 'always', {
      'js': 'never'
    }],
    'comma-dangle': ['error', 'never']
  }
};
