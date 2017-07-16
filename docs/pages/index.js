import React from 'react';

import Head from 'next/head';
import Page, { generator } from '../components/Page';

import TopNav from '../components/TopNav';
import Hero, { HeroTitle } from '../components/Hero';
import Blocks from '../components/Blocks';
import Container from '../components/Container';

import ReactLogo from '../components/logos/React';
import AngularLogo from '../components/logos/Angular';
import VueLogo from '../components/logos/Vue';
import EmberLogo from '../components/logos/Ember';
import PolymerLogo from '../components/logos/Polymer';
import AureliaLogo from '../components/logos/Aurelia';

export default generator('RootIndex', () =>
  <Page>
    <Head>
      <title>Storybook docs</title>
    </Head>
    <TopNav />
    <Hero>
      <HeroTitle>
        The extendible component explorer<br />
        you'll ️<span style={{ color: 'red', fontSize: '0.8em' }}>💖</span> to use
      </HeroTitle>
      <button>Start</button>
    </Hero>
    <Container width={800} vSpacing={30} hPadding={10}>
      <Blocks>
        <section>
          <h1>Quick documentation</h1>
          <ol>
            <li>Automatic setup</li>
            <li>Add storybook manually</li>
            <li>Writing stories</li>
          </ol>
        </section>
        <section>
          <h1>Custom configuration</h1>
          <ol>
            <li>Customise webpack config</li>
            <li>Custom babel config</li>
            <li>Adding global CSS & fonts</li>
          </ol>
        </section>
        <section>
          <h1>Try it now</h1>
          <code>
            <pre>
              npm i -g @storybook/cli<br />cd my-react-app<br />getstorybook
            </pre>
          </code>
        </section>
      </Blocks>
    </Container>
    <Container vPadding={30} hPadding={30}>
      <h1>Supported UI libraries / frameworks</h1>
      <Blocks max={6}>
        <ReactLogo />
        <VueLogo />
        <AngularLogo />
        <EmberLogo />
        <PolymerLogo />
        <AureliaLogo />
      </Blocks>
    </Container>
    <Container width={1000} vPadding={30} hPadding={30} background={'silver'}>
      <h1>Live examples</h1>
      <Blocks>
        <p>storybook</p>
        <p>airbnb</p>
        <p>slack</p>
        <p>lonely planet</p>
        <p>squarespace</p>
        <p>coursera</p>
      </Blocks>
      <button>More...</button>
    </Container>
    <Container vPadding={30} hPadding={30}>
      <h1>Integrations</h1>
      <Blocks max={6}>
        <p>Percy</p>
        <p>Screener</p>
        <p>Create React App</p>
        <p>NextJS (planned)</p>
        <p>Nuxt (planned)</p>
      </Blocks>
    </Container>
  </Page>
);
