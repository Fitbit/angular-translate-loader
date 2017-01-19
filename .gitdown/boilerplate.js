var translations = angular.module('translations', ['pascalprecht.translate']);

translations.config(function($translateProvider) {
    $translateProvider.translations('en_US', {
        foo: 'bar',
        bar: {
            baz: 'qux'
        }
    });
});
