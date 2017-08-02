import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Prism from 'prismjs';
// import { css } from 'glamor';

const Code = glamorous(({ children, className, language, fileName, framework, ...rest }) => {
  const html = Prism.highlight(children, Prism.languages[language]);
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

export { Code as default };
