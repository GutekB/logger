import mongoose from 'mongoose';

const TokenSchema = mongoose.Schema({
   name: {
       type: String,
       unique: true,
   },
   value: {
       type: String,
       unique: true,
   },
}, {
    timestamp: true
});

TokenSchema.index({'$**': 'text'});

TokenSchema.statics.checkToken = async function checkToken(value) {
    const result = await this.where('value', value).exec();

    return result.length > 0;
};

TokenSchema.statics.getSystemNameFor = async function getSystemNameFor(token) {
    const result = await this.findOne({'value': token}).exec();

    return result.name;
};

export default mongoose.model('Token', TokenSchema);