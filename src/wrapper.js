/* eslint-disable no-param-reassign */
import request from './request';
import response from './response';

export default (fn) => async (event) => {
  try {
    const { body, headers = {}, ...rest } = await fn(request(event));
    return response({
      code: 200,
      headers,
      body: body || rest,
    });
  } catch (e) {
    // todo: coming soon: a way to configure this that doesn't rely on serverless-offline
    if (process.env.IS_OFFLINE === "true") { /* true if using serverless-offline */
      // AWS framework will handle this
      throw e;
    } else {
      return new Promise((_, reject) => {reject(e.toString())});
    }
  }
};
