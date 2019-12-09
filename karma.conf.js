module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'node_modules/regenerator-runtime/runtime.js',
            'node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',
            'src/app/**/*.scss',
            'src/app/**/*.spec.ts'
        ],
        exclude: [],
        preprocessors: {
            './src/app/**/*.spec.ts': ['webpack'],
            './src/app/**/*.ts': ['webpack'],
            './src/app/**/*.scss': ['webpack']
        },
        reporters: ['progress', 'coverage-istanbul'],
        coverageIstanbulReporter: {
            fixWebpackSourcePaths: true,
            reports: ['html']
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: true,
        concurrency: Infinity,
        webpack: {
            mode: 'development',
            module: {
                rules: [
                    {
                        test: /\.ts?$/,
                        use: 'ts-loader',
                        exclude: /node_modules/,
                    },
                    {
                        enforce: 'post',
                        exclude: /(node_modules|\.spec\.[tj]sx?$)/,
                        test: /\.[tj]s$/,
                        use: {
                            loader: 'istanbul-instrumenter-loader',
                            options: { esModules: true }
                        },
                    },
                    {
                        test: /\.css|\.s(c|a)ss$/,
                        use: [{ loader: 'to-string-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }]
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
                    },
                ]
            },
            resolve: {
                extensions: ['.ts', '.js', '.css', '.scss']
            }
        }
    });
};