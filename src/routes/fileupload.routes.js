const express = require("express");
const router = express.Router();

const {imageUpload, localFileUpload} = require("../controllers/fileupload.controllers");

// videoUpload, reducedImageUpload, 
router.post("/imageUpload", imageUpload);
// router.post("/videoUpload", videoUpload);
// router.post("/reducedImageUpload", reducedImageUpload);
router.post("/localFileUpload", localFileUpload);

module.exports = router;