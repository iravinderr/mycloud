// IMPORTING THE .env CONFIGURATION
require("dotenv").config();
const PORT = process.env.PORT || 3001;


// INITIALISING THE EXPRESS APP/SERVER
const express = require("express");
const app = express();


// ADDING MIDDLEWARE FOR PARSING THE JSON REQUEST BODY
app.use(express.json());

// ADDING MIDDLEWARE FOR HANDLING THE MEDIA FILES IN THE REQUEST BODY
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


// CONNECTING THE SERVER WITH THE DATABASE
const dbConnect = require("./config/database.config");
dbConnect();


// CONNECTING THE SERVER WITH CLOUDINARY
const cdConnect = require("./config/cloudinary.config");
cdConnect();


// MOUNTING THE API ROUTES
const fileUploadRoutes = require("./routes/fileupload.routes");
app.use("/api/v1/upload", fileUploadRoutes);


// ACTIVATING THE SERVER TO LISTEN
app.listen(PORT, () => {
    console.log(`Server is running at the port no. ${PORT}`);
})