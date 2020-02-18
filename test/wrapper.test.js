import { wrapper, ApiError } from '../src';

const event = {
  pathParameters: {
    slug: 'test',
  },
  queryStringParameters: {
    next: 10,
  },
};

describe('wrapper', () => {
  it('basic wrap', async () => {
    const handler = (event) => {
      return {
        foo: 'bar',
      };
    };

    const wrapped = wrapper(handler);

    const result = await wrapped(event);
    expect(result).toEqual('fo');
  });
});
