const Address = require('ipaddr.js');
const mongoose = require('mongoose');
const schema = mongoose.Schema
const ObjectId = schema.Types.ObjectId

const userdetailSchema = new schema({
    user_id : {type : ObjectId},
    img: { type: String },
    phone: { type: Number },
    address: { type: String },
    country: { type: String },
    gender: { type: String },
    date:{type: Date , default : new Date},
});

const userdetail = module.exports = mongoose.model('userdetail', userdetailSchema);