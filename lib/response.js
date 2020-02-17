"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const DEFAULT_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Content-Type': 'application/json'
};

var _default = ({
  code = 200,
  body,
  headers
}) => ({
  statusCode: `${code}`,
  body: typeof body === 'string' ? body : JSON.stringify(body),
  headers: { ...DEFAULT_HEADERS,
    ...headers
  }
});

exports.default = _default;