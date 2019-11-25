import mongoose from 'mongoose';
import validator from 'validator';

const mongoosePaginate = require('mongoose-paginate');

const LogSchema = mongoose.Schema({
    type: {
        type: String
    },
    action: {
        type: String,
    },
    message: {
        type: String,
    },
    userId: {
        type: String,
    },
    userAgent: {
        type: String,
    },
    systemName: {
        type: String,
    },
    ip: {
        type: String,
        validate: (value) => {
            return validator.isIP(value);
        }
    },
    params: {
        type: JSON,
        validate: (value) => {
            return validator.isJSON(value);
        },
    },
    before: {
        type: JSON,
        validate: (value) => {
            return validator.isJSON(value);
        },
    },
    after: {
        type: JSON,
        validate: (value) => {
            return validator.isJSON(value);
        },
    }
}, {
    timestamps: true
});

LogSchema.plugin(mongoosePaginate);
LogSchema.index({'$**': 'text'});

export default mongoose.model('Log', LogSchema);