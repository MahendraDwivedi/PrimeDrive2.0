import mongoose from "mongoose";
const connectDB = async ()=>{
    try {
        console.log("Connecting to database...");
        mongoose.connection.on('connected',()=> console.log('Database connected'));
        await mongoose.connect(`${process.env.MONGODB_URI}`)
    } catch (error) {
        console.log(error.message)
    }
}

export default connectDB;