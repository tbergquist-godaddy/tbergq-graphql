// @flow

/* ::
 type API = {|
  +cache: boolean => void,
|};
*/

module.exports = (api /* :API */) => {
  api.cache(true);
  return {
    presets: ['@kiwicom/babel-preset-kiwicom', '@babel/preset-flow'],
    plugins: [],
  };
};
