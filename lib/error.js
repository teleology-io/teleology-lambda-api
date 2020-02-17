"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("util");

function ApiError(message, properties) {
  this.name = 'ApiError';
  this.message = message || '';
  Object.assign(this, {
    code: 500
  }, properties);
  Error.captureStackTrace(this, ApiError);
}

(0, _util.inherits)(ApiError, Error);
var _default = ApiError;
exports.default = _default;