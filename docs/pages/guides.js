import React from 'react';

import Head from 'next/head';
import Page from '../components/Page';

import TopNav from '../components/TopNav';
import PageTitle from '../components/PageTitle';
import Blocks from '../components/Blocks';
import Container from '../components/Container';
import MarkdownContent from '../components/MarkdownContent';

import ReactLogo from '../components/logos/React';
import AngularLogo from '../components/logos/Angular';
import VueLogo from '../components/logos/Vue';
import EmberLogo from '../components/logos/Ember';
import PolymerLogo from '../components/logos/Polymer';
import AureliaLogo from '../components/logos/Aurelia';

export default () =>
  <Page>
    <Head>
      <title>Storybook Guides</title>
    </Head>
    <TopNav />
    <PageTitle minHeight={'auto'}>
      <h1>Guides</h1>
      <p>
        This section contains guides for understanding and mastering the wide variety of usages and
        features that Storybook offers. There are guides on the core concepts, installation / setup,
        customizing configuration, etc.
      </p>
    </PageTitle>
    <MarkdownContent>
      <Container width={1000} vSpacing={30} hPadding={10}>
        <h1>For using storybook</h1>
        <Blocks aligned={false} variant={'masked'}>
          <section>
            <h2>Why Storybook</h2>
            <ol>
              <li>Concept</li>
              <li>Addons</li>
              <li>Integration</li>
            </ol>
          </section>
          <section>
            <h2>Setup Storybook</h2>
            <ol>
              <li>Automatic setup</li>
              <li>Add storybook manually</li>
              <li>Writing stories</li>
            </ol>
          </section>
          <section>
            <h2>Organising your storybook</h2>
            <ol>
              <li>Building a styleguide / component library</li>
              <li>Hierarchy</li>
              <li>Providing documentation</li>
            </ol>
          </section>
          <section>
            <h2>Adding and using addons</h2>
            <ol>
              <li>Addons as decorators</li>
              <li>Addon panels</li>
              <li>List of addons available</li>
            </ol>
          </section>
          <section>
            <h2>Customising configuration</h2>
            <ol>
              <li>Customise webpack config</li>
              <li>Custom babel config</li>
              <li>Adding global CSS & fonts</li>
            </ol>
          </section>
        </Blocks>
      </Container>
      <Container width={1000} vSpacing={30} hPadding={10}>
        <h1>Setup storybook for your framework</h1>
        <Blocks
          max={6}
          colors={[
            'rgba(83, 193, 222, 0.3)',
            'rgba(65, 184, 131, 0.3)',
            'rgba(195, 0, 47, 0.3)',
            'rgba(226, 75, 49, 0.3)',
            'rgba(48, 63, 159, 0.3)',
            'rgba(126, 46, 122, 0.3)',
          ]}
        >
          <ReactLogo />
          <VueLogo />
          <AngularLogo />
          <EmberLogo />
          <PolymerLogo />
          <AureliaLogo />
        </Blocks>
      </Container>
      <Container
        width={1000}
        vPadding={30}
        hPadding={30}
        background={'linear-gradient(135deg, rgb(109, 171, 245) 0%, rgb(162, 224, 94) 100%)'}
      >
        <h1>For development</h1>
        <Blocks colors={['rgba(0,0,0,0.08)']} max={4}>
          <p>bootstrapping the monorepo</p>
          <p>app architecture</p>
          <p>addon architecture</p>
          <p>releases</p>
          <p>open open source</p>
          <p>...</p>
        </Blocks>
      </Container>
    </MarkdownContent>
  </Page>;
