var path = require('path');
var webpack = require('webpack');

module.exports = {
    cache: true,
    debug: true,
    entry: './src/index.jsx',
    output: {
        path: __dirname + '/static/js/',
        filename: 'app.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                // This has effect on the react lib size
                // 'NODE_ENV': JSON.stringify('production')
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
    ],
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: [
                        'es2015',
                        'react',
                    ],
                    // Only enable before pushing to the app.
                    plugins: [
                        'transform-react-inline-elements',
                        'transform-react-constant-elements'
                    ]
                }
            }
        ]
    },
};