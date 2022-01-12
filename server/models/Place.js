const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pointSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
});

const PlaceSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    location: {
        type: pointSchema,
        required: true
    },
    rating:{
        type: Double,
    },
    reviews: {  
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'review'
    }
});

module.exports = Item = mongoose.model('place', PlaceSchema);