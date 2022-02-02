import User from "../models/User.js";
import Place from "../models/Place.js";
import PlaceVisited from "../models/PlaceVisited.js";
import Review from "../models/Review.js";
// import {uploadfile} from "./UploadFiles.js";
import multer from "multer";
import aws from "aws-sdk";
import multerS3 from "multer-s3";
import mongoose from 'mongoose';
const upload = multer();

const s3 = new aws.S3({
  secretAccessKey: "3akze+WJxJFQ/3kZ5c9gu2lcH+CQo5pBsBsMMt2T",
  accessKeyId: "AKIAXCCR7Y4DDVBUIBU6",
  region: "us-east-1",
});

const uploadImageFile = multer({
  //   fileFilter: fileFilterPP,
  storage: multerS3({
    s3: s3,
    bucket: "scrapbook",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, file.originalname.replace(/\s+/g, ""));
    },
  }),
  limits: { fileSize: 200000000 }, // In bytes: 2000000 bytes = 2 MB
});

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

export const addVisited = async (req, res, next) => {
  // const uploadPP = uploadImageFile.array("image_files");
  // uploadPP(req, res, async (error) => {
  //   if (error instanceof multer.MulterError) {
  //     res.status(500);
  //     next(new Error(error.message));
  //   } else if (error) {
  //     res.status(500);
  //     next(new Error(error.message));
  //   } else {
  //     // after the upload is done, now update in db
  //     if (req.files) {
  //       // student.photo = req.file.key;
  //       // const photoUpdated = await student.save();

  //       console.log(req.files);

  //       res.json({ message: "Done" });
  //     } else {
  //       res.status(403);
  //       next(new Error("Select a file"));
  //     }
  //   }
  // });

  // const temp = upload.any();
  // temp(req, res, async (error) => {
  //   // console.log(req.files);

  //   // console.log(obj);
  // });

  // console.log(req.file);

  const temp1 = uploadImageFile.array("image_files", 5);
  temp1(req, res, async (error) => {
    var fileNames = req.files.map((obj) => {
      console.log("objjjj");
      console.log(obj);
      return obj.originalname.replace(/\s+/g, "");
    });

    console.log(fileNames);
    const obj = JSON.parse(JSON.stringify(req.body));

    const tempp = JSON.parse(obj.place);

    const place = { ...obj, place: tempp };
    console.log(place.place);

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
              images: fileNames,
            });

            // if(fileNames.length>0)
            // {
            //   newPlaceVisited = {...newPlaceVisited, images:fileNames}
            // }

            const savedPlaceVisited = await newPlaceVisited.save();

            const updatedUser = await User.findOneAndUpdate(
              { _id: req.user._id },
              { $push: { placesVisited: savedPlaceVisited._id } }
            );

            if (place.rating != -1) {
              const updatedPlace = await Place.findOneAndUpdate(
                { _id: foundPlace._id },
                {
                  rating: [
                    parseInt(Number(foundPlace.rating[0]) + Number(place.rating)),
                    foundPlace.rating[1] + 1,
                  ],
                }
              );
            }

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
              images: fileNames,
            });

            // if(fileNames.length>0)
            // {
            //   newPlaceVisited = {...newPlaceVisited, images:fileNames}
            // }

            const savedPlaceVisited = await newPlaceVisited.save();

            const updatedUser = await User.findOneAndUpdate(
              { _id: req.user._id },
              { $push: { placesVisited: savedPlaceVisited._id } }
            );

            if (place.rating != -1) {
              const updatedPlace = await Place.findOneAndUpdate(
                { _id: foundPlace._id },
                {
                  rating: [
                    parseInt(Number(foundPlace.rating[0]) + Number(place.rating)),
                    foundPlace.rating[1] + 1,
                  ],
                }
              );
            }

            res.status(200).json(savedPlaceVisited);
          } catch (error) {
            res.status(400).json({ message: error.message });
          }
        }
      }
    } else {
      const obj1 = place.place;
      const obj2 = {...obj1, "rating":[place.rating, 1]};
      const newPlace = new Place(obj2);

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
              images: fileNames,
            });

            // if(fileNames.length>0)
            // {
            //   newPlaceVisited = {...newPlaceVisited, images:fileNames}
            // }

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
              images: fileNames,
            });

            // if(fileNames.length>0)
            // {
            //   newPlaceVisited = {...newPlaceVisited, images:fileNames}
            // }

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
    if (error instanceof multer.MulterError) {
      res.status(500);
      next(new Error(error.message));
    } else if (error) {
      res.status(500);
      next(new Error(error.message));
    } else {
      if (req.files) {
        console.log("Done");
      } else {
        res.status(403);
        next(new Error("Select a file"));
      }
    }
    // console.log(req.file);
  });
};

export const removeVisited = async (req, res) => {
  const { placeID }  = req.body;
  console.log(req.body);

  if(!mongoose.Types.ObjectId.isValid(placeID)) return res.status(404) .send("No place with that id");

  await PlaceVisited.findByIdAndRemove(placeID);


  const user = await User.findOneAndUpdate(
    {_id : req.user._id},
    {
        $pull : {placesVisited: placeID}
    }
  )

  const userUpdated = await User.findOne({ _id: req.user._id }).populate({
    path: "placesVisited",
    model: Place,
  });

  res.status(200).json(userUpdated.placesVisited);

};