import { Queue } from "bullmq";


// this is use for redis connection
export const connection={
    host:'localhost',
    port:6379,
}

export const emailQueue=new Queue('emails',{connection})
