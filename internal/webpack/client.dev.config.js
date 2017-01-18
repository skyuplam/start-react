import baseConfig from './base.config';
import webpack from 'webpack';
import path from 'path';
import { happypack } from '../utils';


const plugins = [
  // We don't want webpack errors to occur during development as it will
  // kill our dev servers.
  new webpack.NoEmitOnErrorsPlugin(),
  // we want hot reloading
  new webpack.HotModuleReplacementPlugin(),
  // prints more readable module names in the browser console on HMR updates
  new webpack.NamedModulesPlugin(),

  happypack({
    name: 'happypack-css',
    loaders: [
      'style-loader',
      {
        path: 'css-loader',
        query: { sourceMap: true },
      },
    ],
  }),
];

export default baseConfig({
  env: 'development',
  target: 'web',
  entry: [
    'eventsource-polyfill',  // Necessary for hotreloading with IE
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './src/client/index.js',
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: plugins,
  sourceInclude: path.join(process.cwd(), 'src/client/'),
  babelPlugins: [
    'react-hot-loader/babel',
    'transform-react-jsx-self',
    'transform-react-jsx-source',
  ],
  devtool: 'cheap-module-eval-source-map',
  rules: [{
    test: /\.css$/,
    loader: 'happypack/loader',
    options: {
      id: 'happypack-css',
    },
  }],
});
