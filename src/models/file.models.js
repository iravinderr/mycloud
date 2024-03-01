const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
        },
        content:{
            type: String,
            required: true,
        },
        url:{
            type: String,

        }
    },

    {timstamps: true}
);


module.exports = mongoose.model("fileDB", fileSchema);