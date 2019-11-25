import mongoose from 'mongoose';
import validator from 'validator';

const mongoosePaginate = require('mongoose-paginate');
mongoose.set('debug', true);
const ExceptionSchema = mongoose.Schema({
    message: {
        type: String,
    },
    code: {
        type: Number,
    },
    file: {
        type: String,
    },
    line: {
        type: Number,
    },
    systemName: {
        type: String,
    },
    trace: {
        type: JSON,
        validate: (trace) => {
            return validator.isJSON(trace);
        }
    }
},{
    timestamp: true
});

ExceptionSchema.plugin(mongoosePaginate);
ExceptionSchema.index({'$**': 'text'});

export default mongoose.model('Exception', ExceptionSchema);