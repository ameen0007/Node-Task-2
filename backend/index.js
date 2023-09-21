const express = require("express")
const fs = require("fs");
const cors =  require("cors")
const app = express()
const userlist = require("./userlist.json")


app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
   res.sendFile(__dirname + "/index.html")
})

app.get("/users",(req,res)=>{
   res.json(userlist)
  
})

app.post("/users" , (req,res)=>{
   const newdata = req.body
   res.json({
      name : "",
      email : ""
   })
   newdata.id = userlist.length + 1

   userlist.push(newdata)
 
   
   fs.writeFile("./userlist.json", JSON.stringify(userlist, null, 2), (err) => {
     if (err) {
       console.log("Error writing to userlist.json:", err);
       res.status(500).json({ error: "Failed to update userlist" });
     } else {
       console.log("Userlist updated successfully.");
       res.json(newdata); 
     }
   })
  
   
})

app.listen(3000 , ()=>console.log("server started"))