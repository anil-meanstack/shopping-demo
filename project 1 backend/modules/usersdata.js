const Address = require('ipaddr.js');
const mongoose = require('mongoose');
const schema = mongoose.Schema

const userdataSchema = new schema({
    name: { type: String },
    img: { type: String },
    email: { type: String },
    phone: { type: Number },
    password: { type: String },
    address: { type: String },
    country: { type: String },
    gender: { type: String },
    userType: { type: Number, default: 1 }  //0 admin , 1 user


});

const userdata = module.exports = mongoose.model('userdata', userdataSchema);