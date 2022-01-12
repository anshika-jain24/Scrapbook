import Places from '../models/Place.js';

export const getPlaces = async (req,res) => {
    try {
        const places = await Places.find();

        res.status(200).json(places);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addPlaces = async ( req,res) => {
    const place = req.body;

    const newPlace = new Places({ ...place, })
}