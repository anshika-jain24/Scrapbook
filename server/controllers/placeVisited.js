import User from "../models/User.js";
import Place from "../models/Place.js";
import PlaceVisited from "../models/PlaceVisited.js";
import Review from "../models/Review.js";

export const getVisited = async (req, res) => {
  const user = await User.findOne({ _id: req.user._id }).populate({
    path: "placesVisited",
    model: PlaceVisited,
    populate: [
      {
        path: "place",
        model: Place,
      },
      {
        path: "review",
        model: Review,
      },
    ],
  });

  const dat = user.placesVisited;

  return res.status(200).json(dat);
};

export const addVisited = async (req, res) => {
  const place = req.body;

  console.log(place.place.location);

  const foundPlaces = await Place.find({
    "location.coordinates": place.place.location.coordinates,
  });
  const foundPlace = foundPlaces[0];
  if (foundPlace) {
    const user = await User.findOne({ _id: req.user._id }).populate({
      path: "placesVisited",
      model: PlaceVisited,
    });

    const temp = user.placesVisited;

    // console.log(temp);

    // console.log(foundPlace._id);

    const foundPlacesVisited = temp.filter((obj) => {
      const a1 = obj.place.toString();
      const a2 = foundPlace._id.toString();
      return a1 === a2;
    });
    console.log(foundPlacesVisited);

    const foundPlaceVisited = foundPlacesVisited[0];

    if (foundPlaceVisited) {
      try {
        res.status(300).json({ message: "Place Visited already exists" });
      } catch (error) {
        res.status(409).json({ message: error.message });
      }
    } else {
      if (place.review) {
        try {
          const objReview = new Review({
            author: req.user._id,
            place: foundPlace._id,
            review_text: place.review,
          });
          const savedReview = await objReview.save();

          const updatedPlace = await Place.findOneAndUpdate(
            { _id: foundPlace._id },
            { $push: { reviews: savedReview._id } }
          );

          const newPlaceVisited = new PlaceVisited({
            owner: req.user._id,
            place: foundPlace._id,
            review: savedReview._id,
            personal_note: place.personal_note || "",
            rating: place.rating || -1,
          });

          const savedPlaceVisited = await newPlaceVisited.save();

          const updatedUser = await User.findOneAndUpdate(
            { _id: req.user._id },
            { $push: { placesVisited: savedPlaceVisited._id } }
          );

          res.status(200).json(savedPlaceVisited);
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      } else {
        try {
          const newPlaceVisited = new PlaceVisited({
            owner: req.user._id,
            place: foundPlace._id,
            personal_note: place.personal_note || "",
            rating: place.rating || -1,
          });

          const savedPlaceVisited = await newPlaceVisited.save();

          const updatedUser = await User.findOneAndUpdate(
            { _id: req.user._id },
            { $push: { placesVisited: savedPlaceVisited._id } }
          );

          res.status(200).json(savedPlaceVisited);
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      }
    }
  } else {
    const newPlace = new Place(place.place);

    try {
      const a = await newPlace.save();

      const owner = req.user._id;

      if (place.review) {
        try {
          const objReview = new Review({
            author: req.user._id,
            place: a._id,
            review_text: place.review,
          });
          const savedReview = await objReview.save();

          const updatedPlace = await Place.findOneAndUpdate(
            { _id: a._id },
            { $push: { reviews: savedReview._id } }
          );

          const newPlaceVisited = new PlaceVisited({
            owner: req.user._id,
            place: a._id,
            review: savedReview._id,
            personal_note: place.personal_note || "",
            rating: place.rating || -1,
          });

          const savedPlaceVisited = await newPlaceVisited.save();

          const updatedUser = await User.findOneAndUpdate(
            { _id: req.user._id },
            { $push: { placesVisited: savedPlaceVisited._id } }
          );

          res.status(200).json(savedPlaceVisited);
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      } else {
        try {
          const newPlaceVisited = new PlaceVisited({
            owner: req.user._id,
            place: a._id,
            personal_note: place.personal_note || "",
            rating: place.rating || -1,
          });

          const savedPlaceVisited = await newPlaceVisited.save();

          const updatedUser = await User.findOneAndUpdate(
            { _id: req.user._id },
            { $push: { placesVisited: savedPlaceVisited._id } }
          );

          res.status(200).json(savedPlaceVisited);
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      }
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  }
};
