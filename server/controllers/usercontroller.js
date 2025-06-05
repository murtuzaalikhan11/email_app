const Users=require("../models/usermodel") 
const bcrypt=require("bcrypt") 
const jwt=require("jsonwebtoken")
const usercontroller={ 
    register: async(req,res)=>{ 
        try{ 
             const {name,email,password}=req.body 
             if(!name||!email||!password) 
                return res.status(400).json({msg:"All the fields are required"}) 

            const user=await Users.findOne({email}) 
            if(user) return res.status(400).json({msg:"This user already exist"}) 

                if(password.length<6) 
                    return res.status(400).json({msg:"password should be atleast 6 characters"}) 

                const passwordHash=await bcrypt.hash(password,10) 
                 
                const profilephoto="https://avatar.iran.liara.run/public/boy";
                const newUser= new Users({ 
                    name,email,password:passwordHash,profilephoto
                }) 

                await newUser.save() 

                res.status(201).json({msg:"Account succesfully created"})
        } 
        catch(error) 
        { 
          res.status(500).json({msg:error})
        }
    }, 
    login: async(req,res)=>{  
        try{ 
              const {email,password}=req.body 
        if(!email||!password) 
            return res.status(400).json({msg:"Enter email and password"}) 
        
        const user=await Users.findOne({email}) 
        if(!user) return res.status(400).json({msg:"User does not exist please register"}) 
        
        const ispasswordmatch= await bcrypt.compare(password,user.password) 
        if(!ispasswordmatch) return res.status(400).json({msg:"Invalid Email or Password"}) 

            const tokenData={ 
                userId:user._id
            } 

            const token=jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:"1d"}) 
            return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({msg:`${user.name} loggedin succesfully`})

        } 
    catch(error){ 
        res.status(500).json({msg:error.message})
    }
      
    }, 
    logout: async(req,res)=>{ 
        try{ 
             return res.status(200).cookie("token",{maxAge:0}).json({msg:"logged out"})
        } 
        catch{ 
            res.status(500).json({msg:error.msg})
        }
    }
    
} 
module.exports=usercontroller