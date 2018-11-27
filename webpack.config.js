const path = require("path");
const webpack = require("webpack");

const HWP = require("html-webpack-plugin");
// const DP = require("define-plugin");
module.exports = env => {
    if (typeof env == "undefined" || !env.hasOwnProperty("NODE_ENV")){
        env= {NODE_ENV:"prod"};
    }
    return {
        // context: path.join(__dirname, 'src'),
        entry: [
            path.join(__dirname, "/src/index.js"),
        ],
        output: {
            path: path.join(__dirname, "dist"),
            filename: "bundle.js",
            publicPath: "/",
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        "babel-loader",
                    ],
                },
                {
                    test: /\.jsx$/, loader: "babel-loader", exclude: "/node_modules/"
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: "style-loader" // creates style nodes from JS strings
                        },
                        {
                            loader: "css-loader" // translates CSS into CommonJS
                        },
                        {
                            loader: "sass-loader" // compiles Sass to CSS
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: "style-loader" // creates style nodes from JS strings
                        },
                        {
                            loader: "css-loader" // translates CSS into CommonJS
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|gif|svg)$/i,
                    use: [
                        {
                            loader: "url-loader",
                        }
                    ]
                }

            ],

        },
        devServer: {
            historyApiFallback: true,
        },
        plugins: [
            new HWP(
                {template: path.join(__dirname, "/src/index.html")}
            ),
            new webpack.DefinePlugin({
                DEPLOY_MODE: JSON.stringify(env.NODE_ENV)
            })

        ],
        resolve: {
            extensions: [".js", ".jsx"],
            modules: [__dirname + "/src", __dirname + "/node_modules", __dirname + "/src/App"]

        },
        mode: "development",
    };
};
