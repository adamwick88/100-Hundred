const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment")
const Profile=require("../models/Personal")


module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user, profile:Profile, });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },

  getMenu: async (req, res) => {
    try {
      const posts = await Post.find({ restaurants: "Mcdonalds" })
      res.render("menu.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },

  getMcdonalds: async (req, res) => {
    try {
      const posts = await Post.find({ restaurants: "Mcdonalds" })
      res.render("mcDonalds.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },



  getTacoBell: async (req, res) => {
    try {
      const posts = await Post.find({ restaurants: "TacoBell" })
      res.render("tacoBell.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPizzaHut: async (req, res) => {
    try {
      const posts = await Post.find({ restaurants: "PizzaHut" })
      res.render("pizzaHut.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },

  getcreateProfile: async (req, res) => {
      try {
        const posts = await Post.find({ user: req.user.id });
        res.render("createProfile.ejs", { posts: posts, user: req.user });
      } catch (err) {
        console.log(err);
    }
  },

  getoliveGarden: async (req, res) => {
    try {
      const posts = await Post.find({ restaurants: "OliveGarden" })
      res.render("oliveGarden.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getchickfila: async (req, res) => {
    try {
      const posts = await Post.find({ restaurants: "ChickFila" })
      res.render("chickfila.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },

  getstarbucks: async (req, res) => {
    try {
      const posts = await Post.find({ restaurants: "StarBucks" })
      res.render("starbucks.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      const profile = await Profile.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("post.ejs", { post: post, user: req.user, comments: comments, profile:profile  });
      console.log(req.file.path)
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        ingredients: req.body.ingredients,
        likes: 0,
        user: req.user.id,
        restaurants:req.body.restaurants
      });
      console.log("Post has been added!");
      res.redirect("/feed");
    } catch (err) {
      console.log(err);
    }
  },

  createProfilePost:async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        location: req.body.location,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        favoriteFastFood: req.body.favoriteFastFood,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
