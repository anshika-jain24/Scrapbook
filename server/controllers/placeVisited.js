import User from "../models/User.js";
import Place from "../models/Place.js";
import PlaceVisited from "../models/PlaceVisited.js";
import Review from "../models/Review.js";

export const getVisited = async (req, res) => {
  const user = await User.findOne({ _id: req.user._id }).populate({
    path: "placesVisited",
    model: PlaceVisited,
    populate : {
        path: "place",
        model: Place,
    },
    populate : {
        path : "review",
        model : Review
    }
  });

  const dat = user.placesVisited;

  return res.status(200).json(dat);
};

