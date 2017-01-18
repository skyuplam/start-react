'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/*
 * Koa Middlerware for handling error
 *
 */

var middleware = function middleware(options) {
  return function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return next();

            case 3:
              _context.next = 16;
              break;

            case 5:
              _context.prev = 5;
              _context.t0 = _context['catch'](0);

              if (!(_context.t0.status === 400)) {
                _context.next = 12;
                break;
              }

              // Handle 404 error, Note: the frontend middleware has already handle
              // 404 path, but it is a good practise to safe guard here
              ctx.status = 400;
              ctx.body = 'Page not found!';
              _context.next = 16;
              break;

            case 12:
              ctx.status = 500;
              ctx.body = 'Sorry, an unexpected error occurred.';

              _context.next = 16;
              return next();

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 5]]);
    }));

    function errorHandlerMiddleware(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return errorHandlerMiddleware;
  }();
};

exports.default = middleware;