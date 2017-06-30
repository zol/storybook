import React, { Component } from 'react';
import glamorous from 'glamorous';

import SearchIcon from './icons/Search';

const Form = glamorous.form({
  display: 'inline-block',
  position: 'relative',
  height: 30,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  verticalAlign: 'middle',
});

const Wrapper = glamorous.div({
  width: '100%',
  height: '100%',
});

const Submit = glamorous.button({
  position: 'absolute',
  top: 0,
  margin: 0,
  border: 0,
  backgroundColor: 'rgba(255, 255, 255, 0)',
  padding: 0,
  width: 30,
  lineHeight: '30px',
  height: '100%',
  verticalAlign: 'middle',
  textAlign: 'center',
  fontSize: 'inherit',
  userSelect: 'none',
  pointerEvents: 'none',
  right: 'inherit',
  left: 5,
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'center',
  '& > *': {
    height: 16,
    width: 'auto',
  },
});

const Input = glamorous.input({
  lineHeight: 1.2,
  background: 'transparent',
  '-webkit-appearance': 'none',
  boxSizing: 'border-box',
  display: 'inline-block',
  transition: 'box-shadow .4s ease, background .4s ease',
  border: 0,
  padding: 0,
  width: 40,
  height: '100%',
  verticalAlign: 'middle',
  whiteSpace: 'normal',
  fontSize: 12,
  color: 'transparent',
  fontFamily: 'inherit',
  margin: 0,
  zIndex: 1,
  [`&:focus,
    &:active
  `]: {
    paddingRight: 5,
    paddingLeft: 35,
    width: '100%',
    outline: 0,
    background: 'rgba(255,255,255,0.5)',
    color: 'inherit',
  },
  [`&::-webkit-search-decoration, 
    &::-webkit-search-cancel-button, 
    &::-webkit-search-results-button, 
    &::-webkit-search-results-decoration
  `]: {
    display: 'none',
  },
  '&::placeholder': {
    color: 'transparent',
  },
  [`&:focus::placeholder,
    &:active::placeholder
  `]: {
    color: 'rgba(0,0,0,0.2)',
  },
});

const Search = class extends Component {
  render() {
    const { props } = this;

    return (
      <Form novalidate="novalidate" onsubmit="return false;">
        <Wrapper role="search">
          <Input
            autoComplete="off"
            id="docsearch"
            name="search"
            placeholder="Search the docs"
            required="required"
            type="search"
          />
          <Submit title="Submit your search query." type="submit">
            <SearchIcon />
          </Submit>
        </Wrapper>
      </Form>
    );
  }
};

export { Search as default };
