import express from 'express';
import routes from './routes/routes.js'
import connectDB from './config/db.js';

const app = express();
connectDB();

app.use(express.json());

app.use("/api/product", routes);

app.listen(5000, () => {
    console.log("server started successfully !");
});