
module.exports = function promptWithPersistence(store, prompt) {
    const originalGetInput = prompt.getInput;
    const originalGet = prompt.get;

    function parsePropPathForDataStore(propPath) {
        if(!Array.isArray(propPath)) {
            return propPath;
        }

        return propPath.join('.');
    }

    prompt.getInput = function (prop, callback) {
        const propPath = parsePropPathForDataStore(prop.path);

        const nextProp = {
            ...prop,
            schema: {
                ...prop.schema,
                default: prop.schema.persisted && store.hasOwn(propPath) ? store.get(propPath) : prop.schema.default,
                before: value => {
                    const nextValue = prop.schema.before ? prop.schema.before(value) : value;
                    if (prop.schema.persisted) {
                        store.set(propPath, nextValue);
                    }
                    return nextValue;
                }
            },
        };

        return originalGetInput.call(this, nextProp, callback);
    };

    prompt.get = function (schema, callback) {
        const callbackWithSave = function (err, data) {
            store.save();
            return callback(err, data);
        };

        return originalGet.call(this, schema, callbackWithSave);
    };
};
