import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

const S3_BUCKET = process.env.S3_BUCKET;
const REGION = process.env.REGION;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: REGION,
});

export const uploadFile = multer({
  // fileFilter: fileFilterPP,
  storage: multerS3({
    s3: s3,
    bucket: S3_BUCKET,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + file.originalname.replace(/\s+/g, ""));
    },
  }),
  limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
});
