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
    // HTMLWebpack plugin 
    plugins: [
      new HtmlWebpackPlugin({
        template: "index.html",
        title: "Text Editor Application"
      }),
      // injectManifest plugin 
      new InjectManifest({
        swSrc: "/src-sw.js",
        swDest: "src-sw.js",
        include : [/\.html$/, /\.js$/, /\.css$/]
      }),
      // WebpackPwaManifest plugin and its settings
      new WebpackPwaManifest({
        name: 'Text Editor Application',
        short_name: 'TEA',
        description: 'PWA to edit text',
        background_color: '#ffffff',
        theme_color: '#3367D6',
        inject: true,
        start_url: "/",
        publicPath: "/",
        // array of icon objects
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ]
      }),
    ],
    
    // rule for handling css files
    module: {
      rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        // rule to process js files by babel loader
        test: /\.m?js$/,
        exclude: /node_modules/,
        // Adding babel-loader for ES6
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              "@babel/plugin-proposal-object-rest-spread",
              "@babel/transform-runtime",
            ],
          },
        },
      },
    ],
  },
  };
};
