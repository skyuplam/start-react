'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _reactRouter = require('react-router');

var _HTMLGenerator = require('./HTMLGenerator');

var _HTMLGenerator2 = _interopRequireDefault(_HTMLGenerator);

var _App = require('../../../client/containers/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * A Koa middleware that is capable of serving react appcaition.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

var middleware = function middleware(options) {
  return function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
      var request, response, res, context, contentToBeRender, renderedString, result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              request = ctx.request, response = ctx.response, res = ctx.res;

              // first create a context for <ServerRouter>, it's where we keep the
              // results of rendering for the second pass if necessary

              context = (0, _reactRouter.createServerRenderContext)();

              // render the first time

              contentToBeRender = _react2.default.createElement(
                _reactRouter.ServerRouter,
                {
                  location: request.url,
                  context: context
                },
                _react2.default.createElement(_App2.default, null)
              );
              renderedString = (0, _server.renderToString)(contentToBeRender);

              // Get the result

              result = context.getResult();

              // The result will tell you if it redirected, if so. we ignore
              // the markup and send a proper redirect

              if (!result.redirect) {
                _context.next = 10;
                break;
              }

              response.status = 301;
              response.header.location = result.redirect.pathname;

              _context.next = 10;
              return next();

            case 10:

              // the result will tell you if there were any misses, if so
              // we can send a 404 and then do a second render pass with
              // the context to clue the <Miss> components into rendering
              // this time (on the client they know from componentDidMount)
              response.status = result.missed ? 404 : 200;
              response.body = (0, _HTMLGenerator2.default)({ renderedString: renderedString, helmet: _reactHelmet2.default.rewind() });

              _context.next = 14;
              return next();

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function frontendMiddleware(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return frontendMiddleware;
  }();
};

exports.default = middleware;