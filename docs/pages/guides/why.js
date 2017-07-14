import React from 'react';

import Page, { generator } from '../../components/Page';

import TopNav from '../../components/TopNav';
import { Content, MarkdownReactComponent as ReactComponent } from '../../components/Content';

import content from '../../content/guides/why.md';

export default generator('GuidesIndex', ({ path, query }) =>
  <Page>
    <TopNav {...{ path }} />
    <Content {...{ path, query, ReactComponent }}>
      {content}
    </Content>
  </Page>
);
