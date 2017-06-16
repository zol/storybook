const fs = require('fs');

module.exports = {
  distDir: 'build',
  poweredByHeader: false,
  webpack: config => {
    config.module.rules.push({ test: /\.md$/, use: 'raw-loader' });
    return config;
  },
};

const handler = path => {
  const file = `${__dirname}/${path.replace('content', 'pages').replace('.md', '.js')}`;
  fs.appendFileSync(file, ' ');
};
require('chokidar')
  .watch('./content', { ignoreInitial: true })
  .on('add', handler)
  .on('change', handler);
