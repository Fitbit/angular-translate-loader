[![NPM version](http://img.shields.io/npm/v/angular-translate-loader.svg?style=flat-square)](https://www.npmjs.org/package/angular-translate-loader)
[![Travis build status](http://img.shields.io/travis/mdreizin/angular-translate-loader/master.svg?style=flat-square)](https://travis-ci.org/mdreizin/angular-translate-loader)
[![AppVeyor build status](https://img.shields.io/appveyor/ci/mdreizin/angular-translate-loader/master.svg?style=flat-square)](https://ci.appveyor.com/project/mdreizin/angular-translate-loader/branch/master)
[![Code Climate GPA](https://img.shields.io/codeclimate/github/mdreizin/angular-translate-loader.svg?style=flat-square)](https://codeclimate.com/github/mdreizin/angular-translate-loader)
[![Code Climate Coverage](https://img.shields.io/codeclimate/coverage/github/mdreizin/angular-translate-loader.svg?style=flat-square)](https://codeclimate.com/github/mdreizin/angular-translate-loader)
[![Dependency Status](https://img.shields.io/david/mdreizin/angular-translate-loader.svg?style=flat-square)](https://david-dm.org/mdreizin/angular-translate-loader)
[![Development Dependency Status](https://img.shields.io/david/dev/mdreizin/angular-translate-loader.svg?style=flat-square)](https://david-dm.org/mdreizin/angular-translate-loader#info=devDependencies)

<h1 id="angular-translate-loader">angular-translate-loader</h1>
> `angular-translate` loader for webpack

<h2 id="angular-translate-loader-usage">Usage</h2>

```javascript
var translations = require('!json!angular-translate?module=translations!./file.json');

console.log(translations);

```

```javascript
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

```

```javascript
var angular = require('angular');

function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

requireAll(require.context('./locales', true, /\.json$/));

angular.module('app', ['translations']);

```

<h2 id="angular-translate-loader-options">Options</h2>

| Name | Type | Default Value | Description |
|:------------------|:--------------------|:----------------------|:-----------------------------------------------------------|
| module | `String` or `String[]` | `'translations'` | Sets name of `angular` module. Supports [interpolations](https://github.com/webpack/loader-utils#interpolatename) and also `[dir]`. |
| namespaces | `String` or `String[]` | `''` | Adds `namespaces` to each `translations` key. Supports [interpolations](https://github.com/webpack/loader-utils#interpolatename) and also `[dir]`. |
| sep | `String` | `'/'` | Separator for `namespaces` and `module`. |
| localeInterpolate | `RegExp` or `RegExp[]` or `String` or `String[]` | `[/_[a-z]{2}_[A-Z]{2}\./, /_[a-z]{2}\./, /[/\\][a-z]{2}_[A-Z]{2}[/\\]/, /[/\\][a-z]{2}[/\\]/]` | Uses to detect `locale` in `resourcePath`. |
| defaultLocale | `String` | `'en_US'` | Uses `defaultLocale` if `localeInterpolate` fails to detect it. |
