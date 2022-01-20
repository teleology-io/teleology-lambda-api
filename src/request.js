import qs from 'querystring';
import { clean } from '@teleology/fp';

const extractBody = ({ body, isBase64Encoded }) => {
  let value = body;
  if (isBase64Encoded) {
    try {
      value = Buffer.from(body, 'base64');
    } catch (e) {
      // do nothing
    }
  }

  try {
    const o = JSON.parse(value);
    if (o && typeof o === 'object') {
      return o;
    }
  } catch (e) {
    // do nothing
  }

  try {
    return { ...qs.parse(value) };
  } catch (e) {
    // do nothing
  }

  return body;
};

export default ({
  headers = {},
  pathParameters = {},
  queryStringParameters = {},
  body = '',
  isBase64Encoded,
  requestContext,
  ...event
}) => {
  const h = Object.keys(headers).reduce((a, key) => {
    a[key.toLowerCase()] = headers[key];
    return a;
  }, {});

  const ctx = {};

  if (requestContext) {
      // Claims portion here is to support serverless-offline  
      ctx.auth = requestContext?.authorizer?.claims || requestContext.authorizer;
  }

  return clean({
    ...event,
    ...ctx,
    headers: h,
    requestContext,
    data: {
      ...pathParameters,
      ...queryStringParameters,
      ...extractBody({ body, isBase64Encoded }),
    },
  });
};
