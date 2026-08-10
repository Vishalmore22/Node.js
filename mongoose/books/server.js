import express from "express";
import connectDB from "./config/db.js";
import router from "./routes/routebook.js";
import cors from "cors"
const app = express();

app.use(express.json());
app.use(cors());
connectDB();

app.use("/api", router);
app.listen(3000, () => {
    console.log("Server is connnect succesfuly !");
})