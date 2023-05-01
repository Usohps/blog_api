const blogSchema = require("../model/blogSchema");
const mongoose = require("mongoose");
const createBlog = async (req, res) => {
  console.log(req.body);
  const { title, body, image, author } = req.body;
  try {
    const emptyfeild = [];
  if (!title) {
    emptyfeild.push("title");
  }
  if (!body) {
    emptyfeild.push("body");
  }
  if (!image) {
    emptyfeild.push("image");
  }
  if (!author) {
    emptyfeild.push("author");
  }
  if (emptyfeild.length > 0) {
    return res
      .status(400)
      .json({
        error: "Please complete give all required details to create a blog",
        emptyfeild,
      });
  }
    const blog = await blogSchema.create({ title, body, image, author });
    res.status(200).json(blog);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};
const getAllBlogs = async (req, res) => {
  try {
    const blog = await blogSchema.find({}).sort({ createdAt: -1 });
  res.status(200).json(blog);
  } catch (error) {
    console.log(error)
  }
};
const getSingleBlog = async(req,res)=>{
    const {id}= req.params
    try {
        const blog= await blogSchema.findById({_id:id})
        if(blog){
            res.status(200).json(blog)
            console.log(blog)
        }
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}
const deleteBlog = async (request, response) => {
  const { id } = request.params;
try {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "Wrong Identity" });
  }
  const blog = await blogSchema.findByIdAndDelete({ _id: id });
  if (!blog) {
    return response.status(400).json({ error: "No Id of such" });
  } else {
    console.log("Sucessfully Deleted",blog)
    return response.status(200).json(blog);
  }
} catch (error) {
  console.log(error)
}
};
module.exports = { createBlog, getAllBlogs, getSingleBlog,deleteBlog };
