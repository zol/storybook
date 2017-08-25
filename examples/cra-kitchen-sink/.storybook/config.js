import { configure, setAddon } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import infoAddon from '@storybook/addon-info';

const options = {
  name: 'My Storybook',
};

setOptions(options);
setAddon(infoAddon);

function loadStories() {
  require('../src/stories/index');
  require('../src/stories/storybook-components');
}

configure(loadStories, module);

export default {
  options: {
    name: 'My Storybook',
  },
  addons: [infoAddon],
  stories: [
    '../src/stories/index',
    '../src/stories/storybook-components'
  ],
  webpack: (config, env) => ({
    ...config,
  }),
  babel: (config, env) => ({
    ...config,
  }),
};