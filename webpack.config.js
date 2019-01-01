const path = require('path');

module.exports = {
    mode: 'development',
    entry: [
        'babel-polyfill',
        'whatwg-fetch',
        './src/index.js',
    ],
    output: {
        filename: 'feed.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        compress: true,
        port: 1447
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                    }
                ]
            }
        ]
    }
};