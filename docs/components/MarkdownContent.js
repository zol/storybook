import glamorous from 'glamorous';

const substyles = {
  h1: {
    color: 'currentColor',
    textShadow: '1px 1px 1px rgba(0, 0, 0, 0.19)',
    fontWeight: 300,
    fontSize: 26,
  },
  h2: {
    color: 'currentColor',
    fontWeight: 400,
    fontSize: 22,
    borderBottom: '1px solid currentColor',
  },
  h3: {
    color: 'currentColor',
    fontWeight: 700,
    fontSize: 16,
  },
};

const H1 = glamorous.h1(substyles.h1);
const H2 = glamorous.h2(substyles.h2);
const H3 = glamorous.h3(substyles.h3);

const MarkdownContent = glamorous.div(
  {
    '& h1, & h2, & h3, & h4, & h5, & h6': {
      marginTop: -80, // this will make browser scroll-to behavior to be 80px off
      paddingTop: 80, // ensuring the header will not be covered by the sticky header
      marginBottom: '0.6em',
    },
    '& h1': substyles.h1,
    '& h2': substyles.h2,
    '& h3': substyles.h3,
    '& a': {
      borderBottom: '1px dashed currentColor',
      textDecoration: 'none',
      transition: 'color 0.3s',
      '&:hover, &:focus, &:active': {
        outline: 0,
        borderBottomStyle: 'solid',
      },
    },
    '& p': {
      color: 'currentColor',
      fontWeight: 'normal',
      fontSize: 15,
      marginTop: 0,
      marginBottom: '1.2em',
      lineHeight: '1.4em',
    },
  },
  ({ colored = true }) =>
    colored
      ? {
          '& a': {
            color: 'rgb(240, 97, 141)',
            '&:hover, &:focus, &:active': {
              color: 'rgb(181, 126, 229)',
            },
          },
        }
      : {
          '& a': {
            color: 'currentColor',
            '&:hover, &:focus, &:active': {
              color: 'currentColor',
            },
          },
        }
);
MarkdownContent.displayName = 'MarkdownContent';

export { MarkdownContent as default, H1, H2, H3 };
