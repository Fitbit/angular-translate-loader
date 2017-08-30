import DEFAULT_OPTIONS from './defaultOptions';

/**
 * @param {String} module
 * @param {String} locale
 * @param {Object} translations
 * @param {Boolean} requireAngular
 * @return {String}
 */
export default (module = DEFAULT_OPTIONS.module, locale = DEFAULT_OPTIONS.defaultLocale, translations = {}, requireAngular = DEFAULT_OPTIONS.requireAngular) => {
    return `var translations = ${JSON.stringify(translations, null, '\t')};
var module;
try {
\tmodule = ${requireAngular ? 'var angular = require("angular");' : 'window.'}angular.module("${module}");
} catch(err) {
\tmodule = ${requireAngular ? 'var angular = require("angular");' : 'window.'}angular.module("${module}", ["pascalprecht.translate"]);
}
module.config(["$translateProvider", function($translateProvider) {
\t$translateProvider.translations("${locale}", translations);
}]);
module.exports = translations;`;
};
