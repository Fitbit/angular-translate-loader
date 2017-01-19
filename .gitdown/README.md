{"gitdown": "badge", "name": "npm-version"}
{"gitdown": "badge", "name": "travis"}
[![AppVeyor build status](https://img.shields.io/appveyor/ci/mdreizin/{"gitdown": "gitinfo", "name": "name"}/{"gitdown": "gitinfo", "name": "branch"}.svg?style=flat-square)](https://ci.appveyor.com/project/mdreizin/{"gitdown": "gitinfo", "name": "name"}/branch/{"gitdown": "gitinfo", "name": "branch"})
{"gitdown": "badge", "name": "codeclimate-gpa"}
{"gitdown": "badge", "name": "codeclimate-coverage"}
{"gitdown": "badge", "name": "david"}
{"gitdown": "badge", "name": "david-dev"}

# {"gitdown": "gitinfo", "name": "name"}
> `angular-translate` loader for webpack

This loader helps to reduce writing the boilerplate code for [`angular-translate`](https://github.com/angular-translate/angular-translate).

## Installation

```bash
npm install angular --save && npm install {"gitdown": "gitinfo", "name": "name"} --save-dev
```

or

```bash
yarn add angular && yarn add {"gitdown": "gitinfo", "name": "name"} --dev
```

## Usage

Instead of writing boilerplate code something like this:

```javascript
{"gitdown": "include", "file": "boilerplate.js"}
```

You can do that in single line:

`./index.js`

```javascript
{"gitdown": "include", "file": "locales/en-US/index.js"}
```

and the loader will do all work for you:

```javascript
{"gitdown": "include", "file": "locales/en-US/content.js"}
```

Also it detects locales in the requested file (please see `localeInterpolate` option):

`./de_DE.json`

```json
{"gitdown": "include", "file": "locales/de-DE/index.json"}
```

`./index.js`

```javascript
{"gitdown": "include", "file": "locales/de-DE/index.js"}
```

```javascript
{"gitdown": "include", "file": "locales/de-DE/content.js"}
```

Also if you want to require all translations at once you can do that as well:

`./index.js`

```javascript
{"gitdown": "include", "file": "locales/index.js"}
```

If you want to add some global options you can do that easily:

`./webpack.config.js`

```javascript
{"gitdown": "include", "file": "webpack.config.js"}
```

## Options

| Name | Type | Default Value | Description |
|:------------------|:--------------------|:----------------------|:-----------------------------------------------------------|
| module | `String` or `String[]` | `'translations'` | Sets name of `angular` module. Supports [interpolations](https://github.com/webpack/loader-utils#interpolatename) and also `[dir]`. |
| namespaces | `String` or `String[]` | `''` | Adds `namespaces` to each `translations` key. Supports [interpolations](https://github.com/webpack/loader-utils#interpolatename) and also `[dir]`. |
| sep | `String` | `'/'` | Separator for `namespaces` and `module`. |
| localeInterpolate | `RegExp` or `RegExp[]` or `String` or `String[]` | `[/_[a-z]{2}_[A-Z]{2}\./, /_[a-z]{2}\./, /[/\\][a-z]{2}_[A-Z]{2}[/\\]/, /[/\\][a-z]{2}[/\\]/]` | Uses to detect `locale` in `resourcePath`. |
| defaultLocale | `String` | `'en_US'` | Uses `defaultLocale` if `localeInterpolate` fails to detect it. |
