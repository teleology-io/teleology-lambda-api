/* eslint-disable no-param-reassign */
import request from './request';

export default (fn) => async (event) => {
  try {
    return await fn(request(event));
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
