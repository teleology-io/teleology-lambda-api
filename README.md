![Downloads][link-download] ![Version][link-version] ![License][link-license]

# @teleology/lambda-api
Common utilities for wrapping aws lambda api gateway endpoints


# Installation 

```bash
yarn add @teleology/lambda-api
# or
npm i --save @teleology/lambda-api
```

# Documentation

## Wrapper

The wrapper function is a HOC, and will extract data from the incoming api gateway event. QueryStringParameters, pathParameters, and body data will automatically be collected and exposed in the data object. Header keys will be lowercased. 

```javascript
import { wrapper } from '@teleology/lambda-api';

const handler = async ({ headers, data }) => {
  // Some implementation
};

export default wrapper(handler);
```

_* Body data will be parsed in the following order:_
1. Buffer
2. JSON.parse
3. querystring.parse

## ApiError

ApiError is inherited from the base Error instance, with some extra features. It defaults with an empty message and a 500 code to reflect a respone error. Additional properties can be added to the error upon creation. 

```javascript
import { ApiError, wrapper } from '@teleology/lambda-api';

const handler = async ({ headers, data }) => {
  if (!data.username) {
    throw new ApiError('Bad Request', {
      code: 400,

      // additional properties
      description: 'Missing username property',
    })
  }

  // ...
};

export default wrapper(handler);
```

## request

Consumes an aws api gateway event, enhancing and parsing inputs.

```javascript
import { request } from '@teleology/lambda-api';

const sampleEvent = {
  headers: {
    'Content-Type': 'application/json',
    'Fake-Header': 'test',
  },
  pathParameters: {
    username: 'foo',
  },
  body: '',
};

console.log(request(sampleEvent));
```

Output:
```javascript
{
  headers: { 'content-type': 'application/json', 'fake-header': 'test' },
  data: { username: 'foo' }
}
```

## response

Sanitizes response data into a format api gateway understands.

```javascript
import { response } from '@teleology/lambda-api';

const sampleResponse = {
  headers: {
    'Content-Type': 'application/json',
    'Fake-Header': 'test',
  },
  body: {
    foo: 'bar',
  },
};

console.log(response(sampleResponse));
```

Output:
```javascript
{
  statusCode: '204',
  body: '{"foo":"bar"}',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json',
    'Fake-Header': 'test'
  }
}
```


# Changelog

**0.1.0**
- Fixed body parsing error where strings were being spread operated
- Added documentation
- Added full test coverage

**0.0.1**
- Initial upload


[link-download]: https://img.shields.io/npm/dt/@teleology/lambda-api
[link-version]: https://img.shields.io/npm/v/@teleology/lambda-api.svg
[link-license]: https://img.shields.io/npm/l/@teleology/lambda-api.svg
