import React, { createElement } from 'react';
// import marksy from 'marksy/components';

import unified from 'unified';
import remarkParse from 'remark-parse';

import Head from 'next/head';
import Link from 'next/link';
import Page from '../components/Page';

import reactRenderer from '../lib/reactRenderer';
import myCustomBlocks from '../lib/myCustomBlocks';

import TopNav from '../components/TopNav';
import PageTitle from '../components/PageTitle';
import Split from '../components/Split';
import Container from '../components/Container';
import Toc from '../components/Toc';

import content from '../content/page3.md';

const processor = unified().use(remarkParse).use(myCustomBlocks);

const mdast = processor.parse(content);

const toc = [];
const body = '';
const intro = '';

console.log(toc);
console.log(mdast);

export default () =>
  <Page>
    <Head>
      <title>Ola signor!</title>
    </Head>
    <TopNav />
    <PageTitle minHeight={'auto'}>
      {intro}
    </PageTitle>

    <Container width={960} vSpacing={40}>
      <Split>
        <nav>
          <Toc toc={toc} />
        </nav>
        {body}
      </Split>
    </Container>
    <Link prefetch href="/"><a>I bet next has more stars (?)</a></Link>
  </Page>;
