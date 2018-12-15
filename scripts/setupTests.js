// @flow

import fetch from 'jest-fetch-mock';

global.fetch = fetch;
jest.setMock('node-fetch', fetch);
