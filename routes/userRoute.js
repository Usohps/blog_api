const express =  require("express")
const router = express.Router()
const { User, RegisteredUser } = require("../controllers/User")
router.post("/signup", User)
router.post("/login", RegisteredUser)
 module.exports =router