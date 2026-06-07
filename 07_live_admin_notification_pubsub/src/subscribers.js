import Redis  from "ioredis";
const subscriber =new Redis("redis://localhost:6379")


 // 'notification is name of  channel'
subscriber.subscribe('notification',(err)=>{
    if(err){
        console.log("Failed to subscriber: %s",err.message);
        return 
    }
    console.log('subscribed successfully!');
})

subscriber.on("message",(channel,message)=>{
    console.log(`Received message from channel ${channel}:${JSON.parse(message)} `)
})