import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';


const S3_BUCKET ='scrapbook';
const REGION ='us-east-1';
const ACCESS_KEY ='AKIAXCCR7Y4DDVBUIBU6';
const SECRET_ACCESS_KEY ='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';


const s3 = new AWS.S3({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: REGION,
});

const uploadFile = multer({
    fileFilter: fileFilterPP,
    storage: multerS3({
      s3: s3,
      bucket: S3_BUCKET,
      acl: "public-read",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + file.originalname.replace(/\s+/g, ''));
      },
    }),
    limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
  });

export default uploadFile;
