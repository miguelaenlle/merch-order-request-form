import express, { Application } from "express";
import cors from "cors";
import dummyRoutes from "./routers/dummy-router";

const app: Application = express();
const port = 5000;

app.use(express.json());
// app.use(cors());
// app.options("*", cors());

// === Add routes here: ===

app.use('/api/dummies', dummyRoutes);

// ============================

export default app;