// Used for Generate src/router.js and src/router-config.json

const components = require.context('~/pages/compile/', true, /\.js$/);
components.keys().forEach(key => components(key));
