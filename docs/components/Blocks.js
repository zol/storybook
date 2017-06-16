import React, { Children } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Root = glamorous.div(
  {
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
  },
  ({ vSpacing = 0, hSpacing = 10, count = 1, max = 3 }) => ({
    marginLeft: -hSpacing / 2,
    marginRight: -hSpacing / 2,
    top: -hSpacing / 2,
    marginBottom: vSpacing - hSpacing,
    '& > *': {
      margin: hSpacing / 2,
      flex: `1 1 ${100 / (count > max ? max : count) - 3}%`,
    },
  })
);

const Item = glamorous.div(
  {
    padding: '40px 30px 45px',
    borderRadius: '3px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 5s',
    boxSizing: 'border-box',
  },
  ({ color = 'silver' }) => ({
    backgroundColor: color,
  })
);

const Blocks = ({ children, ...rest }) =>
  <Root {...rest} count={Children.count(children)}>
    {Children.toArray(children).map(child => <Item color={getRandomColor()}>{child}</Item>)}
  </Root>;

Blocks.displayName = 'Blocks';
Blocks.propTypes = {
  children: PropTypes.node.isRequired,
  vSpacing: PropTypes.number,
  hSpacing: PropTypes.number,
  max: PropTypes.number,
};
Blocks.defaultProps = {
  vSpacing: undefined,
  hSpacing: undefined,
  max: undefined,
};

export default Blocks;
