const fs = require('fs');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { ANALYZE, NODE_ENV } = process.env;

const isDev = NODE_ENV !== 'production';

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

if (isDev) {
  const handler = path => {
    const file = `${__dirname}/${path.replace('content', 'pages').replace('.md', '.js')}`;
    fs.appendFileSync(file, ' ');
  };
  require('chokidar')
    .watch('./content', { ignoreInitial: true })
    .on('add', handler)
    .on('change', handler);
}
