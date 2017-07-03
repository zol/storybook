import React, { Children } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import MarkdownContent from './MarkdownContent';

const SectionNr = glamorous.span({
  userSelect: 'none',
  paddingRight: 6,
  paddingLeft: 6,
  marginLeft: 0,
  borderLeft: '1px solid rgba(200, 200, 200, 1)',
  color: 'rgb(241, 97, 97)',
});
const SectionLabel = glamorous.span({
  lineHeight: '17px',
  paddingTop: 7,
  paddingBottom: 7,
});

const Components = {
  ol: glamorous.ol({
    display: 'block',
    padding: 0,
    margin: 0,
    marginLeft: 10,
    paddingBottom: 10,
    overflow: 'hidden',
  }),
  li: glamorous.li(
    {
      display: 'block',
      lineHeight: '30px',
    },
    ({ hasMany }) => ({
      borderLeft: hasMany ? '1px solid rgba(200, 200, 200, 1)' : '1px solid transparent',
    })
  ),
  a: glamorous(({ children, path, ...rest }) =>
    <a {...rest}>
      <SectionNr>
        {path}
      </SectionNr>
      <SectionLabel>
        {children}
      </SectionLabel>
    </a>
  )({
    color: 'currentColor',
    display: 'inline-flex',
    alignItems: 'stretch',
    borderBottom: '1px solid rgba(200, 200, 200, 1)',
    textDecoration: 'none',
    position: 'relative',
    marginLeft: -1,
  }),
  p: ({ children }) => children[0],
};

const getDepth = (node, depth, index) => {
  // const localIndex = index + 1;
  if (node.type === 'ol') {
    return depth.concat(index);
  } else if (node.type === 'li') {
    return depth.slice(0, -1).concat(index + 1);
  }
  return depth;
};

const mapChildren = children =>
  Children.toArray(children).filter(i => !(typeof i === 'string' && i.length < 2));

const mapComponents = (node, index = 0, depth = [], hasNext) => {
  if (typeof node === 'string') {
    return node;
  }

  const Component = Components[node.type];
  const { children, ...props } = node.props || {};
  const localDepth = getDepth(node, depth, index);
  const localChildren = mapChildren(children);

  return (
    <Component key={node.key} path={localDepth.join('˚')} {...props} hasMany={hasNext}>
      {localChildren.map((item, localIndex, list) =>
        mapComponents(item, localIndex, localDepth, localIndex < list.length - 1)
      )}
    </Component>
  );
};

const List = glamorous.ol({
  position: 'relative',
  padding: 0,
  margin: 0,
  color: 'black',
});

const Toc = ({ toc }) =>
  toc.length
    ? <div>
        <MarkdownContent>
          <h2>Table of contents</h2>
        </MarkdownContent>
        <List>
          {mapChildren(toc).map((item, index, list) =>
            mapComponents(item, index, [], index < list.length - 1)
          )}
        </List>
      </div>
    : null;

Toc.displayName = 'Toc';
Toc.propTypes = {
  toc: PropTypes.arrayOf(PropTypes.node),
};
Toc.defaultProps = {
  toc: [],
};

export default Toc;
