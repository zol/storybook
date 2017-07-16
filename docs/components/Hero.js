import React, { Children } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { css } from 'glamor';

const gradients = {
  blue: 'linear-gradient(135deg, #2ab5bb 8%, #2a7bbb)',
  pink: 'linear-gradient(135deg, rgb(241,97,140) 0%, rgb(181,126,229) 100%)',
};

const Root = glamorous.section(
  {
    position: 'relative',
    zIndex: 1000,
    backgroundColor: '#2ab5bb',
    backgroundImage: gradients.pink,
    display: 'flex',
    minHeight: '60vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    boxSizing: 'border-box',
  },
  ({ minHeight = '60vh' }) => ({
    minHeight,
  })
);

const Hero = ({ children, ...rest }) =>
  <Root {...rest}>
    <div>
      {children}
    </div>
  </Root>;

Hero.displayName = 'Hero';
Hero.propTypes = {
  children: PropTypes.node.isRequired,
};

const flowIn = css.keyframes({
  '0%': {
    transform: 'translate(10px, 100%)',
    opacity: 0,
  },
  '100%': {
    transform: 'translate(0, 0)',
    opacity: 1,
  },
});

const H1 = glamorous.h1({
  overflow: 'hidden',
  // textAlign: 'center',
  lineHeight: 1.3,
  display: 'block',
  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
  fontSize: '3em',
  fontWeight: 200,
  marginTop: 0,
  marginBottom: 20,
  color: '#fff',
});
const Section = glamorous.span(
  {
    display: 'inline-block',
    position: 'relative',
    zIndex: 1,
    transform: 'translate(20%, 100%)',
    paddingRight: '0.2em',

    animationName: flowIn,
    opacity: 0,
    animationDuration: '0.9s',
    animationTimingFunction: 'cubic-bezier(0.65, 0.02, 0.23, 1)',
    animationDelay: 0,
    animationIterationCount: '1',
    animationFillMode: 'forwards',
  },
  ({ index }) => ({
    animationDelay: `${index / 14}s`,
  })
);
const HeroTitle = ({ children }) =>
  <H1>
    {Children.toArray(children)
      .reduce((acc, item) => acc.concat(item.split ? item.split(' ') : item), [])
      .map(
        (item, index) =>
          item.type === 'br'
            ? item
            : <Section index={index} key={index}>
                {item}
              </Section>
      )}
  </H1>;

export { Hero as default, HeroTitle };
