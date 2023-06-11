const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new InjectManifest({
        swSrc: "src-sw.js",
        swDest: "src-sw.js",
        include : [/\.html$/, /\.js$/, /\.css$/]
      }),
      new WebpackPwaManifest({
        name: 'Text Editor Application',
        short_name: 'TEA',
        description: 'PWA to edit text',
        background_color: '#ffffff',
        theme_color: '#3367D6',
        icons: [
          {
            src: './path/to/icon.png',
            sizes: [96, 128, 192, 256, 384, 512],
            destination: 'icons',
          },
        ],
      }),
    ],

    module: {
      rules: [
        
      ],
    },
  };
};
