import qs from 'querystring';
import { request } from '../src';

describe('request', () => {
  it('parses querystrings correctly', () => {
    const event = {
      headers: {},
      body: qs.stringify({ test: 1, and: 3 }),
    };

    const { data } = request(event);
    expect(data.test).toEqual('1');
    expect(data.and).toEqual('3');
  });

  it('parses json correctly', () => {
    const event = {
      headers: {},
      body: JSON.stringify({ test: 1, and: 3 }),
    };

    const { data } = request(event);
    expect(data.test).toEqual(1);
    expect(data.and).toEqual(3);
  });

  it('parses encoded correctly', () => {
    const event = {
      headers: {},
      body: Buffer.from(JSON.stringify({ test: 1, and: 3 })).toString('base64'),
      isBase64Encoded: true,
    };

    const { data } = request(event);
    expect(data.test).toEqual(1);
    expect(data.and).toEqual(3);
  });

  it('lowercases all headers', () => {
    const event = {
      headers: {
        'Content-Type': 'application/json',
        'Fake-Header': 'test',
      },
    };

    const response = request(event);
    expect(response.headers).toEqual({
      'fake-header': 'test',
      'content-type': 'application/json',
    });
  });

  it('moves all query, path params, body to data', () => {
    const event = {
      pathParameters: {
        slug: 123,
      },
      queryStringParameters: {
        next: 10,
      },
      body: JSON.stringify({
        foo: 'bar',
      }),
      headers: {
        'Fake-Header': 'test',
      },
    };

    const response = request(event);
    expect(response).toEqual({
      data: { foo: 'bar', next: 10, slug: 123 },
      headers: { 'fake-header': 'test' },
    });
  });
});
