const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode : "development",
    entry : {
        main : path.resolve(__dirname,"../src/index.js")
    },

    output : {
        filename : 'bundle.js'  
    },

    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },

    module: {
        rules : [
            {
                test: /\.css$/i,
                use : ['style-loader', 'css-loader']
            },
            
            {
                test: /\.(js|jsx)$/i,
                exclude : /node_modules/,
                use : {
                    loader : "babel-loader",
                    options : {
                        presets : [
                            "@babel/preset-react",
                            "@babel/preset-env"
                        ]
                    }
                        
                }
            }
        ]
    },

    plugins : [
        new HtmlWebpackPlugin({
            template : path.resolve(__dirname,'../public/index.html'),
        })
    ] 

}