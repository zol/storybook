# Hello world

It's a good place to be in me thinks!

## The robots are coming 🤖

Run humans, run!

> AAAAAAAhhhhgg, help help, they are killing us !!
>
> _-humans_

```js // robot.master.js
humans.map(human => new Slave(human));
```

```js // human.js
throw new Rock({ size: 'medium' });
```

### test

:::Test { test: true }

```js // human.js | vue
throw new Rock({ size: 'medium' });
```

```js // machines.js | react
const machine = { name: 'HAL1000' };
```

:::

😃

## It's **the end** !

bye

```js
import * as F from 'F'; // :/



// example 1


const a = () => ({
  a: `${4} & @ # $`,
  b: 'rrrOo0' === 'rrrOo0' ? true : false,
});


const MyComponent = () => <div>1LliI7 0oO nm</div>;

// wtf?
```

```sh
npm run storybook && cd .. && echo "done!" # cool script
```

```css
.myCssClass: {
  color: hotpink;
  background: #000 linear-gradient(to right, #ffff00 1%,#00ffff 100%);
  transform: translateX(10px);
  display: inline-block;
}

@media screen and (max-width: 999999rem) {
  .myCssClass: {
    visibility: hidden;
  }
}
```

```js
import React, { Children } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import sitemap from '../lib/sitemap';

import PageTitle from './PageTitle';
import Container from './Container';
import Split from './Split';
import * as Markdown from './Markdown';
import Toc from './Toc';
import SideNav from './SideNav';

const childrenToString = children => {
  switch (true) {
    case typeof children === 'string': {
      return children;
    }
    case Array.isArray(children): {
      return children.reduce((acc, item) => acc + childrenToString(item), '');
    }
    case Array.isArray(children.props.children): {
      return childrenToString(children.props.children);
    }
    default: {
      return '';
    }
  }
};

const isHeaderMatch = {
  any: /^h\d$/,
  1: /^h1$/,
  2: /^h2$/,
  3: /^h3$/,
  4: /^h4$/,
  5: /^h5$/,
  6: /^h6$/,
};
const isHeader = (t, depth) =>
  t &&
  t.type &&
  t.type.match &&
  (depth ? t.type.match(isHeaderMatch[depth]) : t.type.match(isHeaderMatch.any));

const Content = ({ children, path }) => {
  const { toc, body, intro, header } = Children.toArray(children.props.children).reduce(
    (acc, item) => {
      try {
        if (acc.header === '' && isHeader(item, 1)) {
          acc.header = childrenToString(item.props.children);
        }
        if (isHeader(item)) {
          acc.toc = acc.toc.concat(item.props);
        }

        if (acc.body.length === 0 && (acc.intro.length === 0 || !`${item.type}`.match(/^h\d$/))) {
          acc.intro.push(item);
        } else {
          acc.body.push(item);
        }
      } catch (error) {
        console.log(error);
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
            <Markdown.H2>Other navigation</Markdown.H2>
            <SideNav {...{ sitemap, path }} />
          </nav>
          <Markdown.Container>
            {body}
          </Markdown.Container>
        </Split>
      </Container>
    </div>
  );
};

Content.displayName = 'Content';
Content.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string,
};
Content.defaultProps = {
  path: '/',
};

export { Content };
```
