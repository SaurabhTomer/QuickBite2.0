import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"


//function to uplaod function on cloudinary
const uploadOnCloudinary = async (file) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {
        //upload on cloudinary
        const result = await cloudinary.uploader.upload(file)

        //jaise hi file uplaod hoti h tbhi hm us file ko public folder se delete kr dete h
        fs.unlinkSync(file)

        // url from cloudinary of file
        return result.secure_url
    } catch (error) {
        //agr error aata h tb bhi delete krdenge
        fs.unlinkSync(file)
        console.log(error)
    }
}

export default uploadOnCloudinary