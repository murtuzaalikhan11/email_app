const mongoose=require("mongoose") 

const userschema=new mongoose.Schema({ 
    name:{ 
        type:String, 
        require:true,
    }, 
    email:{ 
        type:String, 
        require:true, 
        unique:true
    }, 
    password:{ 
        type:String, 
        require:true
    }, 
    profilephoto:{
        type:String, 
        require:true
    }
},{ 
    timestamps:true
}) 

module.exports=mongoose.model("Users",userschema)