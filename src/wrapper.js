/* eslint-disable no-param-reassign */
import request from './request';
import response from './response';

const serializeError = (e) =>
  Object.getOwnPropertyNames(e).reduce((error, key) => {
    // Don't include stack in json response
    if (key === 'stack') return error;

    error[key] = e[key];
    return error;
  }, {});

export default (fn) => async (event) => {
  try {
    const { code = 200, body, headers = {}, ...rest } =
      (await fn(request(event))) || {};
    return response({
      code,
      headers,
      body: body || rest,
    });
  } catch (e) {
    return response({
      code: e.code || 500,
      body: serializeError(e),
    });
  }
};
