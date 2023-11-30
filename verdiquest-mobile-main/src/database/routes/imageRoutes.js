const express = require("express");
const imageController = require("../controllers/imageController");

const router = express.Router();

router.post("/imageUpload", imageController.updateOrgProfile);
router.post("/insertTask", imageController.uploadTaskImage);
router.post("/updateTaskImage", imageController.updateTaskImage);

module.exports = router;
