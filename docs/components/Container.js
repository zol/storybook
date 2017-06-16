import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

const Root = glamorous.section(
  {
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  ({ vSpacing = 0, vPadding = 0, color = 'transparent' }) => ({
    marginTop: vSpacing,
    marginBottom: vSpacing,
    paddingTop: vPadding,
    paddingBottom: vPadding,
    backgroundColor: color,
  })
);
const Width = glamorous.div(
  {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  ({ width }) => ({
    maxWidth: width,
  })
);

const Container = ({ children, width, ...rest }) =>
  <Root {...rest}>
    {width ? <Width {...{ width }}>{children}</Width> : children}
  </Root>;

Container.displayName = 'Container';
Container.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.number,
  vSpacing: PropTypes.number,
  color: PropTypes.string,
};
Container.defaultProps = {
  width: undefined,
  vSpacing: undefined,
  vPadding: undefined,
  color: undefined,
};

export default Container;
