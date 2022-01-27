import React , {useState} from 'react';
// import { uploadFile } from 'react-s3';
import {uploadFile} from '../redux/ActionCreators/PlacesVisited.js';
import { useDispatch, useSelector } from "react-redux";

const S3_BUCKET ='scrapbook';
const REGION ='us-east-1';
const ACCESS_KEY ='AKIAXCCR7Y4DDVBUIBU6';
const SECRET_ACCESS_KEY ='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';

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

const UploadImageToS3WithReactS3 = () => {

    const dispatch = useDispatch();

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleUpload = async (file) => {

        const obj = new FormData();
        obj.append("image", selectedFile);
        obj.append("data1", "sample");

        dispatch(uploadFile(obj));


        // uploadFile(file, config)
        //     .then(data => console.log(data))
        //     .catch(err => console.error(err))
    }

    return <div>
        <div>React S3 File Upload</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
    </div>
}

export default UploadImageToS3WithReactS3;