/* eslint-disable func-names, no-useless-escape, no-param-reassign */

// TODO switch to https://github.com/wooorm/refractor

const Highlights = require('highlights');
const prettier = require('prettier');

const highlighter = new Highlights({ scopePrefix: 'syntax--' });
highlighter.requireGrammarsSync({
  modulePath: '/Users/dev/Projects/GitHub/storybook/core/docs/node_modules/language-babel',
  includePath: './babel.cson',
});

module.exports = (value, lang) => {
  // TODO: could do css too:
  // https://github.com/prettier/prettier#parser
  const code =
    lang === 'js'
      ? prettier.format(value, {
          printWidth: 100,
          tabWidth: 2,
          bracketSpacing: true,
          trailingComma: 'es5',
          singleQuote: true,
        })
      : value;

  // const language = lang === 'js' ? 'babel' : lang;
  const language = lang;
  const options = {
    modulePath: '/Users/dev/Projects/GitHub/storybook/core/docs/node_modules/language-babel',
    fileContents: code,
    scopeName: language,
  };

  console.log('options', language);

  return highlighter.highlightSync(options).replace(/\n/g, '<br />');
  // return (prism.languages[language]
  //   ? prism.highlight(code, prism.languages[language])
  //   : code).replace(/\n/g, '<br />');
};
