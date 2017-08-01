import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Prism from 'prismjs';
// import { css } from 'glamor';

const substyles = {
  h1: {
    color: 'currentColor',
    textShadow: '1px 1px 1px rgba(0, 0, 0, 0.19)',
    fontWeight: 300,
    fontSize: 26,
  },
  h2: {
    color: 'currentColor',
    fontWeight: 400,
    fontSize: 22,
    borderBottom: '1px solid currentColor',
  },
  h3: {
    color: 'currentColor',
    fontWeight: 700,
    fontSize: 16,
  },
};

const H1 = glamorous.h1(substyles.h1);
const H2 = glamorous.h2(substyles.h2);
const H3 = glamorous.h3(substyles.h3);

const Container = glamorous.div(
  {
    '& h1, & h2, & h3, & h4, & h5, & h6': {
      marginTop: -80, // this will make browser scroll-to behavior to be 80px off
      paddingTop: 80, // ensuring the header will not be covered by the sticky header
      marginBottom: '0.6em',
    },
    '& h1': substyles.h1,
    '& h2': substyles.h2,
    '& h3': substyles.h3,
    '& a': {
      borderBottom: '1px dashed currentColor',
      textDecoration: 'none',
      transition: 'color 0.3s',
      '&:hover, &:focus, &:active': {
        outline: 0,
        borderBottomStyle: 'solid',
      },
    },
    '& p': {
      color: 'currentColor',
      fontWeight: 'normal',
      fontSize: 15,
      marginTop: 0,
      marginBottom: '1.2em',
      lineHeight: '1.4em',
    },
  },
  ({ colored = true }) =>
    colored
      ? {
          '& a': {
            color: 'rgb(240, 97, 141)',
            '&:hover, &:focus, &:active': {
              color: 'rgb(181, 126, 229)',
            },
          },
        }
      : {
          '& a': {
            color: 'currentColor',
            '&:hover, &:focus, &:active': {
              color: 'currentColor',
            },
          },
        }
);
Container.displayName = 'Markdown.Container';

const ReactComponent = ({ children, type }) =>
  <div>
    {children}
    {type}
  </div>;

ReactComponent.displayName = 'Markdown.ReactComponent';
ReactComponent.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
};

const Code = glamorous(({ children, className, lang, ...rest }) => {
  console.log('code', { children, className, lang, ...rest });
  const html = Prism.highlight(children, Prism.languages.javascript);
  return (
    <span {...{ className }}>
      {Object.keys(rest).length
        ? <pre>
            {JSON.stringify(rest, null, 2)}
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
  children: PropTypes.node.isRequired,
};

export { Container, H1, H2, H3, Code, ReactComponent };
