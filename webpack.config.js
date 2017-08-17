
var path=require('path');
var webpack = require('webpack');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports= {
    entry: [ './js/index.js'],
    output: {
        path: path.resolve(__dirname, 'produce'),
        filename: 'js/index.js',
        publicPath:""
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                include:path.resolve(__dirname,'css'),
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /\.(png|gif|jpe?g)$/,
                loader: 'file-loader',
                query: {
                    /*
                     *  limit=10000 ： 10kb
                     *  图片大小小于10kb 采用内联的形式，否则输出图片
                     * */
                    limit: 10000,
                    publicPath:path.resolve(__dirname,'images'),
                    outputPath:'images',
                    name: '/[name]-[hash:8].[ext]'
                }

            },
            { test: /\.(eot|woff|svg|ttf)$/, loader: "file-loader" }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin({
            filename: 'css/index.css',
            disable: false,
            allChunks: true
        })
    ]
}