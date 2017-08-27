'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _path = require('path');

var _interpolateOptionsValue = require('./interpolateOptionsValue');

var _interpolateOptionsValue2 = _interopRequireDefault(_interpolateOptionsValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {*} loaderContext
 * @param {*} content
 * @param {Object} options
 * @returns {String}
 */
exports.default = function (loaderContext, content, options) {
    var value = (0, _interpolateOptionsValue2.default)('namespaces', loaderContext, content, options);

    if (!(0, _lodash.isEmpty)(value)) {
        value = value.split(_path.sep).join(options.sep) + options.sep;
    }

    return value;
};
//# sourceMappingURL=interpolateNamespaces.js.map