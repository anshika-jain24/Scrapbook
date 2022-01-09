const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    location:{
        type: String,
        required:true,
        unique:true
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