{"gitdown": "badge", "name": "npm-version"}
{"gitdown": "badge", "name": "travis"}
{"gitdown": "badge", "name": "appveyor"}
{"gitdown": "badge", "name": "codeclimate-gpa"}
{"gitdown": "badge", "name": "codeclimate-coverage"}
{"gitdown": "badge", "name": "david"}
{"gitdown": "badge", "name": "david-dev"}

# {"gitdown": "gitinfo", "name": "name"}

`angular-translate` loader for webpack

## Usage

```javascript
{"gitdown": "include", "file": "loader.js"}
```

```javascript
{"gitdown": "include", "file": "config.js"}
```

```javascript
{"gitdown": "include", "file": "angular.js"}
```

## Options

| Name | Type | Default Value | Description |
|:------------------|:--------------------|:----------------------|:-----------------------------------------------------------|
| module | `String` | `'translations'` | sets name of `angular` module |
| namespaces | `String` or `String[]` | `''` | adds `namespaces` to each `translations` keys. Supports [interpolations](https://github.com/webpack/loader-utils#interpolatename) and also `[dir]` |
| sep | `String` | `'/'` | `namespaces` separator |
| localeInterpolate | `RegExp` | `/[a-z]{2}_[A-Z]{2}/` | uses to detect `locale` in `resourcePath` |
| defaultLocale | `String` | `'en_US'` | uses this `locale` if `localeInterpolate` fails to detect it |
