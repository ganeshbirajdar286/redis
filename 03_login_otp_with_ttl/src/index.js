import express from "express"
import Redis from "ioredis"
 


const app=express();
app.use(express.json())

// use to make redis  client
const redis=new Redis('redis://localhost:6379')

function otpkey(phone){
    return `otp:${phone}`
}

app.post("/otp",async(req,res)=>{
   const {phone}=req.body;
   const otp=Math.floor(Math.random()*90000).toString()
   const redis_otp=await redis.set(otpkey(phone),otp,'EX',30)// otp is valid for 30 sec
     res.json({redis_otp,otp})
})

app.post("/otp/verify",async(req,res)=>{
    const {phone,otp}=req.body;
    const savedotp=await redis.get(otpkey(phone))
  console.log(savedotp)

    if(!savedotp){
        return res.status(400).json({messages:'OTP expired or not found'})
    }
    if(savedotp !==otp){
       return res.status(400).json({messages:'Invalid OTP'})   
    }

    await redis.del(otpkey(phone));
    res.json({message:"OTP verified succesfully"})
})

app.get("/otp/:phone/ttl",async(req,res)=>{
    const ttl=await redis.ttl(otpkey(req.params.phone))
    res.json({ttl}) // it retun  count in second if -2 the key is remove for redis 
})
app.listen(3000,()=>{
    console.log(
        "server is running on 3000"
    )
})