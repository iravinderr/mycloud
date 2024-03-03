const express = require("express");
const fileUploadRoutes = require("./routes/fileupload.routes");
const fileupload = require("express-fileupload");



const app = express();


// ADDING MIDDLEWARE FOR PARSING THE JSON REQUEST BODY
app.use(express.json());


// ADDING MIDDLEWARE FOR HANDLING THE MEDIA FILES IN THE REQUEST BODY
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));



// MOUNTING THE API ROUTES
app.use("/api/v1/upload", fileUploadRoutes);



module.exports = app;