import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import unified from 'unified';
import u from 'unist-builder';
import remarkParse from 'remark-parse';
import reactRenderer from 'remark-react';
import myCustomBlocks from './myCustomBlocks';
import myCustomToc from './myCustomToc';

const splitLang = /([\w#+]+)(?:\s\/\/\s(.+\.\w+)?(?:\s\|\s)?(\w+)?)?/;
const code = (h, node) => {
  const { value } = node;
  const [, lang, filename, framework] = node.lang.match(splitLang);
  const props = { lang, filename, framework };
  return h(node, 'code', props, [u('text', value)]);
};
const Code = glamorous(({ children, className, ...rest }) => {
  // console.log('code', { children, className, ...rest });
  const f = 4;
  return <code {...{ className }}>{children}</code>;
})({
  background: 'hotpink',
  whiteSpace: 'pre',
  'p > &': {
    display: 'inline-block',
  },
  'div > &': {
    display: 'block',
    marginBottom: 20,
  },
});
Code.displayName = 'Code';
Code.propTypes = {
  children: PropTypes.node.isRequired,
};

const Component = glamorous(({ children, className, component, ...rest }) => {
  console.log('component', { children, className, ...rest });
  return (
    <div {...{ className }}>
      {children}
    </div>
  );
})({
  background: 'deeppink',
});
Component.displayName = 'MarkdownReactComponent';
Component.propTypes = {
  children: PropTypes.node.isRequired,
};

export const parser = markdown =>
  unified()
    .use(remarkParse)
    .use(myCustomBlocks)
    .use(myCustomToc)
    .use(reactRenderer, {
      sanitize: false,
      remarkReactComponents: {
        code: Code,
        component: Component,
      },
      toHast: {
        handlers: {
          code,
        },
      },
    })
    .processSync(markdown).contents.props.children;
