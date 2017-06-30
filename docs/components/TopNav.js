import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

// import StorybookIcon from '../components/logos/StorybookIcon';
import StorybookLogo from '../components/logos/Storybook';
import MenuIcon from '../components/icons/Menu';
import GithubIcon from '../components/icons/Github';
import SlackIcon from '../components/icons/Slack';
import MediumIcon from '../components/icons/Medium';
import TwitterIcon from '../components/icons/Twitter';

import Search from '../components/Search';

const Bar = glamorous.nav(
  {
    position: 'fixed',
    left: -10,
    top: '0px',
    right: -10,
    bottom: 'auto',
    padding: '12px 22px',
    display: 'flex',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    boxShadow: '0 0 30px rgba(0,0,0,0.3)',
    height: 50,
    backgroundImage:
      'linear-gradient(to bottom, rgba(255,255,255, 1) 0%, rgba(244,244,244, 0.94) 100%)',
  },
  ({ active }) => ({
    '@media screen and (min-width: 501px)': {
      padding: '12px 22px',
      zIndex: 999,
    },
    '@media screen and (max-width: 500px)': {
      padding: '8px 16px',
      zIndex: active ? 1001 : 999,
    },
  })
);
const TopLogo = glamorous(StorybookLogo)({
  height: '100%',
  width: 'auto',
});
const Nav = glamorous.ul(({ active }) => ({
  margin: 0,
  padding: 0,
  '@media screen and (min-width: 501px)': {
    display: 'flex',
    margin: '-12px -22px -12px 20px',
    overflow: 'auto',
    padding: 0,
  },
  '@media screen and (max-width: 500px)': {
    position: 'absolute',
    top: 50,
    left: 0,
    height: 'calc(100vh - 50px)',
    minWidth: 'calc(100vw - 55px)',
    maxWidth: '90vw',
    overflow: 'auto',
    transition: 'transform .24s cubic-bezier(0.4, 0, 0, 1.17)',
    backgroundColor: 'rgba(244,244,244, 0.94)',
    transform: `translateX(${active ? 0 : -100}px)`,
    opacity: active ? 1 : 0,
  },
}));
const NavItem = glamorous.li(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    borderLeft: '1px solid rgba(0, 0, 0, 0.05)',
  },
  ({ padded = true }) => ({
    padding: padded ? 12 : 0,
  })
);
const NavToggle = glamorous(({ children, ...props }) =>
  <button {...props} title="open navigation">
    <MenuIcon />
    {children}
  </button>
)({
  '@media screen and (min-width: 501px)': {
    display: 'none',
  },
  '@media screen and (max-width: 500px)': {
    position: 'absolute',
    right: 20,
    top: 10,
    bottom: 10,
    auto: 50,
    display: 'block',
    background: 'none',
    border: '0 none',
    padding: 0,
  },
  '& > *': {
    height: '100%',
    width: 'auto',
  },
});

const TopNav = class extends Component {
  constructor(props) {
    super(props);

    this.state = { active: false };
    this.toggle = () => {
      this.setState({ active: !this.state.active });
    };
  }
  render() {
    const { active } = this.state;
    return (
      <Bar active={active}>
        <TopLogo />
        <NavToggle onClick={this.toggle} active={active} />
        <Nav active={active}>
          <NavItem>Guides</NavItem>
          <NavItem>Demo</NavItem>
          <NavItem>Docs</NavItem>
          <NavItem>Examples</NavItem>
          <NavItem padded={false}>
            <Search />
          </NavItem>
          <NavItem>
            <GithubIcon height={20} />
            <SlackIcon height={20} />
            <TwitterIcon height={20} />
            <MediumIcon height={20} />
          </NavItem>
        </Nav>
      </Bar>
    );
  }
};

TopNav.displayName = 'TopNav';
TopNav.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TopNav;
