const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@app': 'src',
  })(config);

  return config;
};
