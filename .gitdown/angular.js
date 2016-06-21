var angular = require('angular');

function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

requireAll(require.context('./locales', true, /\.json$/));

angular.module('app', ['translations']);
