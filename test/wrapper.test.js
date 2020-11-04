import { wrapper } from '../src';

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
    const expectedHandlerReturnValue = {
      foo: 'bar',
    };
    const handler = () => (expectedHandlerReturnValue);

    const result = await wrapper(handler)(event);
    expect(result).toEqual(expectedHandlerReturnValue);
  });

  it('error defaults', async () => {
    const error = new Error('foo');

    const handler = () => {
      throw error;
    };

    await expect(wrapper(handler)(event)).rejects.toEqual(error.toString());
  });

  it('custom error', async () => {
    const error = new Error('Unauthorized');

    const handler = () => {
      throw error;
    };

    await expect(wrapper(handler)(event)).rejects.toEqual(error.toString());  
  });

  it('custom error, when IS_OFFLINE, rethrow', async () => {
    const msg = 'Unauthorized';
    const error = new Error(msg);
    // move to before/after if there are any more tests that require this env variable
    const envBefore = process.env.IS_OFFLINE;
    try {
      process.env.IS_OFFLINE = "true";

      const handler = () => {
        throw error;
      };

      await expect(wrapper(handler)(event)).rejects.toThrow(msg);  
    } catch(e) {
      process.env.IS_OFFLINE = envBefore;
      throw e;
    }
  });
});
