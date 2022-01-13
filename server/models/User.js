import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    placesToVisit: {  
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'place'
    },
    placesVisited:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'placesVisited'
    }
});

const Item = mongoose.model('user', UserSchema);

export default Item;