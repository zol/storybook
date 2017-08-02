import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import glamorous from 'glamorous';

const Item = glamorous(({ name, route, ...props }) =>
  <Link {...props} href={route}>
    {props.files && props.files.length
      ? <a>
          {name}
        </a>
      : <a>
          {name}
        </a>}
  </Link>
)({
  color: 'orangered',
});

/* WORKLOG:
 * get route siblings || children
 */

const getItems = (sitemap, path) => {
  const out = Object.keys(sitemap).find(k => sitemap[k].files.find(f => f === path));
  return sitemap[out].files.map(k => sitemap[k]);
};

const SideNav = glamorous(({ sitemap, path, ...props }) =>
  <ul {...props}>
    {getItems(sitemap, path).map(item =>
      <li>
        <Item {...item} />
      </li>
    )}
  </ul>
)({
  background: 'none',
  border: '0 none',
  padding: 0,
  width: 30,
  '& > *': {
    height: '100%',
    width: 'auto',
  },
});

SideNav.displayName = 'SideNav';
SideNav.propTypes = {
  sitemap: PropTypes.arrayOf(PropTypes.object),
};

export default SideNav;
