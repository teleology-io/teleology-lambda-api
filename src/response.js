const DEFAULT_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Content-Type': 'application/json',
};

export default ({ code = 200, body = '', headers }) => ({
  statusCode: `${code}`,
  body: typeof body === 'string' ? body : JSON.stringify(body),
  headers: {
    ...DEFAULT_HEADERS,
    ...headers,
  },
});
