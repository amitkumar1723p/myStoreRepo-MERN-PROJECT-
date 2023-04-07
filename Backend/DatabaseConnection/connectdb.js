import mongoose from "mongoose";

//  Database Connection Code 
const connectDb = async () => {
    // const DB_OPTIONS = {
    //     // user: process.env.USER,
    //     // pass: process.env.PASSWORD,
    //     dbName: process.env.DATABASE_NAME,
    //     // authSource: process.env.AUTH_SOURCE
    // }
    const connectionUri = process.env.DATABASE_URI

    mongoose.set('strictQuery', true)
    await mongoose.connect(connectionUri)





}
export default connectDb
