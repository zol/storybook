import React from 'react';

import { parser } from '../lib/reactRenderer';

import Page from '../components/Page';
import TopNav from '../components/TopNav';
import Content from '../components/Content';

import markdown from '../content/example.md';

const content = parser(markdown);

export default () =>
  <Page>
    <TopNav />
    <Content>
      {content}
    </Content>
  </Page>;
