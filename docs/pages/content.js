import React from 'react';

import Link from 'next/link';
import Page from '../components/Page';

import { parser } from '../lib/reactRenderer';

import TopNav from '../components/TopNav';
import Content from '../components/Content';

import markdown from '../content/page3.md';

const content = parser(markdown);

export default () =>
  <Page>
    <TopNav />
    <Content>
      {content}
    </Content>
    <Link prefetch href="/">
      <a>I bet next has more stars (?)</a>
    </Link>
  </Page>;
