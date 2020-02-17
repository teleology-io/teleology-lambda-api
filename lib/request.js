"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _querystring = _interopRequireDefault(require("querystring"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const extractBody = ({
  body,
  isBase64Encoded
}) => {
  try {
    const debuff = Buffer.from(body, isBase64Encoded ? 'base64' : undefined);
    const o = JSON.parse(debuff);

    if (o && typeof o === 'object') {
      return o;
    }
  } catch (e) {// do nothing
  }

  return body;
};

var _default = ({
  headers,
  pathParameters,
  queryStringParameters,
  ...event
}) => {
  const h = Object.keys(headers).reduce((a, key) => {
    a[key.toLowerCase()] = headers[key];
    return a;
  }, {});
  return { ...event,
    headers: h,
    data: { ...pathParameters,
      ...queryStringParameters,
      ...extractBody(event),
      ..._querystring.default.parse(event.body || '')
    }
  };
};

exports.default = _default;