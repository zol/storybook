import React, { Children } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

const getColor = (list, index) => list[index] || getColor(list, index - list.length);

const Root = glamorous.div(
  {
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  ({ vSpacing = 0, hSpacing = 10, count = 1, max = 3 }) => ({
    marginLeft: -hSpacing / 2,
    marginRight: -hSpacing / 2,
    top: -hSpacing / 2,
    marginBottom: vSpacing - hSpacing,
    '& > *': {
      margin: hSpacing / 2,
      flex: '1 1 auto',
      flexBasis: `${100 / (count > max ? max : count) - 3}%`,
      '@media screen and (max-width: 500px)': {
        flexBasis: 'auto',
      },
    },
  })
);

const alignment = ({ aligned = true }) =>
  aligned
    ? {
        alignItems: 'center',
        justifyContent: 'center',
      }
    : {};
const variance = ({ color = 'silver', variant }) => {
  switch (variant) {
    case 'background': {
      return {
        backgroundColor: color,
      };
    }
    case 'inverted': {
      return {
        backgroundColor: 'white',
        color,
      };
    }
    case 'bordered': {
      return {
        border: `3px double ${color}`,
        backgroundColor: 'white',

        // color,
      };
    }
    case 'masked': {
      return {
        color,
        backgroundColor: 'transparent',
        '& > *': {
          position: 'relative',
          zIndex: 2,
          transition: 'all .5s',
        },
        '&::after': {
          transition: 'all .5s',

          content: '" "',
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          background: color,
          zIndex: 1,
          borderRadius: 3,
          opacity: 0.1,
        },
      };
    }
    default: {
      return {};
    }
  }
};

const Item = glamorous.div(
  {
    position: 'relative',
    padding: '40px 30px 45px',
    borderRadius: '3px',
    display: 'flex',
    transition: 'all .5s',
    boxSizing: 'border-box',
    '&:hover': {
      // boxShadow: '0 1px 8px rgba(0,0,0,0.57)',
      boxShadow: 'inset 0 0 0 3px rgba(0,0,0,0.15)',
      // boxShadow: '0 1px 8px currentColor',
    },
  },
  alignment,
  variance
);

const Blocks = ({ children, colors, variant, aligned, ...rest }) =>
  <Root {...rest} count={Children.count(children)}>
    {Children.toArray(children).map((child, index) =>
      <Item key={index} variant={variant} aligned={aligned} color={getColor(colors, index)}>
        {child}
      </Item>
    )}
  </Root>;

Blocks.displayName = 'Blocks';
Blocks.propTypes = {
  children: PropTypes.node.isRequired,
  vSpacing: PropTypes.number,
  hSpacing: PropTypes.number,
  max: PropTypes.number,
  variant: PropTypes.oneOf('background', 'inverted', 'bordered'),
  colors: PropTypes.arrayOf(PropTypes.string),
};
Blocks.defaultProps = {
  vSpacing: undefined,
  hSpacing: undefined,
  max: undefined,
  variant: 'background',
  colors: ['#f1618c', '#f3ad38', '#a2e05e', '#b57ee5', '#6dabf5', '#f16161'],
};

export default Blocks;
