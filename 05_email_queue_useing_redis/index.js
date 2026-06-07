import express from "express"
import Redis from "ioredis"
 
const app=express();
app.use(express.json())

// use to make redis  client
const redis=new Redis('redis://localhost:6379')

const QUEUE_KEY="queue:emails";


app.post("/emails",async(req,res)=>{
  const job={
    to:req.body.to,
    subject:req.body.subject ||"NO subject",
    body:req.body.body||"NO  content",
    createdAt:new Date().toISOString()
  }

  await redis.lpush(QUEUE_KEY,JSON.stringify(job))
   res.json({queued:true,job})
})

app.get("/emails/process-one",async(req,res)=>{
    const rawjob=await redis.rpop(QUEUE_KEY)
    if(!rawjob){
        return  res.json({message:'no jobs in the queue'})
    }
    res.json({emails:rawjob?JSON.parse(rawjob):null}) 
})
  

app.listen(3000,()=>{
    console.log(
        "server is running on 3000"
    )
})