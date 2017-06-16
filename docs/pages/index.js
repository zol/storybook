import React from 'react';
import glamorous from 'glamorous';

import Head from 'next/head';
import Link from 'next/link';
import Page from '../components/Page';

import TopNav from '../components/TopNav';
import Hero from '../components/Hero';
import Blocks from '../components/Blocks';
import Container from '../components/Container';

import ReactLogo from '../components/logos/React';
import AngularLogo from '../components/logos/Angular';
import VueLogo from '../components/logos/Vue';
import EmberLogo from '../components/logos/Ember';
import PolymerLogo from '../components/logos/Polymer';
import AureliaLogo from '../components/logos/Aurelia';

const Logos = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  '& > *': {
    flex: 1,
  },
});

export default class IndexPage extends React.Component {
  static async getInitialProps() {
    await Promise.resolve(1);
    return { x: 1 };
  }

  render() {
    // eslint-disable-next-line
    const { x } = this.props;
    return (
      <Page>
        <Head>
          <title>Ola!</title>
        </Head>
        <TopNav />
        <Hero>
          <p>The extendible component explorer</p>
          <button>Start</button>
        </Hero>
        <Container width={800} vSpacing={30}>
          <Blocks>
            <p>Hi!</p>
            <ol>
              <li>a</li>
              <li>b</li>
            </ol>
            <p style={{ minWidth: 100 }}>Hi! I'm a rather long text, but everything is cool!</p>
          </Blocks>
        </Container>
        <Container width={1000} vPadding={30} color={'silver'}>
          <Blocks>
            <p>Hi!</p>
            <p>Hi!</p>
            <p>Hi!</p>
            <p>Hi!</p>
            <p>Hi!</p>
            <ol>
              <li>a</li>
              <li>b</li>
            </ol>
          </Blocks>
        </Container>
        <Logos>
          <ReactLogo />
          <AngularLogo />
          <VueLogo />
          <EmberLogo />
          <PolymerLogo />
          <AureliaLogo />
        </Logos>
        <Link prefetch href="/page2"><a>I bet next has more stars (?)</a></Link>
      </Page>
    );
  }
}
