import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Prism from 'prismjs';
import { css } from 'glamor';

const Code = glamorous(({ children, className, language, fileName, framework, ...rest }) => {
  const html = Prism.languages[language]
    ? Prism.highlight(children, Prism.languages[language])
    : children;
  return (
    <span {...{ className }}>
      {Object.keys(rest).length
        ? <pre>
            {JSON.stringify({ language, fileName, framework, ...rest }, null, 2)}
          </pre>
        : null}
      <code className="prism-code" dangerouslySetInnerHTML={{ __html: html }} />
    </span>
  );
})({
  whiteSpace: 'pre',
  background: 'repeating-linear-gradient(45deg, #e3eaf1, #e3eaf1 10px, #f0f0f0 10px, #eeeeee 20px)',
  'p > &': {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
  },
  'div > &': {
    display: 'block',
    marginBottom: 20,
  },
});
Code.displayName = 'Markdown.Code';
Code.propTypes = {
  children: PropTypes.string.isRequired,
};

css.global('.prism-code', {
  display: 'block',
  color: '#C5C8C6',
  padding: '0.5rem',
  boxSizing: 'border-box',
  verticalAlign: 'baseline',
  outline: 'none',
  textShadow: 'none',
  hyphens: 'none',
  wordWrap: 'normal',
  wordBreak: 'normal',
  textAlign: 'left',
  wordSpacing: 'normal',
  tabSize: '2',
  background: 'rgba(0, 0, 0, 0.7)',
  fontSize: '0.8rem',
  fontFamily: '"Operator Mono SSm A", "Operator Mono SSm B", monospace',
  fontWeight: 300,
  whiteSpace: 'pre-wrap',
  borderRadius: '3px',
  boxShadow: '1px 1px 20px rgba(20, 20, 20, 0.27)',
  overflowX: 'hidden',
});

css.global('.token.comment, .token.prolog, .token.doctype, .token.cdata', {
  color: '#5C6370',
});

css.global('.token.punctuation', {
  color: '#abb2bf',
});

css.global('.token.selector, .token.tag', {
  color: '#e06c75',
});

css.global(
  '.token.property, .token.boolean, .token.number, .token.constant, .token.symbol, .token.attr-name, .token.deleted',
  {
    color: '#d19a66',
  }
);

css.global('.token.string, .token.char, .token.attr-value, .token.builtin, .token.inserted', {
  color: '#98c379',
});

css.global(
  '.token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string',
  {
    color: '#56b6c2',
  }
);

css.global('.token.atrule, .token.keyword', {
  color: '#c678dd',
});

css.global('.token.function', {
  color: '#61afef',
});

css.global('.token.regex, .token.important, .token.variable', {
  color: '#c678dd',
});

css.global('.token.important, .token.bold', {
  fontWeight: 'bold',
});

css.global('.token.italic', {
  fontStyle: 'italic',
});

css.global('.token.entity', {
  cursor: 'help',
});

export { Code as default };
