const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async() => {
    try{
        const connectionInstance = await mongoose.connect(process.env.DATABASE_URL);
        console.log(`\nDATABASE CONNECTION SUCCESSFULL\nDB HOST : ${connectionInstance.connection.host}`);
    }
    catch(error){
        console.log("!!! ERROR IN DATABASE CONNECTION !!!");
        console.error(error);
        process.exit(1);
    }
}

module.exports = dbConnect;
