module.exports = {
    entry: "./scripts/App.jsx",
    output: {
        path: __dirname,
        filename: "scripts/bundle.js"
    },
    resolve: {
      extensions: ['','.js','.jsx']
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loader: "babel-loader" }
        ]
    }
};
