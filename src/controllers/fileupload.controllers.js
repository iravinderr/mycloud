const mongoose = require("mongoose");
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