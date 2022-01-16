import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "place",
  },
  review_text: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model("review", ReviewSchema);

export default Item;