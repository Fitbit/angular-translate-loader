'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (content) {
    if (this.cacheable) {
        this.cacheable();
    }

    var options = (0, _getOptions2.default)(this),
        locale = (0, _extractLocale2.default)(this, options),
        translations = (0, _extractTranslations2.default)(this, content, options),
        module = (0, _interpolateModule2.default)(this, translations, options);

    return (0, _generateContent2.default)(module, locale, translations);
};

var _getOptions = require('./getOptions');

var _getOptions2 = _interopRequireDefault(_getOptions);

var _generateContent = require('./generateContent');

var _generateContent2 = _interopRequireDefault(_generateContent);

var _extractLocale = require('./extractLocale');

var _extractLocale2 = _interopRequireDefault(_extractLocale);

var _extractTranslations = require('./extractTranslations');

var _extractTranslations2 = _interopRequireDefault(_extractTranslations);

var _interpolateModule = require('./interpolateModule');

var _interpolateModule2 = _interopRequireDefault(_interpolateModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map