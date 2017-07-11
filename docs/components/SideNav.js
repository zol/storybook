import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import glamorous from 'glamorous';

const Item = glamorous(({ name, path, ...props }) =>
  <Link {...props} href={path}>
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
 * get current route
 * find matching route in sitemap
 * get route siblings || children
 */

const SideNav = glamorous(({ sitemap, ...props }) =>
  <ul {...props}>
    {/* temp disabled */}
    {([] || sitemap).map(item =>
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
