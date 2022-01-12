import PlaceToVisit from '../models/PlaceToVisit.js';
import User from '../models/User.js';
import Places from '../models/Place.js';

export const getToVisit = async (req, res) => {

    const user = await User.findOne({_id:req.user._id})
    .populate({
        path:'placeToVisit',
        model: PlaceToVisit,
        populate : {
            path: 'place',
            model : Places
        }
    })

    const dat = user.placeToVisit;

    return res.status(200).json({
        data: dat
    })

}

export const addToVisit = async (req, res) => {
    const place = req.body;

    const newPlace = new Places(place);  

    try {
      const a = await newPlace.save();  

      const owner = req.user._id;
      const p = a._id;

      const newPlace1 = new PlaceToVisit({
        owner,
        p
      });

      const t = await newPlace1.save();

      const updatedUser = await User.findOneAndUpdate(
        {_id:req.user._id},
        {$push:{ placesToVisit: t._id}}
      )

      res.status(200).json(t);
    } catch (error) {
        res.status(409).json({ message: error.message});
    }
}

