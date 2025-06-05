
const usercontroller=require("../controllers/usercontroller") 
const router=require("express").Router() 

router.post("/register",usercontroller.register)
router.post("/login",usercontroller.login) 
router.post("/logout",usercontroller.logout)

module.exports=router