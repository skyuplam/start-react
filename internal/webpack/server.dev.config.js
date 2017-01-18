import baseConfig from './base.config';
import nodeExternal from 'webpack-node-externals';
import webpack from 'webpack';
import { happypack } from '../utils';


const plugins = [
  // We don't want webpack errors to occur during development as it will
  // kill our dev servers.
  new webpack.NoEmitOnErrorsPlugin(),
];

export default baseConfig({
  env: 'development',
  target: 'node',
  externals: nodeExternal({
    whitelist: ['source-map-support/register'].concat([
      /\.(eot|woff|woff2|ttf|otf)$/,
      /\.(svg|png|jpg|jpeg|gif|ico)$/,
      /\.(mp4|mp3|ogg|swf|webp)$/,
      /\.(css|scss|sass|sss|less)$/,
    ]),
  }),
  entry: [
    'source-map-support/register',
  ],
  output: {
    libraryTarget: 'commonjs2',
  },
  plugins: plugins,
  babelPlugins: [
    'transform-react-jsx-self',
    'transform-react-jsx-source',
  ],
  devtool: 'cheap-module-eval-source-map',
  rules: [{
    test: /\.css$/,
    loader: 'css-loader/locals',
  }],
});
