const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  extends: ["airbnb", "prettier", "plugin:flowtype/recommended"],
  plugins: ["prettier", "prettier"],
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
  rules: {
    "curly": [ERROR, "all"],
    "no-duplicate-imports": ERROR,
    "no-underscore-dangle": OFF,
    "no-use-before-define": OFF,
    "import/prefer-default-export": OFF,
    "prettier/prettier": [
      ERROR,
      { singleQuote: true, trailingComma: "all", jsxBracketSameLine: false }
    ],
    "flowtype/require-valid-file-annotation": [ERROR, "always"],
    "flowtype/newline-after-flow-annotation": [ERROR, "always"]
  }
};