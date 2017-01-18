'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateHTML;

var _serializeJavascript = require('serialize-javascript');

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scriptTag = function scriptTag(jsPath) {
  return '<script type="text/javascript" src="' + jsPath + '"';
};

var scriptTags = function scriptTags(jsPaths) {
  return jsPath.map(scriptTag).join('/n');
};

function generateHTML(options) {
  var renderedString = options.renderedString,
      initialState = options.initialState,
      helmet = options.helmet;


  var inlineScript = function inlineScript(body) {
    return '<script type="text/javascript">' + body + '</script>';
  };

  return '\n  <!DOCTYPE html>\n  <html ' + (helmet ? helmet.htmlAttributes.toString() : '') + '>\n    <head>\n      ' + (helmet ? helmet.title.toString() : '') + '\n      ' + (helmet ? helmet.meta.toString() : '') + '\n      ' + (helmet ? helmet.style.toString() : '') + '\n    </head>\n    <body>\n      <div id="app">\n        ' + (renderedString || '') + '\n      </div>\n      ' + (initialState ? inilineScript('window.__APP_STATE__=' + (0, _serializeJavascript2.default)(initialState)) : '') + '\n    </body>\n  </html>\n  ';
};