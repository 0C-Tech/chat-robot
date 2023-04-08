const PROXY_CONFIG = {
  '/api': {
    'target': 'http://47.251.38.72/',
    'secure': false,
    'changeOrigin': true,
    'logLevel': 'debug'
  }
};

module.exports = PROXY_CONFIG;
