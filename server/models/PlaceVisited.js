import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PlaceVisitedSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "place",
  },
  images: {
    type: String,
  },
  note: {
    type: String,
  },
  review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "review",
  },
  rating: {
    type: Number,
  },
});

const Item = mongoose.model(
  "placeVisited",
  PlaceVisitedSchema
);

export default Item;
