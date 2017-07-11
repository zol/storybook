import React from 'react';

import { parser } from '../lib/reactRenderer';

import Page, { generator } from '../components/Page';
import TopNav from '../components/TopNav';
import Content from '../components/Content';

import markdown from '../content/example.md';

const content = parser(markdown);

export default generator('RootExample', ({ path, query }) =>
  <Page>
    <TopNav {...{ path }} />
    <Content {...{ path, query }}>
      {content}
    </Content>
  </Page>
);
 