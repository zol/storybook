import React from 'react';

import Page, { generator } from '../../components/Page';

import TopNav from '../../components/TopNav';
import { Content, MarkdownReactComponent as ReactComponent } from '../../components/Content';

import content from '../../content/docs/community.md';

export default generator('DocsCommunity', ({ path, query }) =>
  <Page>
    <TopNav {...{ path }} />
    <Content {...{ path, query, ReactComponent }}>
      {content}
    </Content>
  </Page>
);
