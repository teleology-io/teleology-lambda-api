"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _request = _interopRequireDefault(require("./request"));

var _response = _interopRequireDefault(require("./response"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = fn =>
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (event) {
    try {
      return (0, _response.default)({
        code: 200,
        body: yield fn((0, _request.default)(event))
      });
    } catch (e) {
      return (0, _response.default)({
        code: e.code || 500,
        body: {
          error: e.message
        }
      });
    }
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;