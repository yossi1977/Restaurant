const router = require("express").Router()
const {userRegister} = require("../controllers/user_controllers")

router.post("/register",userRegister)

module.exports = router