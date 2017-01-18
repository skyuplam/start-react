import serialize from 'serialize-javascript';
import config from '../../config';


const scriptTag = (jsPath) =>
  `<script type="text/javascript" src="${jsPath}"></script>`;

const scriptTags = (jsPaths) =>
  jsPath.map(scriptTag).join('/n');

export default function generateHTML(options) {
  const { renderedString, initialState, helmet } = options;

  const inlineScript = body =>
    `<script type="text/javascript">${body}</script>`;

  const html = `
  <!DOCTYPE html>
  <html ${helmet ? helmet.htmlAttributes.toString() : ''}>
    <head>
      ${helmet ? helmet.title.toString() : ''}
      ${helmet ? helmet.meta.toString() : ''}
      ${helmet ? helmet.style.toString() : ''}
    </head>
    <body>
      <div id="app">
        ${renderedString || ''}
      </div>
      ${initialState ?
        inilineScript(`window.__APP_STATE__=${serialize(initialState)}`)
        : ''}
      ${scriptTag('/static/bundle.js')}
    </body>
  </html>
  `;
  return html.replace(/\s+/g, '');  // Remove spaces to get rid of react warning
};
