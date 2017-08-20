import {
    readJson
} from 'fs-extra';
import loader from '../../src';

export default (resourcePath, callback, options = {}, query = null) => {
    readJson(resourcePath, (err, json) => {
        const context = {
            resourcePath,
            options,
            cacheable: () => {},
            query: query ? `?${JSON.stringify(query)}` : ''
        };

        ['inputValue', 'value'].forEach(x => {
            context[x] = options[x];

            delete options[x];
        });

        context.setTranslationsForTesting = function (translations) {
            this.value = translations;
        }

        if (err) {
            json = options.content;
        }

        delete options.content;

        const content = loader.call(context, json);

        callback(context.value, content);
    });
};
