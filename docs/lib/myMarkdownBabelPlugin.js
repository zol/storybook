const fs = require('fs');
const p = require('path');
const serialize = require('babel-literal-to-ast');

// const babylon = require('babylon');
const unified = require('unified');
const remarkParse = require('remark-parse');
const myCustomBlocks = require('./myCustomBlocks');

const parser = markdown => unified().use(remarkParse).use(myCustomBlocks).parse(markdown);

module.exports = function({ types: t }) {
  const mapProps = props =>
    props
      ? Object.keys(props).map(key => {
          const value = props[key];
          const isString = typeof value === 'string';
          return t.jSXAttribute(
            t.JSXIdentifier(key),
            isString ? t.StringLiteral(value) : t.JSXExpressionContainer(serialize(value))
          );
        })
      : [];

  const R = (name, props, children) =>
    t.jSXElement(
      t.jSXOpeningElement(t.jSXIdentifier(name), mapProps(props), false),
      t.jSXClosingElement(t.jSXIdentifier(name)),
      children || [],
      children && children.length === 0
    );

  const mapChildren = (children, context = { definitions: {} }) =>
    children
      .reduce((acc, item) => {
        if (!item) {
          return acc;
        }
        // remove definitions from flow and add to context
        if (item.type === 'definition') {
          context.definitions[item.identifier] = item;
          return acc;
        }
        // continue flow & map to type
        return acc.concat({
          fn: elementMap[item.type] || elementMap.text,
          item,
        });
      }, [])
      .map(({ fn, item }, index) => fn(item, context));

  const elementMap = {
    heading: ({ depth, children }, context) => R(`h${depth}`, null, mapChildren(children, context)),
    paragraph: ({ children }, context) => R('p', null, mapChildren(children, context)),
    list: ({ children, ordered }, context) =>
      R(ordered ? 'ol' : 'ul', null, mapChildren(children, context)),
    listItem: ({ children }, context) => R('li', null, mapChildren(children, context)),
    thematicBreak: () => R('hr', null, []),
    html: ({ value }) => t.jSXText(value),
    text: ({ value }) => t.jSXText(value),
    code: () => t.jSXText('todo'),
    inlineCode: ({ value }) => t.jSXText(value),
    link: ({ children, title, url: href }, context) =>
      R('a', { title, href }, mapChildren(children, context)),
    linkReference: ({ children, identifier }, context) => {
      const { title, url: href } = context.definitions[identifier] || { url: '/' };
      return R('a', { title, href }, mapChildren(children, context));
    },
    strong: ({ children }, context) => R('strong', null, mapChildren(children, context)),
    emphasis: ({ children }, context) => R('em', null, mapChildren(children, context)),
    image: ({ title, url: src }) => R('img', { title, src }, []),
    imageReference: ({ identifier }, context) => {
      const { title, url: src } = context.definitions[identifier] || { url: '/' };
      return R('img', { title, src }, []);
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

    ReactComponent: ({ children, options }, context) =>
      R('ReactComponent', options, mapChildren(children, context)),
  };

  function endsWith(str, search) {
    return str.indexOf(search, str.length - search.length) !== -1;
  }

  return {
    visitor: {
      ImportDeclaration: {
        exit(path, state) {
          const node = path.node;

          if (endsWith(node.source.value, '.md')) {
            const dir = p.dirname(p.resolve(state.file.opts.filename));
            const absolutePath = p.resolve(dir, node.source.value);
            const markdown = fs.readFileSync(absolutePath, 'utf8');

            const mast = parser(markdown).children;

            const ast = mapChildren(mast).map(
              (item, index) =>
                item || R('h1', null, [t.jSXText(`BROKEN COMPONENT @index=${index}`)])
            );

            path.replaceWith(
              t.variableDeclaration('var', [
                t.variableDeclarator(
                  t.identifier(node.specifiers[0].local.name),
                  t.jSXElement(
                    t.jSXOpeningElement(t.jSXIdentifier('div'), [], false),
                    t.jSXClosingElement(t.jSXIdentifier('div')),
                    ast,
                    false
                  )
                ),
              ])
            );
          }
        },
      },
    },
  };
};
