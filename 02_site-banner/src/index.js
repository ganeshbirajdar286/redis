import express from "express"
import Redis from "ioredis"
import mongoose from 'mongoose'


const app=express();
app.use(express.json())

// use to make redis  client
const redis=new Redis('redis://localhost:6379')
const BANNER_KEY="app:banner"

app.post("/banner",async(req,res)=>{
    await redis.set(BANNER_KEY,req.body.message||"welcome to  chair aur code with redis!")
    res.json({success:true})
})

app.get("/banner",async(req,res)=>{
    const message =await redis.get(BANNER_KEY)
    res.json({message})
})

app.delete("/banner",async(req,res)=>{
    await redis.del(BANNER_KEY);
    res.json({success:true})
})

app.get('/banner/exists',async(req,res)=>{
  const exists =await redis.exists(BANNER_KEY);
  res.json({exists:exists})
})

app.listen(3000,()=>{
    console.log(
        "server is running on 3000"
    )
})