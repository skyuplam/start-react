import webpack from 'webpack';
import path from 'path';
import baseConfig from './base.config';


const plugins = [
  // We don't want webpack errors to occur during development as it will
  // kill our dev servers.
  new webpack.NoEmitOnErrorsPlugin(),
  // we want hot reloading
  new webpack.HotModuleReplacementPlugin(),
  // prints more readable module names in the browser console on HMR updates
  new webpack.NamedModulesPlugin(),
];

export default baseConfig({
  env: 'development',
  target: 'web',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    './src/client/index.js',
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins,
  sourceInclude: path.join(process.cwd(), 'src/client/'),
  babelPlugins: [
    'react-hot-loader/babel',
    'transform-react-jsx-self',
    'transform-react-jsx-source',
  ],
  devtool: 'cheap-module-eval-source-map',
  rules: [{
    test: /\.css$/,
    loader: 'css-loader',
  }],
});
