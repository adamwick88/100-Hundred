const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");

const Profile=require("../models/Personal")


module.exports = {
    createProfile: async (req, res) => {
      try {
          const result = await cloudinary.uploader.upload(req.file.path);
        await Profile.create({
          city: req.body.city,
          image: result.secure_url,
          cloudinaryId: result.public_id,
          favoriteFastFood: req.body.favoriteFastFood,
          user: req.user.id,
         
        });
        console.log("Profile has been updated.");
        res.redirect("/post/"+req.params.id);
      } catch (err) {
        console.log(err);
      }
    },
  };
