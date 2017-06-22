import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

const List = glamorous.ol({
  position: 'relative',
  // counterReset: 'section',
});
const Toc = ({ toc, ...rest }) => (toc.length ? <List>{toc}</List> : null);

Toc.displayName = 'Toc';
Toc.propTypes = {
  toc: PropTypes.arrayOf(PropTypes.node),
};
Toc.defaultProps = {
  toc: [],
};

export default Toc;
