// @flow

import fetch from 'node-fetch';

const Fetch = async (url: string, options: Object = {}) => {
  try {
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    throw err;
  }
};

export default Fetch;
