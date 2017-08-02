import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

const ReactComponent = glamorous(({ children, type, className }) =>
  <div className={className}>
    {children}
    {type}
  </div>
)({
  border: '1px solid orangered',
});
ReactComponent.displayName = 'Markdown.ReactComponent';
ReactComponent.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
};

export { ReactComponent as default };
