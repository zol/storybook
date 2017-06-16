import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

const gradients = {
  blue: 'linear-gradient(135deg, #2ab5bb 8%, #2a7bbb)',
  pink: 'linear-gradient(135deg, rgb(241,97,140) 0%, rgb(181,126,229) 100%)',
};

const Root = glamorous.section(
  {
    position: 'relative',
    zIndex: 1000,
    backgroundColor: '#2ab5bb',
    backgroundImage: gradients.pink,
    display: 'flex',
    minHeight: '60vh',
    alignItems: 'flex-start',
    padding: 30,
    justifyContent: 'flex-start',
  },
  ({ minHeight = '60vh' }) => ({
    minHeight,
  })
);

const PageTitle = ({ children, ...rest }) => <Root {...rest}><div>{children}</div></Root>;

PageTitle.displayName = 'PageTitle';
PageTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTitle;
