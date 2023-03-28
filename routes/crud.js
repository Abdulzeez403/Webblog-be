const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  PostBlog,
  GettingAllBlogs,
  GettingASingleBlog,
  UpdateSingleBlog,
  DeleteSingleBlog,
  updateComment,
  GetAllBlogComment
} = require("../control/control");

//Receiving data from frontend sent it to database
//fetching all the data from the database to the frontend

router.route("/").get(GettingAllBlogs).post(PostBlog);

//Update a single blog
// Delete a single blog
//fetching a single blog
router
  .route("/:id")
  .delete(DeleteSingleBlog)
  .get(GettingASingleBlog)
  .put(UpdateSingleBlog);


  //post a  comment
//fetching comments
// router
// .route("/:id/comment")
// .get(GetAllBlogComment).
// post(updateComment);

module.exports = router;
