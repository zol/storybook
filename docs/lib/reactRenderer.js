import React from 'react';
import glamorous from 'glamorous';

import unified from 'unified';
import remarkParse from 'remark-parse';
import u from 'unist-builder';
import reactRenderer from 'remark-react';
import myCustomBlocks from './myCustomBlocks';

const splitLang = /([\w#+]+)(?:\s\/\/\s(.+\.\w+)?(?:\s\|\s)?(\w+)?)?/;
const code = (h, node) => {
  const { value } = node;
  const [, lang, filename, framework] = node.lang.match(splitLang);
  const props = { lang, filename, framework };
  return h(node, 'code', props, [u('text', value)]);
};
const Code = glamorous(({ children, className, ...rest }) => {
  console.log('code', { children, className, ...rest });
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
const Component = glamorous(({ children, className, ...rest }) => {
  console.log('component', { children, className, ...rest });
  return (
    <div {...{ className }}>
      <p><em>Managed by react</em></p>
      {children}
    </div>
  );
})({
  background: 'deeppink',
});

export const parser = markdown =>
  unified()
    .use(remarkParse)
    .use(myCustomBlocks)
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
    .processSync(markdown);
