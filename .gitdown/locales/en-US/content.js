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
