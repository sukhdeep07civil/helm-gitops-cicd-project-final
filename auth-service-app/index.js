import express from "express";

import Redis from "ioredis";

const app = express();
const PORT = process.env.PORT || 3000;

const redis = new Redis({
    host: process.env.HOST,
    port: process.env.PORT,
    retryStrategy: (times)=>{
        return Math.min(100*times, 2000);
    }
})

redis.on("connect",()=>{
    console.log("connected to redis");
})

redis.on("error",(error)=>{
    console.log("Error connecting to redis", error.message);
})

app.get("/",(req,res)=>{
    res.status(200).json({success: true, message: "This is home page"});
})

app.listen(PORT,()=>{
    console.log(`App is listening on port: ${PORT}`);
})

