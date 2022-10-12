const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profiles");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const upload = require("../middleware/multer");
//
router.post("/createProfile/:id", upload.single("file"), profileController.createProfile);

//Comment Routes - simplified for now


module.exports = router;