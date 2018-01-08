var path = require('path');
var hyperjsx = require('babel-plugin-transform-react-jsx');

module.exports = {
        entry:'./index.js',
        output:{
                path:path.resolve(__dirname,'dist'),
                filename:'bundle.js',
                publicPath:'/dist'
        },
        module: {
                rules: [
                { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
                ]
        }
};
