const C_NEWLINE = '\n';

module.exports = function blockPlugin() {
  const regex = new RegExp(':::([a-z]+)(.*)', 'i');
  const regexClose = new RegExp(':::');

  function blockTokenizer(eat, value, silent) {
    const now = eat.now();
    const keep = regex.exec(value);
    if (!keep) return;
    if (keep.index !== 0) return;

    // eslint-disable-next-line consistent-return
    if (silent) return true;

    const linesToEat = [];
    const content = [];

    let idx = 0;
    // eslint-disable-next-line no-cond-assign
    while ((idx = value.indexOf(C_NEWLINE)) !== -1) {
      const next = value.indexOf(C_NEWLINE, idx + 1);
      // either slice until next NEWLINE or slice until end of string
      const lineToEat = next !== -1 ? value.slice(idx + 1, next) : value.slice(idx + 1);
      if (lineToEat.match(regexClose)) {
        linesToEat.push(lineToEat);
        break;
      }

      const line = lineToEat;
      linesToEat.push(lineToEat);
      content.push(line);
      // eslint-disable-next-line no-param-reassign
      value = value.slice(idx + 1);
    }

    const contentString = content.join(C_NEWLINE);
    const stringToEat = `${keep[0]}${C_NEWLINE}${linesToEat.join(C_NEWLINE)}`;

    const add = eat(stringToEat);
    const exit = this.enterBlock();
    const contents = this.tokenizeBlock(contentString, now);
    exit();

    // eslint-disable-next-line consistent-return
    return add({
      type: 'ReactComponent',
      data: {
        hName: 'component',
        hProperties: {
          props: keep[2],
          component: `${keep[1]}`,
        },
      },
      children: contents,
      options: {
        component: `${keep[1]}`,
        props: keep[2],
      },
    });
  }

  const Parser = this.Parser;

  // Inject blockTokenizer
  const blockTokenizers = Parser.prototype.blockTokenizers;
  const blockMethods = Parser.prototype.blockMethods;
  blockTokenizers.custom_blocks = blockTokenizer;
  blockMethods.splice(blockMethods.indexOf('fencedCode') + 1, 0, 'custom_blocks');

  // Inject into interrupt rules
  const interruptParagraph = Parser.prototype.interruptParagraph;
  const interruptList = Parser.prototype.interruptList;
  const interruptBlockquote = Parser.prototype.interruptBlockquote;
  interruptParagraph.splice(interruptParagraph.indexOf('fencedCode') + 1, 0, ['custom_blocks']);
  interruptList.splice(interruptList.indexOf('fencedCode') + 1, 0, ['custom_blocks']);
  interruptBlockquote.splice(interruptBlockquote.indexOf('fencedCode') + 1, 0, ['custom_blocks']);
};
