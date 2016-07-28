import DEFAULT_OPTIONS from './defaultOptions';

/**
 * @param {String} module
 * @param {String} locale
 * @param {Object} translations
 * @return {String}
 */
export default (module = DEFAULT_OPTIONS.module, locale = DEFAULT_OPTIONS.defaultLocale, translations = {}) => {
    return `var angular = require("angular");
var translations = ${JSON.stringify(translations, null, '\t')};
var module;
try {
\tmodule = angular.module("${module}");
} catch(err) {
\tmodule = angular.module("${module}", ["pascalprecht.translate"]);
}
module.config(["$translateProvider", function($translateProvider) {
\t$translateProvider.translations("${locale}", translations);
}]);
module.exports = translations;`;
};
