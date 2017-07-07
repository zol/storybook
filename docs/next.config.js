const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { ANALYZE } = process.env;

module.exports = {
  distDir: 'build',
  poweredByHeader: false,
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
    }

    return config;
  },
};
