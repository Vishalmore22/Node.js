import express from 'express';
import routes from './routes/routes.js'
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
connectDB();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser());

app.use("/api/product", routes);

app.listen(5000, () => {
    console.log("server started successfully !");
});