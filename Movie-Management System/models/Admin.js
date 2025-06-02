//import mongoose
const mongoose = require("mongoose")

//create a schema
const adminSchema = new mongoose.Schema({
    username:{type:String},
    password:{type:String},
    role: { type: String, default: "admin" }
})
//create a model
const adminModel = mongoose.model('admincollection',adminSchema)

//export
module.exports = adminModel