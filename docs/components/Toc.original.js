import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

const List = glamorous.ol({
  position: 'relative',
});
const Item = glamorous(({ children = [], title, id, level, ...rest }) =>
  <li {...rest}><a href={`#${id}`}>{title}</a>{children.length ? <Toc toc={children} /> : null}</li>
)({
  position: 'relative',
});
Item.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
};

const Toc = ({ toc, ...rest }) =>
  toc.length
    ? <List {...rest}>{toc.map(item => <Item {...item} key={`${item.id}-${item.index}`} />)}</List>
    : null;

Toc.displayName = 'Toc';
Toc.propTypes = {
  toc: PropTypes.arrayOf(PropTypes.object),
};
Toc.defaultProps = {
  toc: [],
};

export default Toc;
