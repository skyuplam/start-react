'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-polyfill');

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaMount = require('koa-mount');

var _koaMount2 = _interopRequireDefault(_koaMount);

var _koaCompress = require('koa-compress');

var _koaCompress2 = _interopRequireDefault(_koaCompress);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _frontend = require('./middlewares/frontend');

var _frontend2 = _interopRequireDefault(_frontend);

var _errorHandler = require('./middlewares/errorHandler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();

// Gzip compress the response
app.use((0, _koaCompress2.default)());

// Frontend Middleware
app.use((0, _koaMount2.default)('/', (0, _frontend2.default)()));

// Error Handler
app.use(_errorHandler2.default);

var server = app.listen(_config2.default.port, _config2.default.host, function () {
  return console.log('Server listening on port ' + _config2.default.port);
});

exports.default = server;