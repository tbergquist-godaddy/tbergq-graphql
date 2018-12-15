// @flow

import fetch from 'node-fetch';

export default async (url: string, options: Object = {}) => {
  try {
    const response = await fetch(url, options);

    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
