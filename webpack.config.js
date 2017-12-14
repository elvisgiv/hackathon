const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const postcssCssnext = require('postcss-cssnext')
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const env = process.env.NODE_ENV || 'prod'
const env = 'dev'

function plugins() {
    if(env === 'prod'){
        return [
            new ExtractTextPlugin('style.css', { allChunks: true }),
            new webpack.optimize.DedupePlugin(),
            new webpack.DefinePlugin({ 'process.env':{ 'NODE_ENV': JSON.stringify('production')} }),
            //new webpack.optimize.UglifyJsPlugin({ minimize: true, compress: { warnings: false } }),
            new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
        ]
    }
    return [
        new ExtractTextPlugin('style.css', { allChunks: true }),
        new HtmlWebpackPlugin({ title: 'Example', template: 'public/index.html' })
    ]
}

function loaders() {
    return [
        {
            test: /\.js$/,
            loader: 'babel-loader'
            , exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        },
        {
            test: /\.(jpg|png|svg)$/,
            loader: 'file-loader',
            exclude: /node_modules/
        },

        {
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        }

    ]
}

function entry() {
    if(env === 'prod'){
        return {
            app: './src/index.js',
            vendor: [ 'react', 'react-dom']
        }
    }
    return { app: './src/index.js'}
}

function output() {
    if(env === 'prod'){
        return {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js',
            publicPath: '/public/'
        }
    }
    return {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/'
    }
}

var devtool = 'inline-source-map'

if(env === 'prod'){ devtool = 'hidden-sourcemap' }

/* config */
module.exports = {
    devtool: devtool,
    entry: entry(),
    output: output(),
    module: { loaders: loaders() },
    //postcss: [ postcssCssnext({ browsers: ['last 2 versions'] }) ],
    devServer: { historyApiFallback: true, port: 3003 },
    plugins: plugins()
}