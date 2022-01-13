import User from '../models/User.js';
import Place from '../models/Place.js';

export const getToVisit = async (req, res) => {

    const user = await User.findOne({_id:req.user._id})
    .populate({
        path:'placesToVisit',
        model: Place
    })

    const dat = user.placesToVisit;

    return res.status(200).json(dat);

}

export const addToVisit = async (req, res) => {
    const place = req.body;

    const foundPlaces = await Place.find({"location.coordinates":req.body.location.coordinates});

    // console.log(foundPlace);

    const foundPlace=foundPlaces[0];

    if(foundPlace)
    {
      const user = await User.findOne({_id:req.user._id});

      const temp = user.placesToVisit;

      // console.log(user.placesToVisit);
      // console.log(foundPlace._id)

      const foundPlaceToVisit = temp.includes(foundPlace._id);

      // console.log(foundPlaceToVisit);

      if(foundPlaceToVisit)
      {
        try {
          res.status(300).json({message:"Place To Visit already exists"})
        }
        catch(error)
        {
          res.status(409).json({ message: error.message});
        }
      }

      else {
        try {
          const updatedUser = await User.findOneAndUpdate(
            {_id:req.user._id},
            {$push:{ placesToVisit: foundPlace._id}}
          )
          res.status(409).json({ message: "Place added to Places To Visit"});
        }
        catch(error) {
          res.status(409).json({ message: error.message});
        }
      }
    }

    else {
    const newPlace = new Place(place);  

      try {
        const a = await newPlace.save();  
  
        const owner = req.user._id;
        const p = a._id;
  
        const updatedUser = await User.findOneAndUpdate(
          {_id:owner},
          {$push:{ placesToVisit: p}}
        )
  
        res.status(200).json(a);
      } catch (error) {
          res.status(409).json({ message: error.message});
      }
    }
}

