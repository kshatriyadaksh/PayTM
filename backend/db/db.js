import mongoose from "mongoose";

let connectDB = async ()=>{
    try {
        let db_string = await mongoose.connect(`mongodb://localhost:27017/paytm`);
        console.log("Connected to MongoDB ", db_string.connection.host);
    } catch (error) {
        console.log("error in connecting to the database ", error);
        process.exit(1);
    }
}

export default connectDB;
