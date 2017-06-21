import React from 'react';

import Head from 'next/head';
import Link from 'next/link';
import Page from '../components/Page';

import { parser } from '../lib/reactRenderer';

import TopNav from '../components/TopNav';
import PageTitle from '../components/PageTitle';
import Split from '../components/Split';
import Container from '../components/Container';
import Toc from '../components/Toc';

import markdown from '../content/page3.md';

// const content = reactRenderer(md);

const toc = [];
const body = parser(markdown).contents;
const intro = '';

// console.log(<div>{createElement(content)}</div>);
// console.log(mdast);

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
