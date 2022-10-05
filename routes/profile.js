const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profiles");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
router.post("/createProfile/:id", profileController.createProfile);

module.exports = router;