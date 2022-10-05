const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/login", authController.getLogin);
router.get("/menu", ensureAuth, postsController.getMenu)
router.get("/mcDonalds", ensureAuth,postsController.getMcdonalds)
router.get("/pizzaHut", ensureAuth,postsController.getPizzaHut)
router.get("/tacoBell", ensureAuth,postsController.getTacoBell)
router.get("/chickfila", ensureAuth,postsController.getchickfila)
router.get("/oliveGarden", ensureAuth,postsController.getoliveGarden)
router.get("/starbucks", ensureAuth,postsController.getstarbucks)
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/createProfile", ensureAuth, postsController.getcreateProfile)
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
