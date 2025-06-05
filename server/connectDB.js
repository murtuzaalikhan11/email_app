const mongoose=require("mongoose")

const connectDB= async ()=>{ 
    try{ 
         await mongoose.connect(process.env.MONGODB_URI) 
         console.log("CONNECTED TO MONGODB");
         
    } 
    catch(error) { 
        console.log(error);
        
    }
} 

module.exports=connectDB