import { wrapper, ApiError } from '../src';

const event = {
  pathParameters: {
    slug: 'test',
  },
  queryStringParameters: {
    next: 10,
  },
};

describe.only('wrapper', () => {
  it('success defaults', async () => {
    const handler = () => ({
      foo: 'bar',
    });

    const result = await wrapper(handler)(event);
    expect(result).toEqual({
      body: '{"foo":"bar"}',
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      statusCode: '200',
    });
  });

  it('error defaults', async () => {
    const handler = () => {
      throw new Error('foo');
    };

    const result = await wrapper(handler)(event);
    expect(result).toEqual({
      body: '{"error":"foo"}',
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      statusCode: '500',
    });
  });

  it('custom error', async () => {
    const handler = () => {
      throw new ApiError('Unauthorized', { code: 401, description: 'nope' });
    };

    const result = await wrapper(handler)(event);
    expect(result).toEqual({
      body: '{"error":"Unauthorized"}',
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      statusCode: '401',
    });
  });
});
