//import mongoose
const mongoose = require("mongoose");
//create a schema
const theatreSchema = new mongoose.Schema({
  id: { type: String },
  name: {type: String,  },
  address: {type:String},
  city: {type:String},
  state: {type:String},
  post_code: {type:String},
  country_id: {type:String},
  chain_id: {type:String},
  external_id: {type:String},
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  timezone: {
    type: String,
    default: "America/Toronto",
  },
});
const theatreListSchema = new mongoose.Schema({
  theatreList: {
    type: [theatreSchema],
    required: true
  }
});

//create a model
const theatreModel = mongoose.model('theatrecollection',theatreListSchema)

//export
module.exports = theatreModel
