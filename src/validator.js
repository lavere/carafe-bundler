const Ajv = require('ajv');

const bundleSchema = require('../schema/bundle.schema');
const configSchema = require('../schema/config.schema');
const dataSchema = require('../schema/data.schema');
const metaSchema = require('../schema/meta.schema');

class CarafeValidator
{
    constructor() {
        this.ajv = new Ajv({
            schemas: [
                bundleSchema,
                configSchema,
                dataSchema,
                metaSchema
            ],
        });
    }

    validateBundle(bundle) {
        return this.validate('https://carafe.fm/schema/draft-01/bundle.schema.json', bundle);
    }

    validateData(data) {
        return this.validate('https://carafe.fm/schema/draft-01/data.schema.json', data);
    }

    validateMeta(meta) {
        return this.validate('https://carafe.fm/schema/draft-01/meta.schema.json', meta);
    }

    validate(schema, data) {
        return new Promise((resolve, reject) => {
            const validate = this.ajv.getSchema(schema);
            const valid = validate(data);

            if (valid) {
                resolve();
                return;
            }

            reject(validate.errors);
        });
    }
}

module.exports = CarafeValidator;
