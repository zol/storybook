const fs = require('fs');

const markdown2 = fs.readFileSync(
  '/Users/dev/Projects/GitHub/storybook/react-storybook/docs/content/docs/api.md',
  'utf8'
);

const babylon = require('babylon');
const t = require('babel-types');
const unified = require('unified');
const remarkParse = require('remark-parse');
const myCustomBlocks = require('./myCustomBlocks');

const parser = markdown => unified().use(remarkParse).use(myCustomBlocks).parse(markdown);

const R = (name, props, children) =>
  children && children.length ? `<${name}>${children.join('')}</${name}>` : `<${name} />`;

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
  image: ({ src, alt, title }) => R('img', { src, alt, title }),
  code: () => {},
  inlineCode: () => {},
  imageReference: ({ identifier }, context) => {
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

const result = parser(markdown2);

const source = `const temp = <div>${mapChildren(result.children).join('')}</div>`;

const ast1 = babylon.parse(source, { plugins: ['jsx'] }).program.body[0];

debugger;
