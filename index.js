import express from "express";
import dotenv from "dotenv";
import mongoose  from "mongoose";
import cors from "cors";
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js"
dotenv.config();

const app = express()
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ||4000;
const URI= process.env.MongoDBURI;

//connect to mongoDB
try{
    mongoose.connect(URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    });
    console.log("Connected to MongoDB")
}

catch(error){
    console.log("Error", error);

}
mongoose.connection.on('error', (error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
});


//define routes

app.use("/book",bookRoute);
app.use("/user",userRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
