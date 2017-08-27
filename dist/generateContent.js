'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _defaultOptions = require('./defaultOptions');

var _defaultOptions2 = _interopRequireDefault(_defaultOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {String} module
 * @param {String} locale
 * @param {Object} translations
 * @param {Boolean} mustRequireAngular
 * @return {String}
 */
exports.default = function () {
  var module = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _defaultOptions2.default.module;
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaultOptions2.default.defaultLocale;
  var translations = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var mustRequireAngular = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _defaultOptions2.default.requireAngular;

  return (mustRequireAngular ? 'var angular = require("angular");' : '') + '\nvar translations = ' + (0, _stringify2.default)(translations, null, '\t') + ';\nvar module;\ntry {\n\tmodule = angular.module("' + module + '");\n} catch(err) {\n\tmodule = angular.module("' + module + '", ["pascalprecht.translate"]);\n}\nmodule.config(["$translateProvider", function($translateProvider) {\n\t$translateProvider.translations("' + locale + '", translations);\n}]);\nmodule.exports = translations;';
};
//# sourceMappingURL=generateContent.js.map