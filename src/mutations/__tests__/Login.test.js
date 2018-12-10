// @flow

import { graphql } from '../../common/services/TestingTools';

jest.mock('../../common/db/UserModel.js', () => ({
  findOne: () => ({
    id: 'id',
    username: 'user',
    password: 'password',
  }),
}));

jest.mock('password-hash', () => ({
  verify: jest.fn(input => input === 'password'),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'tokenIsSigned'),
}));

describe('Login', () => {
  it('signs token for valid username and password', async () => {
    const query = graphql(`
      mutation login {
        login(username: "user", password: "password") {
          token
        }
      }
    `);
    expect(await query).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "login": Object {
      "token": "tokenIsSigned",
    },
  },
}
`);
  });

  it('returns null for wrong password', async () => {
    const query = graphql(`
      mutation login {
        login(username: "user", password: "wrong_password") {
          token
        }
      }
    `);
    expect(await query).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "login": Object {
      "token": null,
    },
  },
}
`);
  });
});
