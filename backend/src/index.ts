
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";

dotenv.config();

const mongoURI = process.env.MONGO_URI as string;
const port = 3000;

mongoose.connect(mongoURI)
    .then(() => {
        app.listen(port, () => {
            console.log(`[server]: Server is running at http://localhost:${port}`);
        });
    })
    .catch(error => console.error('Error connecting to MongoDB:', error));