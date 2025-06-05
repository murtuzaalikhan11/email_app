const emailctrl=require("../controllers/emailctrl") 
const isauth=require("../middleware/isauth")
const router=require("express").Router() 

router.post("/createemail", isauth, emailctrl.createemail)
router.post("/getemails", isauth, emailctrl.getemails)
router.delete("/:id", isauth, emailctrl.deleteemail)

module.exports=router