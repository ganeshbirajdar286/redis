import { Worker } from "bullmq";

import { connection } from "./queue";


// this is consumer  worker(processes jobs)
const  worker = new Worker(
    "emails",
    async (job)=>{ // business logic
        console.log("Processing email job...",job.id,job.name,job.data)
        await new  Promise((resolve)=>setTimeout(resolve,1500)),
        console.log("Email job Completed!",job.id,job.name,job.data)
    },
    {connection}
)

worker.on("completed",(job)=>{
    console.log("Job completed!",job.id,job.name,job.data);
})
worker.on("failed",(job,err)=>{
    console.log("Job failed!",job.id,job.name,job.data)
})