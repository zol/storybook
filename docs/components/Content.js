import React, { Children } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import sitemap from '../lib/sitemap';

import PageTitle from './PageTitle';
import Container from './Container';
import Split from './Split';
import MarkdownContainer, { ReactComponent as MarkdownReactComponent } from './MarkdownContent';
import Toc from './Toc';
import SideNav from './SideNav';

const Content = ({ children }) => {
  const { toc, body, intro, header } = Children.toArray(children).reduce(
    (acc, item) => {
      try {
        if (acc.body.length === 0 && item.type === 'h1') {
          acc.header = item.props.children[0];
        }
        if (item.type.displayName === 'MarkdownReactComponent' && item.props.component === 'Toc') {
          acc.toc = item.props.children;
        } else if (
          acc.body.length === 0 &&
          (acc.intro.length === 0 || !`${item.type}`.match(/^h\d$/))
        ) {
          acc.intro.push(item);
        } else {
          acc.body.push(item);
        }
      } catch (error) {
        // debugger;
      }
      return acc;
    },
    { toc: [], body: [], intro: [], header: '' }
  );

  return (
    <div>
      <Head>
        <title>
          {`${header} - Storybook` || 'Storybook'}
        </title>
      </Head>
      <PageTitle minHeight={'auto'}>
        {intro}
      </PageTitle>
      <Container width={960} vSpacing={40}>
        <Split>
          <nav>
            <Toc toc={toc} />
            <MarkdownContainer>
              <h2>Other navigation</h2>
              <SideNav sitemap={sitemap} />
            </MarkdownContainer>
          </nav>
          <MarkdownContainer>
            {body}
          </MarkdownContainer>
        </Split>
      </Container>
    </div>
  );
};

Content.displayName = 'Content';
Content.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Content as default, Content, MarkdownReactComponent };
