// to store uer profile we use two method
// 1) hash
// 2) json
// set->use  to store single value  . it store data in strig format
// hset ->is use for storeing object  . it  store data in  object format
// hgetall->give whole object

import express from "express"
import Redis from "ioredis"
 


const app=express();
app.use(express.json())

// use to make redis  client
const redis=new Redis('redis://localhost:6379')

app.post("/user/:id/json",async(req,res)=>{
  await redis.set(`user:${req.params.id}:json`,JSON.stringify(req.body))
  res.json({savedas:"json"})
})

app.get("/user/:id/json",async(req,res)=>{
    const raw=await redis.get( `user:${req.params.id}:json`)
    res.json({user:raw?JSON.parse(raw):null}) 
})

app.post("/user/:id/hash",async(req,res)=>{
  await redis.hset(`user:${req.params.id}:hash`,req.body  )
  res.json({savedas:"hash"})
})

app.get("/user/:id/hash",async(req,res)=>{
    const user=await redis.hgetall(`user:${req.params.id}:hash`)
    res.json({user}) 
})

app.listen(3000,()=>{
    console.log(
        "server is running on 3000"
    )
})