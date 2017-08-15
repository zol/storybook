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
const replace = (text, parent, child) => {
  // todo
  const offset = text.length - parent.text.length;
  if (child.type === 'Identifier') {
    console.log('');
  }
  // offset = 0;

  const start = child.start + offset - parent.start;
  const length = child.end - child.start + offset;
  const end = start + length;
  child.suboffset = offset;

  const block1 = text.substr(0, start);
  const block2 = text.substr(start, length);
  const block3 = text.substr(end);
  const out = block1 + wrap(child) + block3;
  // console.log({ block1, block2, block3, start, end, length, offset, out });
  return out;
};
const toHighlightString = (source, offset, node) => {
  count++;
  const out = {
    type: node.type,
    text: source.slice(node.start, node.end),
    offset,
    start: node.start,
    end: node.end,
    children: []
      .concat(
        isChild(
          node.id,
          node.body,
          node.children,
          node.attributes,
          node.name,
          node.key,
          node.value,
          node.innerComments,
          node.expression,
          node.argument,
          node.object,
          node.property,
          node.openingElement,
          node.closingElement,
          node.declarations,
          node.init
        ) || []
      )
      .sort((a, b) => a.start > b.start)
      .map(n => toHighlightString(source, node.start, n)),
  };
  // console.log(out.children);
  out.text = out.children.reduce((acc, item) => replace(acc, out, item), out.text);
  // out.text = wrap(out);

  // console.log(node);
  // console.log(out, count);
  return out;
};

// TEST CODE //

const exampleCode = toIndented(`
const foo = async() => <Markdown.H2 {...{ a: '4'}}>
  header
</Markdown.H2>
const fooz = <H2 {...{ a: \`\${4}-\`}}></H2>
`);

const ast = toAst(exampleCode);
const out = ast.program.body.map(node => toHighlightString(exampleCode, 0, node));

console.log('in:', `\n${exampleCode}`);
console.log('out:', `\n${out.map(o => o.text).join('\n')}`);
