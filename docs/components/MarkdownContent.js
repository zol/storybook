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
    fontWeight: 400,
    fontSize: 22,
    borderBottom: '1px solid currentColor',
  },
  '& h3': {
    color: 'currentColor',
    fontWeight: 700,
    fontSize: 16,
  },
  '& a': {
    borderBottom: '1px dashed currentColor',
    textDecoration: 'none',
    color: 'rgb(240, 97, 141)',
    transition: 'color 0.3s',
    '&:hover, &:focus, &:active': {
      outline: 0,
      borderBottomStyle: 'solid',
      color: 'rgb(181, 126, 229)',
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
});
MarkdownContent.displayName = 'MarkdownContent';

export { MarkdownContent as default };
