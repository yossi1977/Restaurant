const router =require("express").Router()
const { userRegister , userLogin}=require("../controller/user_controller") 


router.post("/register",userRegister)
router.post("/login",userLogin)
// router.get("/register",userRegister)

module.exports = router


