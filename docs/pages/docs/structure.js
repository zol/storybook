import React from 'react';

import Page, { generator } from '../../components/Page';

import TopNav from '../../components/TopNav';
import { Content, MarkdownReactComponent as ReactComponent } from '../../components/Content';

import content from '../../content/docs/structure.md';

export default generator('DocsStructure', ({ path, query }) =>
  <Page>
    <TopNav {...{ path }} />
    <Content {...{ path, query, ReactComponent }}>
      {content}
    </Content>
  </Page>
);
