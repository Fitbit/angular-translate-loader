import getOptions from './getOptions';
import generateContent from './generateContent';
import extractLocale from './extractLocale';
import extractTranslations from './extractTranslations';
import interpolateModule from './interpolateModule';

/**
 * @param {*} content
 * @returns {String}
 */
export default function(content) {
    if (this.cacheable) {
        this.cacheable();
    }

    const options = getOptions(this),
        locale = extractLocale(this, options),
        translations = extractTranslations(this, content, options),
        module = interpolateModule(this, translations, options);

    this.value = translations;

    return generateContent(module, locale, translations);
}
