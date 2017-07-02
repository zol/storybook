import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

const MarkdownContent = glamorous.div({
  '& h1, & h2, & h3, & h4, & h5, & h6': {
    marginTop: 0,
    marginBottom: '0.6em',
  },
  '& h1': {
    color: 'currentColor',
    textShadow: '1px 1px 1px rgba(0, 0, 0, 0.19)',
    fontWeight: 300,
    fontSize: 26,
  },
  '& h2': {
    color: 'currentColor',
    // textShadow: '1px 1px 1px rgba(0, 0, 0, 0.19)',
    fontWeight: 400,
    fontSize: 22,
    borderBottom: '1px solid currentColor',
  },
});
MarkdownContent.displayName = 'MarkdownContent';

export { MarkdownContent as default };
