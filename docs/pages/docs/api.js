import React from 'react';

import Page from '../../components/Page';

import { parser } from '../../lib/reactRenderer';

import TopNav from '../../components/TopNav';
import Content from '../../components/Content';
import Blocks from '../../components/Blocks';
import Container from '../../components/Container';

import markdown from '../../content/docs/api.md';

const content = parser(markdown);

export default () =>
  <Page>
    <TopNav />
    <Content>
      {content}
    </Content>
    <Container
      width={1000}
      vPadding={30}
      hPadding={30}
      background={'linear-gradient(135deg, rgb(109, 171, 245) 0%, rgb(162, 224, 94) 100%)'}
    >
      <h1>For development</h1>
      <Blocks colors={['rgba(0,0,0,0.08)']} max={4}>
        <p>bootstrapping the monorepo</p>
        <p>app architecture</p>
        <p>addon architecture</p>
        <p>releases</p>
        <p>open open source</p>
        <p>...</p>
      </Blocks>
    </Container>
  </Page>;
