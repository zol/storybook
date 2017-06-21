import React from 'react';

import unified from 'unified';
import remarkParse from 'remark-parse';
import u from 'unist-builder';
import all from 'mdast-util-to-hast/lib/all';
import toHast from 'mdast-util-to-hast';
import myCustomBlocks from './myCustomBlocks';

const ReactComponent = (h, node) => {
  const { type, children, options } = node;
  const { component } = options;
  let props;
  try {
    props = eval(`(${options.props.trim()})`);
  } catch (error) {
    props = {};
  } finally {
    Object.assign(props, { type });
  }
  return h(node, component, props, all(h, node));
};

const splitLang = /([\w#+]+)(?:\s\/\/\s(.+\.\w+)?(?:\s\|\s)?(\w+)?)?/;
const code = (h, node) => {
  const { value } = node;
  const component = 'Code';
  const [, lang, filename, framework] = node.lang.match(splitLang);
  const props = { lang, filename, framework };
  return h(node, component, props, [u('text', value)]);
};
const Code = props => React.createElement('code', props, props.children);
const Test = props => React.createElement('div', props, props.children);

const hastToReact = ({ tagName = 'div', properties = {}, children = [], value }) =>
  React.createElement(
    React.DOM[tagName] || eval(tagName),
    properties,
    value || children.map(hastToReact)
  );

const processor = unified().use(remarkParse).use(myCustomBlocks);

export default content => {
  const mdast = processor.parse(content);

  const hast = toHast(mdast, {
    handlers: {
      ReactComponent,
      code,
    },
  });

  const react = hastToReact(hast);

  return react;
};
