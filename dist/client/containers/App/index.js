'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'p',
      null,
      'DEMO'
    ),
    _react2.default.createElement(_reactRouter.Match, {
      exactly: true,
      pattern: '/',
      render: function render(props) {
        return _react2.default.createElement(
          'p',
          null,
          'Home'
        );
      }
    }),
    _react2.default.createElement(_reactRouter.Miss, { component: function component(props) {
        return _react2.default.createElement(
          'p',
          null,
          'Page Not Found'
        );
      } })
  );
};

exports.default = App;