const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlaceToVisitSchema = new Schema({
    owner: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    place:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'place'
    }
});

module.exports = Item = mongoose.model('placeToVisit', PlaceToVisitSchema);