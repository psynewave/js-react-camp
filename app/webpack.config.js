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
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.jsx$/, loader: "babel-loader" }
        ]
    }
};
