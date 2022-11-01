const Address = require('ipaddr.js');
const mongoose = require('mongoose');
const schema = mongoose.Schema

const productschema = new schema({
    name:{type:String},
    img:{type:String},
    price:{type:Number},
    date:{type:String}
});
const product = module.exports = mongoose.model('product',productschema);

