/* eslint-disable func-names, no-useless-escape, no-param-reassign */

// const prism = require('prismjs');
const prettier = require('prettier');
const babylon = require('babylon');

const babylonOptions = {
  sourceType: 'module',
  allowImportExportEverywhere: true,
  allowReturnOutsideFunction: true,
  plugins: [
    'jsx',
    'flow',
    'typescript',
    'doExpressions',
    'objectRestSpread',
    'decorators',
    'classProperties',
    'exportExtensions',
    'asyncGenerators',
    'functionBind',
    'functionSent',
    'dynamicImport',
    'numericSeparator',
    'importMeta',
    'optionalCatchBinding',
    'optionalChaining',
  ],
};
const prettierOptions = {
  printWidth: 100,
  tabWidth: 2,
  bracketSpacing: true,
  trailingComma: 'es5',
  singleQuote: true,
};
let count = 0;
const isChild = (...params) =>
  params.filter(Boolean).reduce((acc, i) => acc.concat(i), []).filter(i => i.type);

// TODO cssToAst: https://github.com/reworkcss/css
const toAst = source => babylon.parse(source, babylonOptions);
const toIndented = source => prettier.format(source, prettierOptions);

const wrap = node => `<${node.type}>${node.text}</${node.type}>`;
const replace = (source, parent, child) => {
  // todo
  const start = child.start - parent.start;
  const end = child.end - parent.end;
  const length = end - start;

  const block1 = parent.text.slice(0, start);
  const block2 = parent.text.slice(start, end);
  const block3 = parent.text.slice(end);
  console.log({ block1, block2, block3 });
  return parent.text;
};
const toHighlightString = (source, offset, node) => {
  count++;
  const out = {
    // id: node.id,
    type: node.type,
    // init: node.init,
    text: source.slice(node.start, node.end),
    offset,
    start: node.start,
    end: node.end,
    children: []
      .concat(
        isChild(
          node.body,
          node.children,
          node.closingElement,
          node.declarations,
          node.id,
          node.init,
          node.openingElement
        ) || []
      )
      .map(n => toHighlightString(source, node.start, n)),
  };
  out.text = out.children.reverse().reduce((acc, item) => replace(source, out, item), out.text);
  out.text = wrap(out);

  // console.log(node);
  // console.log(out, count);
  return out;
};

// TEST CODE //

const exampleCode = toIndented(`
const foo = async() => <Markdown.H2 {...{ a: '4'}}>
  header
</Markdown.H2>
const fooz = <H2 {...{ a: '4'}}></H2>
`);

const ast = toAst(exampleCode);
const out = ast.program.body.map(node => toHighlightString(exampleCode, 0, node));

console.log('out:', `\n${out.map(o => o.text).join('\n')}`);
