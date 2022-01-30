// const asyncHandler = require("express-async-handler");
// const aws = require("aws-sdk");
// const multer = require("multer");
// const multerS3 = require("multer-s3");
// const path = require("path");

import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

const upload = multer();

const s3 = new aws.S3({
  secretAccessKey: "3akze+WJxJFQ/3kZ5c9gu2lcH+CQo5pBsBsMMt2T",
  accessKeyId: "AKIAXCCR7Y4DDVBUIBU6",
  region: "us-east-1",
});

const uploadProfilePicture = multer({
  //   fileFilter: fileFilterPP,
  storage: multerS3({
    s3: s3,
    bucket: "scrapbook",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    // add the student name in the
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "TESTING" });
    },
    key: function (req, file, cb) {
      cb(null,file.originalname.replace(/\s+/g, ""));
    },
  }),
  limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
});

export const updateProfilePicture = async (req, res, next) => {
  // const obj = new FormData(req.body);

  // console.log(req.fields);

  let fileKey;

  // pehele student dhoondo
  const uploadPP = uploadProfilePicture.single("image");
  uploadPP(req, res, async (error) => {
    if (error instanceof multer.MulterError) {
      res.status(500);
      next(new Error(error.message));
    } else if (error) {
      res.status(500);
      next(new Error(error.message));
    } else {
      // after the upload is done, now update in db
      if (req.file) {
        // student.photo = req.file.key;
        // const photoUpdated = await student.save();

        console.log(req.file);

        res.json({ message: "Done" });
      } else {
        res.status(403);
        next(new Error("Select a file"));
      }
    }
  });

  console.log(fileKey);

  const temp = upload.any();
  temp(req, res, async (error) => {
    console.log(req.files);
    const obj = JSON.parse(JSON.stringify(req.body));

    console.log(obj);
  });
};
