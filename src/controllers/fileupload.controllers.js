const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const fileDB = require("../models/file.models");

exports.localFileUpload = async(req, res) => {
    try{
        // EXTRACTING THE FILE FROM THE REQUEST BODY
        const file = req.files.file;
        // console.log(file);
        
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        // console.log(path);
        file.mv(path);

        const {title, content} = req.body
        const {url} = `${path}`;

        const fileData = await fileDB.create(title, content, url);

        res.status(200).json({
            success: true,
            message: "File upload to the local successfully",
            data: fileData,
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error", 
        });
    }
}

const uploadToCloudinary = async(file, folder) => {
    const options = {folder};
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.fileUpload = async(req, res) => {
    try{
        const file = req.files.file;
        const {title, content} = req.body;

        const image = ["jpeg", "jpg", "png"];
        const video = ["mp4", "mov", "wmv"];
        const fileExt = file.name.split(".")[1].toLowerCase();
        
        if(!image.includes(fileExt) && !video.includes(fileExt)){
            return res.status(400).json({
                success: false,
                message: "File type not supported",
            });
        }
        
        let fileType;
        if(image.includes(fileExt)){
            fileType = `image`
        }
        else if(video.includes(fileExt)){
            fileType = `video`;
        }

        const response = await uploadToCloudinary(file, "MyCloud");
        const fileData = await fileDB.create({title, content, url:response.secure_url});

        res.status(200).json({
            success: true,
            message: `File uploaded successfully and entry created in the database and file type is ${fileType}`,
            data: fileData,
        });

    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}