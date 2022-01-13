import mongoose from "mongoose";

const Schema = mongoose.Schema;

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const PlaceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: pointSchema,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "review",
  },
});

const Item = mongoose.model("place", PlaceSchema);

export default Item;
