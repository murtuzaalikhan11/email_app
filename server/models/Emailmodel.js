const mongoose=require("mongoose") 

const emailschema= new mongoose.Schema({ 
    to:{ 
        required:true, 
        type:String
    }, 
    subject:{ 
        type:String, 
        required:true
    }, 
    message:{ 
        type:String, 
        required:true

    },

    userId:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{ 
    timestamps:true

}) 

module.exports=mongoose.model("Email",emailschema)