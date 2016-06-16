module.exports = {
    module: {
        preLoaders: [{
            test: /\.json$/,
            loader: 'json'
        }],
        loaders: [{
            test: /\.json$/,
            loader: 'angular-translate?module=translations'
        }]
    }
};
