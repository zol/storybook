import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import Prism from 'prismjs';

import unified from 'unified';
import u from 'unist-builder';
import remarkParse from 'remark-parse';
import reactRenderer from 'remark-react';
import myCustomBlocks from './myCustomBlocks';
import myCustomToc from './myCustomToc';

import { css } from 'glamor';

css.global('.prism-code', {
  display: 'block',
  // whiteSpace: 'pre',
  backgroundColor: '#1D1F21',
  color: '#C5C8C6',
  padding: '0.5rem',
  // margin: '0',
  boxSizing: 'border-box',
  verticalAlign: 'baseline',
  outline: 'none',
  textShadow: 'none',
  WebkitHyphens: 'none',
  MsHyphens: 'none',
  MozHyphens: 'none',
  hyphens: 'none',
  wordWrap: 'normal',
  wordBreak: 'normal',
  textAlign: 'left',
  wordSpacing: 'normal',
  MozTabSize: '2',
  OTabSize: '2',
  tabSize: '2',
  background: '#1d1f27',
  fontSize: '0.8rem',
  fontFamily: '"Operator Mono SSm A", "Operator Mono SSm B", monospace',
  fontWeight: 300,
  whiteSpace: 'pre-wrap',
  borderRadius: '0.16666666666666666rem',
  boxShadow: '1px 1px 20px rgba(20, 20, 20, 0.27)',
  margin: '1.9444444444444444rem 0',
  overflowX: 'hidden',
});
css.global('.token.comment', {
  fontStyle: 'italic',
});
css.global('.token.prolog', {
  color: 'hsl(30, 20%, 50%)',
});
css.global('.token.doctype', {
  color: 'hsl(30, 20%, 50%)',
});
css.global('.token.cdata', {
  color: 'hsl(30, 20%, 50%)',
});
css.global('.token.punctuation', {
  opacity: '.7',
});
css.global('.namespace', {
  opacity: '.7',
});
css.global('.token.property', {
  color: 'hsl(350, 40%, 70%)',
});
css.global('.token.tag', {
  color: 'hsl(350, 40%, 70%)',
});
css.global('.token.boolean', {
  color: 'hsl(350, 40%, 70%)',
});
css.global('.token.number', {
  color: 'hsl(350, 40%, 70%)',
});
css.global('.token.constant', {
  color: 'hsl(350, 40%, 70%)',
});
css.global('.token.symbol', {
  color: 'hsl(350, 40%, 70%)',
});
css.global('.token.selector', {
  color: 'hsl(75, 70%, 60%)',
});
css.global('.token.attr-name', {
  color: 'hsl(75, 70%, 60%)',
});
css.global('.token.string', {
  color: 'hsl(75, 70%, 60%)',
});
css.global('.token.char', {
  color: 'hsl(75, 70%, 60%)',
});
css.global('.token.builtin', {
  color: 'hsl(75, 70%, 60%)',
});
css.global('.token.inserted', {
  color: 'hsl(75, 70%, 60%)',
});
css.global('.token.operator', {
  color: 'hsl(40, 90%, 60%)',
});
css.global('.token.entity', {
  cursor: 'help',
});
css.global('.token.url', {
  color: 'hsl(40, 90%, 60%)',
});
css.global('.language-css .token.string', {
  color: 'hsl(40, 90%, 60%)',
});
css.global('.style .token.string', {
  color: 'hsl(40, 90%, 60%)',
});
css.global('.token.variable', {
  color: 'hsl(40, 90%, 60%)',
});
css.global('.token.atrule', {
  color: 'hsl(350, 40%, 70%)',
});
css.global('.token.attr-value', {
  color: 'hsl(350, 40%, 70%)',
});
css.global('.token.keyword', {
  color: 'hsl(350, 40%, 70%)',
});
css.global('.token.regex', {
  color: '#e90',
});
css.global('.token.important', {
  fontWeight: 'bold',
});
css.global('.token.bold', {
  fontWeight: 'bold',
});
css.global('.token.italic', {
  fontStyle: 'italic',
});
css.global('.token.deleted', {
  color: 'red',
});
//

const splitLang = /([\w#+]+)(?:\s\/\/\s(.+\.\w+)?(?:\s\|\s)?(\w+)?)?/;
const code = (h, node) => {
  const { value } = node;
  const [, lang, filename, framework] = node.lang.match(splitLang);
  const props = { lang, filename, framework };
  return h(node, 'code', props, [u('text', value)]);
};
const Code = glamorous(({ children, className, lang, ...rest }) => {
  // console.log('code', { children, className, lang, ...rest });
  const html = Prism.highlight(children[0], Prism.languages.javascript);
  return (
    <span {...{ className }}>
      {Object.keys(rest).length
        ? <pre>
            {JSON.stringify(rest, null, 2)}
          </pre>
        : null}
      <code className="prism-code" dangerouslySetInnerHTML={{ __html: html }} />
    </span>
  );
})({
  background: 'rgb(241, 97, 97)',
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
