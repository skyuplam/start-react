import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OfflinePlugin from 'offline-plugin';
import baseConfig from './base.config';

const plugins = [
  new webpack.NoEmitOnErrorsPlugin(),

  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    children: true,
    minChunks: 2,
    async: true,
  }),

  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      screw_ie8: true,
    },
    mangle: {
      screw_ie8: true,
    },
    output: {
      comments: false,
      screw_ie8: true,
    },
  }),

  new ExtractTextPlugin({
    filename: '[name].[chunkhash].css',
    allChunks: true,
  }),

  new OfflinePlugin({
    relativePaths: false,
    publicPath: '/',

    caches: {
      main: [':rest:'],

      // All chunks marked as `additional`, loaded after main section
      additional: ['*.chunk.js'],
    },

    // Removes warning for about `additional` section usage
    safeToUseOptionalCaches: true,

    AppCache: false,
  }),
];

export default baseConfig({
  env: 'production',
  target: 'web',
  entry: [
    './src/client/index.js',
  ],

  sourceInclude: path.join(process.cwd(), 'src/client/'),

  // Utilize long-term caching by adding content hashes
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    publicPath: '/static/',
  },

  babelPlugins: [
    'transform-react-jsx-self',
    'transform-react-jsx-source',
  ],

  devtool: 'eval',

  plugins: plugins,

  rules: [{
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: ['css-loader'],
    }),
  }],

  performance: {
    assetFilter: (assetFilename) =>
      !(/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)),
    hints: 'warning',
  },
});
