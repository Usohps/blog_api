const express =  require("express")
const router = express.Router()
const {createBlog, getAllBlogs,getSingleBlog, deleteBlog} = require("../controllers/blogController")
 router.post("/", createBlog)
 router.get("/blogs",getAllBlogs)
 router.get("/:id",getSingleBlog)
 router.delete("/:id",deleteBlog)
 module.exports = router 