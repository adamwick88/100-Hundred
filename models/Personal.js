const mongoose = require("mongoose");

const PersonalSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  favoriteFastFood: {
    type: String,
    required: true,
  },
 
  likes: {
    type: Number,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Personal", PersonalSchema);