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
| module | `String` | `'translations'` | Sets name of `angular` module |
| namespaces | `String` or `String[]` | `''` | Adds `namespaces` to each `translations` key. Supports [interpolations](https://github.com/webpack/loader-utils#interpolatename) and also `[dir]`. |
| sep | `String` | `'/'` | Adds `sep` to each `namespaces` key. |
| localeInterpolate | `RegExp` | `/[a-z]{2}_[A-Z]{2}/` | Uses to detect `locale` in `resourcePath`. |
| defaultLocale | `String` | `'en_US'` | Uses `defaultLocale` if `localeInterpolate` fails to detect it. |
