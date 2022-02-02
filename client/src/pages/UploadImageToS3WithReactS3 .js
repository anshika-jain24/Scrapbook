import React , {useState} from 'react';
// import { uploadFile } from 'react-s3';
import {uploadFile} from '../redux/ActionCreators/PlacesVisited.js';
import { useDispatch} from "react-redux";




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