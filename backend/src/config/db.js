import mongoose from 'mongoose'
import {ENV} from './env.js'

export const connectDB=async()=>{
    try{
        const connect=await mongoose.connect(ENV.MONGO_URI)
        console.log("Database Connected",connect.connection.host);
    }catch(err){
        console.log("Error connecting to mongodb",err);
        process.exit(1)
    }
}