const express = require("express");
const router = express.Router();

const {fileUpload, localFileUpload} = require("../controllers/fileupload.controllers");

// videoUpload, reducedImageUpload, 
router.post("/fileUpload", fileUpload);
// router.post("/videoUpload", videoUpload);
// router.post("/reducedImageUpload", reducedImageUpload);
router.post("/localFileUpload", localFileUpload);

module.exports = router;