const UserSchema = require("../model/UserSchema");
const token = require("jsonwebtoken")

const createToken = (_id)=>{
   return token.sign({_id},process.env.SECRET,{expiresIn:"3d"})
}
const User = async (req, res) => {
  const { names,email,password } = req.body;
  try {
    const User = await UserSchema.signup( names,email,password);
    // create token
    const token= createToken(User._id)
    res.status(200).json({email,token});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const RegisteredUser = async(req,res)=>{
    const {email,password}=req.body
    try {
        const User = await UserSchema.login(email,password);
        // create token
        const token= createToken(User._id)
        res.status(200).json({email,token});
      } catch (error) {
        console.log(error)
       throw res.status(400).json({ error: error.message });
      }
    // res.json({mssg: "you are logged in"})
}
module.exports = { User , RegisteredUser };
