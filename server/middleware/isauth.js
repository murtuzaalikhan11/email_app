const jwt=require("jsonwebtoken") 

const isauth= async(req,res,next)=>{ 
    try{ 
        const token= req.cookies.token 
        if(!token) return res.status(400).json({msg:"invalid login"}) 

            const decoded=await jwt.verify(token,process.env.SECRET_KEY) 
            if(!decoded) return res.status(400).json({msg:"invalid token"}) 

                req.id=decoded.userId 
                next()
    } 
    catch(error){ 
        res.status(500).json({msg:error.msg})
    }

} 

module.exports=isauth