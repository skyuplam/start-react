import serialize from 'serialize-javascript';
import config from '../../config';


const scriptTag = (jsPath) =>
  `<script type="text/javascript" src="${jsPath}"></script>`;

const isDev = process.env.NODE_ENV === 'development';

const scriptTags = (jsPaths) =>
  jsPath.map(scriptTag).join('/n');

export default function generateHTML(options) {
  const { renderedString, initialState, helmet } = options;

  const inlineScript = body =>
    `<script type="text/javascript">${body}</script>`;

  const attributes = helmet ? helmet.htmlAttributes.toString() : '';

  const html = `
  <!DOCTYPE html>
  <html${attributes ? ` ${attributes}` : ''}>
    <head>
      <meta charset="utf-8">
      <!-- Make the page mobile compatible -->
      <meta name="viewport" content="width=device-width,initial-scale=1">
      ${helmet ? helmet.title.toString() : ''}
      ${helmet ? helmet.meta.toString() : ''}
      ${helmet ? helmet.style.toString() : ''}
    </head>
    <body>
      <section role="main" id="app">
        <noscript>If you're seeing this message, that means <strong>JavaScript has been disabled on your browser</strong>, please <strong>enable JS</strong> to make this app work.</noscript>
        <div>
          ${renderedString || ''}
        </div>
      </section>
      ${initialState ?
        inilineScript(`window.__APP_STATE__=${serialize(initialState)}`)
        : ''}
      ${scriptTag('/static/bundle.js')}
    </body>
  </html>
  `;
  return html.replace(/\s{2,}/g, '');  // Remove spaces
};
