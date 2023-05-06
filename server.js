// const { response } = require("express");
const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const cors = require("cors");
// import the routes into the costant below
const blogRoutes = require("./routes/blogRoute");
const userRoute = require("./routes/userRoute");
// To initiate express next line
const app = express();
app.use(express.json());
app.use(cors());
app.use((request, response, next) => {
  // console.log(request.method, request.path);
  next();
});
app.use("/api/blog", blogRoutes);
app.use("/api/user", userRoute);
const start = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}/userSignup`);
    app.listen(process.env.PORT, () => {
      console.log(
        "I am connected to db and listening on port",
        process.env.PORT
      );
    });
  } catch (err) {
    console.log(err);
  }
};
start().catch((err) => {
  console.log(err);
  throw err
});
