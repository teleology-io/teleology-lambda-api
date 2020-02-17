import qs from 'querystring';

const extractBody = ({ body, isBase64Encoded }) => {
  try {
    const debuff = Buffer.from(body, isBase64Encoded ? 'base64' : undefined);
    const o = JSON.parse(debuff);
    if (o && typeof o === 'object') {
      return o;
    }
  } catch (e) {
    // do nothing
  }

  return body;
};

export default ({
  headers,
  pathParameters,
  queryStringParameters,
  ...event
}) => {
  const h = Object.keys(headers).reduce((a, key) => {
    a[key.toLowerCase()] = headers[key];
    return a;
  }, {});

  return {
    ...event,
    headers: h,
    data: {
      ...pathParameters,
      ...queryStringParameters,
      ...extractBody(event),
      ...qs.parse(event.body || ''),
    },
  };
};
