const mongoose = require("mongoose");
const PostDetail = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "BlogUser",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    body: {
      type: String,
    },

    author: {
      type: String,
    },
    category:{
      type:String,
    },

    // image: {
    //   type: String,
    // },
  },
  { timestamps: true }
);
const schematic = mongoose.model("BlogData", PostDetail);
module.exports = schematic;
