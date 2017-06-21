import React, { createElement } from 'react';
// import marksy from 'marksy/components';

import markdownIt from 'markdown-it';
import markdownItContainer from 'markdown-it-container';

import Head from 'next/head';
import Link from 'next/link';
import Page from '../components/Page';

import TopNav from '../components/TopNav';
import PageTitle from '../components/PageTitle';
import Split from '../components/Split';
import Container from '../components/Container';
import Toc from '../components/Toc';

import content from '../content/page2.md';

const md = markdownIt();
md.use(markdownItContainer, 'Test', {
  validate(params) {
    return params.trim().match(/^Test\s+(.*)$/);
  },

  render(tokens, idx) {
    const m = tokens[idx].info.trim().match(/^Test\s+(.*)$/);

    if (tokens[idx].nesting === 1) {
      return `<Test>
      ${md.utils.escapeHtml(m[1])}
      `;
    }
    return '</Test>\n';
  },
});

const toc = [];
const body = md.render(content);
const intro = '';

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
          <Toc toc={toc} />
        </nav>
        {body}
      </Split>
    </Container>
    <Link prefetch href="/"><a>I bet next has more stars (?)</a></Link>
  </Page>;
  