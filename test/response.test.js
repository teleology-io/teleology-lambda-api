import { response } from '../src';

describe('response', () => {
  it('uses defaults', () => {
    const result = response({});

    expect(result).toEqual({
      body: '',
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      statusCode: '200',
    });
  });

  it('stringifies body data', () => {
    const result = response({
      body: {
        foo: 'bar',
      },
    });

    expect(result.body).toEqual(JSON.stringify({ foo: 'bar' }));
  });

  it('overrides headers', () => {
    const result = response({ headers: { 'Content-Type': 'text/plain' } });

    expect(result.headers['Content-Type']).toEqual('text/plain');
  });

  it('overrides code', () => {
    const result = response({ code: 500 });

    expect(result.statusCode).toEqual('500');
  });
});
