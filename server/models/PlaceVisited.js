import mongoose from "mongoose";

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
    default: "",
  },
  personal_note: {
    type: String,
    default: "",
  },
  review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "review",
    default: null,
  },
  rating: {
    type: Number,
  },
});

const Item = mongoose.model("placeVisited", PlaceVisitedSchema);

export default Item;
