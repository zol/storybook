const React = require('react');
const PropTypes = require('prop-types');
const glamorous = require('glamorous');

const Prism = require('prismjs');

const unified = require('unified');
const u = require('unist-builder');
const remarkParse = require('remark-parse');
const reactRenderer = require('remark-react');

const myCustomBlocks = require('./myCustomBlocks');
const myCustomToc = require('./myCustomToc');

const splitLang = /([\w#+]+)(?:\s\/\/\s(.+\.\w+)?(?:\s\|\s)?(\w+)?)?/;
const code = (h, node) => {
  const { value } = node;
  const [, lang, filename, framework] = node.lang.match(splitLang);
  const props = { lang, filename, framework };
  return h(node, 'code', props, [u('text', value)]);
};
// const Code = glamorous(({ children, className, lang, ...rest }) => {
//   // console.log('code', { children, className, lang, ...rest });
//   const html = Prism.highlight(children[0], Prism.languages.javascript);
//   return (
//     <span {...{ className }}>
//       {Object.keys(rest).length
//         ? <pre>
//             {JSON.stringify(rest, null, 2)}
//           </pre>
//         : null}
//       <code className="prism-code" dangerouslySetInnerHTML={{ __html: html }} />
//     </span>
//   );
// })({
//   whiteSpace: 'pre',
//   'p > &': {
//     display: 'inline-block',
//     verticalAlign: 'middle',
//     marginTop: 0,
//     marginBottom: 0,
//     padding: 0,
//   },
//   'div > &': {
//     display: 'block',
//     marginBottom: 20,
//   },
// });
// Code.displayName = 'Code';
// Code.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// const Component = glamorous(({ children, className, component, ...rest }) => {
//   console.log('component', { children, className, ...rest });
//   return (
//     <div {...{ className }}>
//       {children}
//     </div>
//   );
// })({
//   background: 'deeppink',
// });
// Component.displayName = 'MarkdownReactComponent';
// Component.propTypes = {
//   children: PropTypes.node.isRequired,
// };

const markdown = `# API Reference

Storybook has rich API providing flexible ability to create, organize and customize the stories of your components whatever framework you use

:::Omg
## Consumer Storybook API
:::

Consumer API are intended to organize your components into [stories](docs/structure) and [extend](guide/creating_addons) Storybook functionalities. 

### storiesOf

The core function for creating stories. It can be accessed using:

1. omg
2. omg
3. omg

- list
- list
- list

---

| column header 1 | columns header 2 | column header 3 |
|-----------------|:----------------:|----------------:|
| a1              |        b1        |              c1 |
| a2              |        b2        |              c2 |
| a3              |        b3        |              c3 |

* * *

It's **the best** and *cool* and _stuff_

[linky](https://example.com)

![imagy](https://example.com/logo.png)

<div>huh?</div>

[alpha]: http://example.com/page1
[beta]: http://example.com/page2

[^alpha]

![alpha][bravo]

[^beta]: bravo and charlie.

![foo][]



`;

const parser = markdown =>
  unified()
    .use(remarkParse)
    .use(myCustomBlocks)
    .use(myCustomToc)
    /*
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
    */
    .parse(markdown);

const R = React.createElement;
const S = (name, props, children) => `<${name}>${children}</${name}>`;

const elementMap = {
  heading: ({ depth, children }, context) => R(`h${depth}`, null, mapChildren(children, context)),
  paragraph: ({ children }, context) => R('p', null, mapChildren(children, context)),
  list: ({ children, ordered }, context) =>
    R(ordered ? 'ol' : 'ul', null, mapChildren(children, context)),
  listItem: ({ children }, context) => R('li', null, mapChildren(children, context)),
  thematicBreak: () => R('hr', null, []),
  html: ({ value }) => value,
  text: ({ value }) => value,
  link: ({ children, title, url }, context) =>
    R('a', { title, url }, mapChildren(children, context)),
  linkReference: ({ children, identifier }, context) => {
    const { title, url } = context.definitions[identifier] || { url: '/' };
    return R('a', { title, url }, mapChildren(children, context));
  },
  strong: ({ children }, context) => R('strong', null, mapChildren(children, context)),
  emphasis: ({ children }, context) => R('em', null, mapChildren(children, context)),
  image: () => {},
  imageReference: ({ children, identifier }, context) => {
    const { title, url } = context.definitions[identifier] || { url: '/' };
    return R('img', { title, src: url }, []);
  },
  table: ({ children, align }, context) => {
    const [head, ...tail] = children;
    return R('table', null, [
      R('thead', null, mapChildren([head], context)),
      R('tbody', null, mapChildren(tail, context)),
    ]);
  },
  tableRow: ({ children }, context) => R('tr', null, mapChildren(children, context)),
  tableCell: ({ children }, context) => R('td', null, mapChildren(children, context)),
  definition: () => {},

  ReactComponent: () => {},
};

const getKey = i => `${i.position.start.line}${i.position.start.column}${i.position.start.offset}`;

const mapChildren = (children, context = { definitions: {} }) =>
  children.reduce((acc, i) => {
    // remove definitions from flow and add to context
    if (i.type === 'definition') {
      context.definitions = Object.assign(context.definitions || {}, { [i.identifier]: i });
      return acc;
    }
    // continue flow & map to type
    return acc.concat(elementMap[i.type](Object.assign(i, { key: getKey(i) }), context));
  }, []);

const result = parser(markdown);

const end = mapChildren(result.children);

debugger;
