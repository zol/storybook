import slug from 'remark-slug';
import util from 'mdast-util-toc';

const simplifyPocAst = node => {
  const localNode = Object.assign({}, node);
  if (localNode.ordered === false) {
    localNode.ordered = true;
  }
  if (localNode.children) {
    localNode.children = localNode.children.map(simplifyPocAst);
  }
  if (localNode.loose === false) {
    localNode.loose = true;
  }
  return localNode;
};

export default function toc(options) {
  const settings = Object.assign(options || {});
  // const heading = settings.heading || 'toc|table[ -]of[ -]contents?';
  const depth = settings.maxDepth || 6;
  const tight = settings.tight;

  this.use(slug);

  function transformer(node) {
    const { map: data, index, endIndex } = util(node, {
      // heading,
      maxDepth: depth,
      tight,
    });

    if (!data) {
      return;
    }
    const map = {
      type: 'ReactComponent',
      data: {
        hName: 'component',
        hProperties: {
          component: 'Toc',
        },
      },
      children: [...simplifyPocAst(data).children],
      options: {
        component: 'Toc',
      },
    };

    if (index >= 0) {
      // eslint-disable-next-line no-param-reassign
      node.children = [].concat(node.children.slice(0, index), map, node.children.slice(endIndex));
    } else {
      // eslint-disable-next-line no-param-reassign
      node.children = [].concat(map).concat(node.children);
    }
  }

  return transformer;
}
