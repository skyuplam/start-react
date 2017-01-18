import webpack from 'webpack';
import { removeEmpty, happypack } from '../utils';
import path from 'path';


const webpackConfig = (options) => ({
  target: options.target || 'web',

  node: {
    __dirname: true,
    __filename: true,
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },

  devtool: options.devtool,

  performance: options.env === 'production' ? { hints: 'warning' } : false,

  entry: options.entry,

  output: Object.assign({
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  }, options.output),

  plugins: options.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    happypack({
      name: 'happypack-js',
      loaders: [{
        path: 'babel-loader',
        query: {
          babelrc: false,
          presets: [
            'react',
            'stage-3',
            options.target === 'node' ?
              ['latest', { es2015: { modules: false }}] :
              ['env', { targets: { node: true } }],
          ],
          plugins: options.babelPlugins,
        },
      }],
    }),
  ]),

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'happypack/loader',
      options: {
        id: 'happypack-js',
      },
      include: options.sourceInclude,
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader',
      options: {
        emitFile: options.target === 'web',
      },
    }, {
      test: /\.(jpg|png|gif)$/,
      use: [{
        loader: 'file-loader',
      }, {
        loader: 'image-webpack',
        options: {
          progressive: true,
          optimizationLevel: 7,
          interlaced: false,
          pngquant: {
            quality: '65-90',
            speed: 4,
          },
        },
      }],
    }, {
      test: /\.(mp4|webm)$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
      },
    }].concat(options.rules),
  },
});

export default webpackConfig;
