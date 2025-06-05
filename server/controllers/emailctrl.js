const Email=require("../models/Emailmodel") 

const emailctrl={ 
    createemail:async(req,res)=>{  
        try{ 
            const userId=req.id 
            const {to,subject,message}=req.body
              
            if(!to|| !subject|| !message) return res.status(400).json({msg:"All the fields are required"}) 

            const email= await Email.create({ 
                to,subject,message,userId
            }) 

            return res.json({email})
        }
        catch(error){ 
            res.status(500).json({msg:error.message})
        }
    }, 

    deleteemail:async(req,res)=>{ 
       try{ 
           const emailId = req.params.id
           const email= await Email.findOneAndDelete({_id: emailId}) 
             
           if(!email) return res.status(400).json({msg:"Email not found"}) 

           return res.status(200).json({msg:"Email deleted successfully"})
       } 
       catch(error){ 
        res.status(500).json({msg:error.message})
       }
    }, 

    getemails:async(req,res)=>{ 
        try{ 
              const userId=req.id 
              const emails=await Email.find({userId}) 

              return res.status(200).json({emails})
        } 
        catch(error){ 
            res.status(500).json({msg:error.message})
        }
    }
} 

module.exports=emailctrl