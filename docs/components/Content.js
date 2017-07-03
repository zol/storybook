import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import PageTitle from '../components/PageTitle';
import Container from '../components/Container';
import Split from '../components/Split';
import MarkdownContent from '../components/MarkdownContent';
import Toc from '../components/Toc';

const headingRegexp = /^h[1-6]$/;

const Content = ({ children }) => {
  const { toc, body, intro, header } = Children.toArray(children).reduce(
    (acc, item) => {
      try {
        if (acc.body.length === 0 && item.type === 'h1') {
          acc.header = item.props.children[0];
        }
        if (item.type.displayName === 'MarkdownReactComponent' && item.props.component === 'Toc') {
          acc.toc = item.props.children;
        } else if (acc.body.length === 0 && item.type !== 'h2') {
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
            <MarkdownContent>
              <h2>Other navigation</h2>
            </MarkdownContent>
          </nav>
          <MarkdownContent>
            {body}
          </MarkdownContent>
        </Split>
      </Container>
    </div>
  );
};

export default Content;
