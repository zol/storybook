const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { ANALYZE } = process.env;

const sitemap = (() => {
  try {
    // eslint-disable-next-line global-require
    return require('./lib/sitemap');
  } catch (error) {
    return {};
  }
})();

module.exports = {
  poweredByHeader: false,
  exportPathMap: () => Object.assign({ '/': { page: '/' }, '/demo': { page: '/demo' } }, sitemap),
  webpack: config => {
    config.module.rules.push({ test: /\.md$/, use: 'raw-loader' });

    if (ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 8888,
          openAnalyzer: true,
        })
      );
      config.devtool = 'source-map';
    }

    return config;
  },
};
