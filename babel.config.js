// @flow

/* ::
 type API = {|
  +cache: boolean => void,
|};
*/

module.exports = (api /* :API */) => {
  api.cache(true);
  return {
    presets: ['@babel/preset-env', '@babel/preset-flow'],
    plugins: ['@babel/plugin-transform-runtime'],
  };
};
