[![NPM version](http://img.shields.io/npm/v/angular-translate-loader.svg)](https://www.npmjs.org/package/angular-translate-loader)
[![Travis build status](http://img.shields.io/travis/Fitbit/angular-translate-loader/master.svg)](https://travis-ci.org/Fitbit/angular-translate-loader)
[![AppVeyor build status](https://img.shields.io/appveyor/ci/mdreizin/angular-translate-loader/master.svg)](https://ci.appveyor.com/project/mdreizin/angular-translate-loader/branch/master)
[![Code Climate GPA](https://img.shields.io/codeclimate/github/Fitbit/angular-translate-loader.svg)](https://codeclimate.com/github/Fitbit/angular-translate-loader)
[![Code Climate Coverage](https://img.shields.io/codeclimate/coverage/github/Fitbit/angular-translate-loader.svg)](https://codeclimate.com/github/Fitbit/angular-translate-loader)
[![Dependency Status](https://img.shields.io/david/Fitbit/angular-translate-loader.svg)](https://david-dm.org/Fitbit/angular-translate-loader)
[![Development Dependency Status](https://img.shields.io/david/dev/Fitbit/angular-translate-loader.svg)](https://david-dm.org/Fitbit/angular-translate-loader#info=devDependencies)
[![Greenkeeper badge](https://badges.greenkeeper.io/Fitbit/angular-translate-loader.svg)](https://greenkeeper.io/)

# angular-translate-loader

> `angular-translate` loader for webpack

This loader helps to reduce writing the boilerplate code for [`angular-translate`](https://github.com/angular-translate/angular-translate).

## Installation

```bash
npm install angular --save && npm install angular-translate-loader --save-dev
```

or

```bash
yarn add angular && yarn add angular-translate-loader --dev
```

## Usage

Instead of writing boilerplate code something like this:

<!-- global angular -->
<!-- eslint no-console: "allow" -->
```javascript
var translations = angular.module('translations', ['pascalprecht.translate']);

translations.config(function($translateProvider) {
    $translateProvider.translations('en_US', {
        foo: 'bar',
        bar: {
            baz: 'qux'
        }
    });
});
```

You can do that in single line:

`./index.js`

<!-- eslint no-console: "allow" -->
```javascript
var translations = require('!json!angular-translate?module=translations!./index.json');

console.log(translations); // Object { foo: "bar", bar: { baz: "qux" } }
```

and the loader will do all work for you:

```javascript
var angular = require("angular");
var translations = {
    foo: "bar",
    bar: {
        baz: "qux"
    }
};
var module;
try {
    module = angular.module("translations");
} catch(err) {
    module = angular.module("translations", ["pascalprecht.translate"]);
}
module.config(["$translateProvider", function($translateProvider) {
    $translateProvider.translations("en_US", translations);
}]);
module.exports = translations;
```

Also it detects locales in the requested file (please see `localeInterpolate` option):

`./de_DE.json`

```json
{
  "foo": "Bar",
  "bar": {
    "baz": "Qux"
  }
}
```

`./index.js`

<!-- eslint no-console: "allow" -->
```javascript
var translations = require('!json!angular-translate?module=translations!./index.json');

console.log(translations); // Object { foo: "Bar", bar: { baz: "Qux" } }
```

```javascript
var angular = require("angular");
var translations = {
    foo: "Bar",
    bar: {
        baz: "Qux"
    }
};
var module;
try {
    module = angular.module("translations");
} catch(err) {
    module = angular.module("translations", ["pascalprecht.translate"]);
}
module.config(["$translateProvider", function($translateProvider) {
    $translateProvider.translations("de_DE", translations);
}]);
module.exports = translations;
```

Also if you want to require all translations at once you can do that as well:

`./index.js`

```javascript
var angular = require('angular');

function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

requireAll(require.context('./locales', true, /\.json$/));

angular.module('app', ['translations']);
```

If you want to add some global options you can do that easily:

`./webpack.config.js`

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

## Options

| Name | Type | Default Value | Description |
|:------------------|:--------------------|:----------------------|:-----------------------------------------------------------|
| module | `String` or `String[]` | `'translations'` | Sets name of `angular` module. Supports [interpolations](https://github.com/webpack/loader-utils#interpolatename) and also `[dir]`. |
| namespaces | `String` or `String[]` | `''` | Adds `namespaces` to each `translations` key. Supports [interpolations](https://github.com/webpack/loader-utils#interpolatename) and also `[dir]`. |
| sep | `String` | `'/'` | Separator for `namespaces` and `module`. |
| localeInterpolate | `RegExp` or `RegExp[]` or `String` or `String[]` | `[/_[a-z]{2}_[A-Z]{2}\./, /_[a-z]{2}\./, /[/\\][a-z]{2}_[A-Z]{2}[/\\]/, /[/\\][a-z]{2}[/\\]/]` | Uses to detect `locale` in `resourcePath`. |
| defaultLocale | `String` | `'en_US'` | Uses `defaultLocale` if `localeInterpolate` fails to detect it. |
