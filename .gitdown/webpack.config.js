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
    },
    angularTranslate: {
        namespaces: ['app', '[dir]'],
        sep: '.',
        defaultLocale: 'de_DE'
    }
};
