const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  extends: ['@kiwicom/eslint-config'],
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    }
  },
  rules: {}
};