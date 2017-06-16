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
    alignItems: 'center',
    justifyContent: 'center',
  },
  ({ minHeight = '60vh' }) => ({
    minHeight,
  })
);

const Hero = ({ children, ...rest }) => <Root {...rest}><div>{children}</div></Root>;

Hero.displayName = 'Hero';
Hero.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Hero;
