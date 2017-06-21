import React from 'react';
import glamorous from 'glamorous';

import unified from 'unified';
import remark from 'remark';
import remarkParse from 'remark-parse';
import u from 'unist-builder';
import all from 'mdast-util-to-hast/lib/all';
import toHast from 'mdast-util-to-hast';
import reactRenderer from 'remark-react';
import myCustomBlocks from './myCustomBlocks';

const ReactComponent = (h, node) => {
  console.log('ReactComponent called!');
  const { type, children, options } = node;
  const { component } = options;
  let props;
  try {
    props = eval(`(${options.props.trim()})`);
  } catch (error) {
    props = {};
  } finally {
    Object.assign(props, { type, mdChildren: children });
  }
  console.log([node, component, props]);
  return h(node, component, props, all(h, node));
};

const Unknown = (h, node) => {
  console.log('Unknown called!');
  console.log(node);
  // node.data = {
  //   hProperties: node.options,
  // };
  return h(node, 'div', node.options, all(h, node));
};

const splitLang = /([\w#+]+)(?:\s\/\/\s(.+\.\w+)?(?:\s\|\s)?(\w+)?)?/;
const code = (h, node) => {
  const { value } = node;
  const component = 'Code';
  const [, lang, filename, framework] = node.lang.match(splitLang);
  const props = { lang, filename, framework };
  return h(node, component, props, [all('text', value)]);
};
const Code = props =>
  <code style={{ background: 'deepskyblue', padding: 2 }} {...props}>{props.children}</code>;
const Test = props => {
  console.log('TEST WAS CALLED', props);
  return <div style={{ background: 'deeppink', padding: 2 }} {...props}>{props.children}</div>;
};
const Temp = props => {
  console.log('component WAS CALLED', props);
  return <div style={{ background: 'deeppink', padding: 2 }} {...props}>{props.children}</div>;
};

const hastToReact = ({
  tagName = 'div',
  properties: { children: childrendProps, ...props } = {},
  children = [],
  value,
}) =>
  React.createElement(
    React.DOM[tagName] || eval(tagName),
    { ...props, childrendProps },
    typeof value === 'string' ? value : Array.from(children.map(hastToReact))
  );

const processor = unified().use(remarkParse).use(myCustomBlocks);

const hastOptions = {
  handlers: {
    ReactComponent,
    code,
  },
};

export default content => {
  const mdast = processor.parse(content);

  const hast = toHast(mdast, hastOptions);

  const react = hastToReact(hast);

  return react;
};

export const DebugComponent = ({ markdown }) => {
  const mdast = processor.parse(markdown);
  const hast = toHast(mdast, hastOptions);
  const out = hastToReact(hast);
  console.log(out);

  return (
    <pre>
      {/* out.props.children*/}
      {JSON.stringify(hast, null, 2)}
    </pre>
  );
};

export const Component = ({ markdown }) =>
  unified()
    .use(remarkParse)
    .use(myCustomBlocks)
    .use(reactRenderer, {
      sanitize: false,
      remarkReactComponents: {
        code: Code,
        component: Temp,
      },
      toHast: {
        handlers: {
          // ReactComponent: Unknown,
          // Test,
          // code,
        },
      },
    })
    .processSync(markdown).contents;
