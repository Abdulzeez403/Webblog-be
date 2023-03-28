const schematic = require("../models/schema");
const asyncHandler = require("express-async-handler");

const GettingAllBlogs = asyncHandler(async (req, res) => {
  const category = req.params.category;

  try {
    if (category) {
      const Blog = await schematic.find({ category: category });
      res.status(200).send(Blog);
    } else {
      const Blog = await schematic.find();
      res.status(200).send(Blog);
    }
  } catch (err) {
    throw new Error("error occurred!");
  }
  
});
const PostBlog = asyncHandler(async (req, res, next) => {
  const { title, description, body, author } = req.body;

  const Blogs = await schematic.create({
    title,
    description,
    body,
    author,
  });
  res.status(200).send(Blogs);
});

const GettingASingleBlog = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const BlogId = await schematic.findById(id, body, { new: true });
  if (!BlogId) {
    res.status(400);
    throw new Error("Cant get a single blog!");
  }
  res.status(200).send({ BlogId });
});

const UpdateSingleBlog = asyncHandler(async (req, res) => {
  const { title, description, body, author } = req.body;
  const { id } = req.params;

  const updateBlog = await schematic.findByIdAndUpdate(
    id,
    {
      title,
      description,
      body,
      author,
    },
    { new: true }
  );
  if (!updateBlog) {
    res.status(400);
    throw new Error("Updated Error!");
  }
  res.status(200).send(updateBlog);
});

const DeleteSingleBlog = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const DeleteBlog = await schematic.findByIdAndRemove(id);
  if (!DeleteBlog) {
    res.status(400);
    throw new Error("Delete Failed!");
  }
  res.send("Deleted!");
});

// const FilterBlog = asyncHandler(async(req, res)=>{
//   const category = req.params.category;
//   const FindCategory = schematic.find({category:category})
//   if(FindCategory){
//     res.status(200).send(FindCategory)
//   }
// })

module.exports = {
  PostBlog,
  GettingAllBlogs,
  GettingASingleBlog,
  UpdateSingleBlog,
  DeleteSingleBlog,
  // FilterBlog
  // updateComment,
  // GetAllBlogComment,
};
