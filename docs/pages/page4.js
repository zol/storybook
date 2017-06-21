import React, { createElement } from 'react';
import glamorous from 'glamorous';

import unified from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeReact from 'rehype-react';

import Head from 'next/head';
import Link from 'next/link';
import Page from '../components/Page';

import TopNav from '../components/TopNav';
import PageTitle from '../components/PageTitle';
import Split from '../components/Split';
import Container from '../components/Container';
import Toc from '../components/Toc';

import content from '../content/page4.md';

const Test = glamorous.div({
  background: 'hotpink',
});

const processor = unified()
  .use(remarkParse, { footnotes: true })
  .use(remarkRehype, {
    allowDangerousHTML: true,
    handlers: {
      HTML: Test,
    },
  })
  .use(rehypeRaw);
// .use(rehypeReact, {
//   createElement,
// });

const out = processor.parse(content);
console.log(out);

const toc = [];
const body = out.contents || '';
const intro = '';

console.log(out.contents);

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
  