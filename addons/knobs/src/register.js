import React from 'react';
import addons from '@storybook/addons';

import Panel from './components/Panel';

addons.register('storybooks/storybook-addon-knobs', api => {
  const channel = addons.getChannel();

  api.onStory((...args) => {
    console.log('knobs.api.onStory', args);
    // debugger;
  });

  addons.addPanel('storybooks/storybook-addon-knobs', {
    title: 'Knobs',
    render: () => <Panel channel={channel} api={api} key="knobs-panel" />,
  });
});
