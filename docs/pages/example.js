import React, { createElement } from 'react';
import marksy from 'marksy/components';

import Head from 'next/head';
import Link from 'next/link';
import Page from '../components/Page';

import TopNav from '../components/TopNav';
import PageTitle from '../components/PageTitle';
import Split from '../components/Split';
import Container from '../components/Container';
import Toc from '../components/Toc';

import content from '../content/example.md';

const compile = marksy({
  createElement,
  elements: {
    // codespan({ children }) {},
    mycustomcomponent(props) {
      return <h1>{props.children}</h1>;
    },
  },
});

const compiled = compile(content, {});

const splitContent = list => {
  const index = list.findIndex(item => item.type === 'h2');

  return [list.slice(0, index), list.slice(index)];
};

const [intro, body] = splitContent(compiled.tree);

console.log(body);

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
          <Toc toc={compiled.toc} />
        </nav>
        {body}
      </Split>
    </Container>
    <Link prefetch href="/"><a>I bet next has more stars (?)</a></Link>
  </Page>;
