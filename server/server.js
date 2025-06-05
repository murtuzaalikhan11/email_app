const express=require("express") 
const connectDB=require("./connectDB"); 
const cookieParser = require("cookie-parser"); 
const cors=require("cors");
require("dotenv").config()
connectDB();
const app=express() 



const PORT=5000


app.get("/",(req,res)=>{ 
    res.json({msg:"this is server testing"})
}) 

app.use(express.urlencoded({extended:true})) 
app.use(express.json()) 
app.use(cookieParser()) 

const corsOptions={ 
    origin:"http://localhost:3000",
    credentials:true  
}  
app.use(cors(corsOptions))

app.use("/user",require("./routes/userrouter")) 
app.use("/api/email",require("./routes/emailrouter"))



app.listen(PORT,()=> 
{ 
    console.log(`SERVER IS RUNNING ON ${PORT}`);
    
})