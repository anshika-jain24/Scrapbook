import mongoose from 'mongoose';

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

const Item = mongoose.model('placeToVisit', PlaceToVisitSchema);

export default Item;