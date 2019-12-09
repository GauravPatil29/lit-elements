const webpackMerge = require('webpack-merge');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isProduction = process.env.NODE_ENV &&
    process.env.NODE_ENV.toLowerCase() === 'production' ? true : false;
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const basePackageJson = require('./package.json');


console.log('Production Build :: ' + isProduction);

module.exports = () => {
    return webpackMerge(
        {
            mode: isProduction ? 'production' : 'development',
            optimization: {
                minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
            },
            target: 'web',
            entry: {
                main: [
                    "regenerator-runtime/runtime",
                    "@webcomponents/webcomponentsjs",
                    path.resolve(__dirname, 'src/index.ts')
                ]
            },
            plugins: [
                new CleanWebpackPlugin(),
                new HtmlWebpackPlugin({
                    template: path.resolve(__dirname, 'src/index.html'),
                    filename: path.resolve(__dirname, 'dist/index.html'),
                    meta: {
                        viewport: 'width=device-width, initial-scale=1.0, shrink-to-fit=no'
                    },
                    minify: {
                        collapseWhitespace: true,
                        minifyCSS: true,
                        minifyJS: true
                    }
                }),
                new GenerateJsonPlugin('package.json', {
                    'name': basePackageJson.name,
                    'version': basePackageJson.version,
                    'description': basePackageJson.description
                })
            ],
            module: {
                rules: [
                    {
                        test: /\.css|\.s(c|a)ss$/,
                        use: [
                            { loader: 'to-string-loader' },
                            { loader: 'css-loader' },
                            { loader: 'sass-loader' }
                        ]
                    },
                    {
                        test: /\.ts?$/,
                        use: 'ts-loader',
                        exclude: /node_modules/,
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules\/@webcomponents\/(?!(lit-html))/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    [
                                        '@babel/preset-env',
                                        {
                                            modules: false,
                                            targets: {
                                                esmodules: true,
                                                ie: 11
                                            }
                                        },
                                    ],
                                ],
                                plugins: [
                                    ['@babel/plugin-proposal-decorators', { 'decoratorsBeforeExport': true }],
                                    ['@babel/plugin-proposal-class-properties', { 'loose': true }]
                                ],
                            },
                        },
                    }
                ],
            },
            resolve: {
                extensions: ['.ts', '.js', '.css', '.scss']
            },
            output: {
                filename: isProduction ? '[name].[contenthash].bundle.js' : '[name].bundle.js',
                chunkFilename: isProduction ? '[name].[contenthash].bundle.js' : '[name].bundle.js',
                path: path.resolve(__dirname, 'dist')
            },
            devServer: {
                contentBase: path.join(__dirname, 'dist'),
                compress: true,
                port: 4200
            }
        }
    );
};