import express from "express";
import 'dotenv/config'
import connectDB from "./db/db.js";
import router from "./routes/users.route.js";
import cors from "cors";

let app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use("/api/v1", router);



let port = process.env.PORT;
// console.log(port)
console.log("this part of the code is runnig ")
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})