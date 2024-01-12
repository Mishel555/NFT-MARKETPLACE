const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isProduction = process.env.NODE_ENV === 'production';

const getPlugins = () => {
  const plugins = [
    // Open next line if native environment variables should be used
    // new webpack.EnvironmentPlugin(process.env),
    // new BundleAnalyzerPlugin(),
    new WebpackAssetsManifest({
      entrypoints: true,
      writeToDisk: true,
      output: 'manifest.json',
      entrypointsUseAssets: true,
      publicPath: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new Dotenv(),
    new CopyPlugin({
      patterns: [
        { from: 'public/assets' },
        { from: 'src/service-worker.js' },
      ],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ];

  const hash = isProduction ? '-[contenthash:8]' : '';
  plugins.push(
    new MiniCssExtractPlugin({
      filename: `css/[name]${hash}.css`,
      chunkFilename: `css/[id]${hash}.css`,
    }),
  );

  return plugins;
};

module.exports = {
  entry: {
    app: './src/index.tsx',
  },
  plugins: getPlugins(),
  output: {
    filename: 'js/[name]-[contenthash].js',
    chunkFilename: 'js/[name]-[contenthash].chunk.js',
    hotUpdateChunkFilename: 'js/[id].[fullhash].hot-update.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@providers': path.resolve(__dirname, 'src/providers'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
    fallback: {
      'crypto': require.resolve('crypto-browserify'),
      'stream': require.resolve('stream-browserify'),
      'assert': require.resolve('assert'),
      'http': require.resolve('stream-http'),
      'https': require.resolve('https-browserify'),
      'os': require.resolve('os-browserify'),
      'url': require.resolve('url')
    },
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
    ],
  },
  target: 'web',
  devtool: 'source-map',
  stats: 'normal',
  resolveLoader: {
    'modules': [
      'node_modules',
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.((bmp)|(gif)|(jpe?g)|(png)|(tiff)|(ico)|(avif)|(webp)|(eot)|(otf)|(ttf)|(woff)|(woff2)|(svg)|(mp4))$/,
        exclude: /\.(js|mjs|jsx|ts|tsx)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/[name]-[hash][ext][query]',
        },
      },
      {
        test: /\.(css)$/i,
        use: [
          !isProduction ? 'style-loader' : require('mini-css-extract-plugin').loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          !isProduction ? 'style-loader' : require('mini-css-extract-plugin').loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,

              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true }, // resolve-url-loader
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: isProduction,
              compact: isProduction,
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          }
        ],
      },
    ],
  },
};
