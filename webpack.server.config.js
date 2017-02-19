const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, './');
const APP_DIR = path.resolve(__dirname, 'src/');

module.exports = {

  entry: path.join(APP_DIR, 'server.js'),

  output: {
    path: BUILD_DIR,
    filename: 'server.bundle.js',
  },

  target: 'node',

  // keep node_module paths out of the bundle
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server', 'react/addons',
  ]).reduce((ext, mod) => {
    const tmp = ext;
    tmp[mod] = `commonjs ${mod}`;
    return tmp;
  }, {}),

  node: {
    __filename: true,
    __dirname: true,
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
    ],
  },
};

