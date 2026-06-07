import express from "express"
import Redis from "ioredis"
 
const app=express();
app.use(express.json())

// use to make redis  client
const publisher=new Redis('redis://localhost:6379')

app.post("/notification",async(req,res)=>{
    const payload ={
        title:req.body.title ||"Default Tittle",
        createdAt:new Date().toISOString(),
    }

    const receivers=await publisher.publish("notifications",JSON.stringify(payload))
    res.json({message:`notificaation sent to ${receivers} subscribers`})
})

app.listen(3000,()=>{
    console.log(
        "server is running on 3000"
    )
})