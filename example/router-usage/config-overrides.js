const path = require('path');
const entries = require('./config-entry');
const multipleEntry = require('react-app-rewire-multiple-entry')(entries);

const {
  override,
  overrideDevServer,
  addBabelPlugin,
  useEslintRc,
  addWebpackAlias,
  addDecoratorsLegacy,
  fixBabelImports,
  addLessLoader
} = require('customize-cra');
const lessJson = {
  '@fill-body': '#f5f5f5',
  '@button-height': '45px',
  '@tabs-height': '47px',
  '@input-font-size': '16px',
  '@input-placeholder-color': '#E4E4E4',
  '@btn-disable-color': '#E4E4E4',
  '@input-color': '#333',
  '@modal-font-size-heading': '20px',
  '@brand-primary': '#00BC8D',
  "@primary-color": "#00BC8D",
  '@v-spacing-md': '10px',
  '@brand-primary-tap': '#00BC8D',
  '@brand-success': '#52cd4c',
  '@brand-error': '#f35833',
  '@brand-important': '#ff3b30',
  '@radius-xs': '2px',
  '@radius-sm': '2px',
  '@radius-md': '2px',
  '@radius-lg': '2px'
}
module.exports = {
  webpack: override(
    addDecoratorsLegacy(),
    fixBabelImports('import-antd', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
    fixBabelImports('import-antd-mobile', {
      libraryName: 'antd-mobile',
      libraryDirectory: 'es',
      style: true,
    }),
    useEslintRc(),
    addWebpackAlias({
      '~': path.resolve(__dirname, 'src/')
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: lessJson,
    }),
    multipleEntry.addMultiEntry,
  ),
  devServer: overrideDevServer(multipleEntry.addEntryProxy)
};
