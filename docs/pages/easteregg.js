import React from 'react';

import { parser } from '../lib/reactRenderer';

import { generator } from '../components/Page';
import TopNav from '../components/TopNav';
import Content from '../components/Content';

import markdown from '../content/example.md';

const content = parser(markdown);

export default generator('RootExample', [
  <TopNav />,
  <Content>
    {content}
  </Content>,
]);
