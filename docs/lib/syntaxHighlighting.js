/* eslint-disable func-names, no-useless-escape, no-param-reassign */

// const prettier = require('prettier');

const path = require('path');
const fs = require('fs');

const loaderSource = fs.readFileSync(
  path.join(__dirname, '..', 'node_modules', 'monaco-editor/min/vs/loader.js'),
  { encoding: 'utf8' }
);
const editorSource = fs.readFileSync(
  path.join(__dirname, '..', 'node_modules', 'monaco-editor/min/vs/editor/editor.main.js'),
  { encoding: 'utf8' }
);
const editorNlsSource = fs.readFileSync(
  path.join(__dirname, '..', 'node_modules', 'monaco-editor/min/vs/editor/editor.main.nls.js'),
  { encoding: 'utf8' }
);

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on('error', (...params) => console.log(params));
virtualConsole.on('warn', (...params) => console.log(params));
virtualConsole.on('info', (...params) => console.log(params));
virtualConsole.on('dir', (...params) => console.log(params));
virtualConsole.on('log', (...params) => console.log(params));
virtualConsole.on('jsdomError', (...params) => console.log(params));

const window = new JSDOM(
  `
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" >
</head>
<body>
<div id="container" style="width:100%;height:100%">old data</div>
<script>${loaderSource}</script>
<script>${editorNlsSource}</script>
<script>${editorSource}</script>
<script>
  console.log("HIIII");
  require.config({ paths: { 'vs': '../node_modules/monaco-editor/min/vs' }});
	require('vs/editor/editor.main', function() {
    console.log("HIIII2");
		var editor = monaco.editor.create(document.getElementById('container'), {
			value: 'function x() { console.log("Hello world!"); }',
			language: 'javascript'
		});
	});
</script>

</body>
</html>`,
  { runScripts: 'dangerously', virtualConsole }
);
setTimeout(() => console.log(window.window.document.getElementById('container').innerHTML), 900);
setTimeout(() => console.log(window.window.document.getElementById('container').innerHTML), 1000);

module.exports = (value, language) => {
  // TODO: could do css too:
  // https://github.com/prettier/prettier#parser
  // const code =
  //   language === 'js'
  //     ? prettier.format(value, {
  //         printWidth: 100,
  //         tabWidth: 2,
  //         bracketSpacing: true,
  //         trailingComma: 'es5',
  //         singleQuote: true,
  //       })
  //     : value;
  // return (prism.languages[language]
  //   ? prism.highlight(code, prism.languages[language])
  //   : code).replace(/\n/g, '<br />');
};
