const express = require("express");
const router = express.Router();

const {localFileUpload} = require("../controllers/fileupload.controllers");

// imageUpload, videoUpload, reducedImageUpload, 
// router.post("/imageUpload", imageUpload);
// router.post("/videoUpload", videoUpload);
// router.post("/reducedImageUpload", reducedImageUpload);
router.post("/localFileUpload", localFileUpload);

module.exports = router;