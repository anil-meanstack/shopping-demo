const Address = require('ipaddr.js');
const mongoose = require('mongoose');
const schema = mongoose.Schema
const ObjectId = schema.Types.ObjectId

const cartschema = new schema({
    product_id:{type:ObjectId},
    user_id:{type:ObjectId},
    date:{type: Date , default : new Date}
});
const cart = module.exports = mongoose.model('cart',cartschema);