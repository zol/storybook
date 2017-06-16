import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import StorybookIcon from '../components/logos/StorybookIcon';
import StorybookLogo from '../components/logos/Storybook';

const Bar = glamorous.div({
  position: 'fixed',
  zIndex: 999,
  left: -10,
  top: '0px',
  right: -10,
  bottom: 'auto',
  height: 60,
  padding: '12px 22px',
  boxSizing: 'border-box',
  // backgroundColor: '#593093',
  backgroundImage:
    'linear-gradient(to bottom, rgba(255,255,255, 1) 0%, rgba(244,244,244, 0.94) 100%)',
  boxShadow: '0 0 30px rgba(0,0,0,0.3)',
});
const TopLogo = glamorous(StorybookLogo)({
  height: '100%',
  width: 'auto',
});

const TopNav = () =>
  <Bar>
    <TopLogo />
  </Bar>;

TopNav.displayName = 'TopNav';
TopNav.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TopNav;
