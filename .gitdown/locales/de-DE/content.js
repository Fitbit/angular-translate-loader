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
