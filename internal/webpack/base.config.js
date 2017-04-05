import webpack from 'webpack';
import path from 'path';


const webpackConfig = (options) => ({
  target: options.target || 'web',

  node: {
    __dirname: true,
    __filename: true,
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },

  devtool: options.devtool,

  performance: options.env === 'production' ? options.performance : false,

  entry: options.entry,

  output: Object.assign({
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  }, options.output),

  plugins: options.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ]),

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      options: {
        babelrc: false,
        presets: [
          'react',
          'stage-3',
          options.target === 'node' ?
            ['env', { targets: { node: true } }] :
            ['env', { modules: false }],
        ],
        plugins: options.babelPlugins,
      },
      exclude: /node_modules/,
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
