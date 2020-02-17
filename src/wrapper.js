import request from './request';
import response from './response';

export default (fn) => async (event) => {
  try {
    return response({
      code: 200,
      body: await fn(request(event)),
    });
  } catch (e) {
    return response({
      code: e.code || 500,
      body: {
        error: e.message,
      },
    });
  }
};
