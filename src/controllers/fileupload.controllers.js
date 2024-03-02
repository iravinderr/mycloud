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
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async(req, res) => {
    try{
        const file = req.files.imageFile;
        const {title, content} = req.body;

        const supportedTypes = ["jpeg", "jpg", "png"];
        const fileType = file.name.split(".")[1].toLowerCase();

        if(!supportedTypes.includes(fileType)){
            return res.status(400).json({
                success: false,
                message: "File type not supported",
            });
        }

        const response = await uploadToCloudinary(file, "MyCloud");
        // console.log(response);

        const fileData = await fileDB.create({title, content, url:response.url});

        res.status(200).json({
            success: true,
            message: "File uploaded successfully and entry created in the database",
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