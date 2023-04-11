const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  PostBlog,
  GettingAllBlogs,
  GettingASingleBlog,
  UpdateSingleBlog,
  DeleteSingleBlog,
  GettingUserBlogs
} = require("../control/control");

const { VerifyToken } = require("../middleware/verifyToken");

//Receiving data from frontend sent it to database
//fetching all the data from the database to the frontend

router.route("/").get(GettingAllBlogs);

//Update a single blog
// Delete a single blog
//fetching a single blog
router
  .route("/:id")
  .get(GettingUserBlogs)
  .post(PostBlog)
  .delete(VerifyToken, DeleteSingleBlog)
  .get(GettingASingleBlog)
  .put(UpdateSingleBlog);

//post a  comment
//fetching comments
// router
// .route("/:id/comment")
// .get(GetAllBlogComment).
// post(updateComment);

module.exports = router;
