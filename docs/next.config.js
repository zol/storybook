const fs = require('fs');
const path = require('path');
const tree = require('./lib/dirToTree');

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
  const pages = tree(path.join(__dirname, 'pages')).then(data => {
    console.log('pages', JSON.stringify(data, null, 2));
  });
  const content = tree(path.join(__dirname, 'content')).then(data => {
    console.log('content', JSON.stringify(data, null, 2));
  });

  const handler = path => {
    const file = `${__dirname}/${path.replace('content', 'pages').replace('.md', '.js')}`;
    fs.appendFileSync(file, ' ');
  };
  require('chokidar')
    .watch('./content', { ignoreInitial: true })
    .on('add', handler)
    .on('change', handler);
}
