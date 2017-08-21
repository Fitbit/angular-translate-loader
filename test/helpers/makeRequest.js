import {
    readJson
} from 'fs-extra';
import loader from '../../src';

export default (resourcePath, callback, options = {}, query = null) => {
    readJson(resourcePath, (err, content) => {
        const context = {
            resourcePath,
            options,
            emitError: () => {},
            cacheable: () => {},
            query: `?${JSON.stringify(query)}`
        };

        ['inputValue', 'value'].forEach(x => {
            context[x] = options[x];

            delete options[x];
        });

        delete options.content;

        callback(loader.call(Object.freeze(context), content));
    });
};
