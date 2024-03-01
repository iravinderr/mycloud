const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const cdConnect = async() => {
    try{
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        })
        console.log("CLOUDINARY CONNECTION SUCCESSFULL");
    }
    catch(error){
        console.log("!! ERROR IN CLOUDINARY CONNECTION !!");
        console.error(error);
        process.exit(1);
    }
}

module.exports = cdConnect;