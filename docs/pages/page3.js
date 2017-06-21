import React, { createElement } from 'react';
import createFragment from 'react-addons-create-fragment';

import Head from 'next/head';
import Link from 'next/link';
import Page from '../components/Page';

import reactRenderer, { Component } from '../lib/reactRenderer';

import TopNav from '../components/TopNav';
import PageTitle from '../components/PageTitle';
import Split from '../components/Split';
import Container from '../components/Container';
import Toc from '../components/Toc';

import md from '../content/page3.md';

// const content = reactRenderer(md);

const toc = [];
const body = '';
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
        <Component markdown={md} />
      </Split>
    </Container>
    <Link prefetch href="/"><a>I bet next has more stars (?)</a></Link>
  </Page>;
  