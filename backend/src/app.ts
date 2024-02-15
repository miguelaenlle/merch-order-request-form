import express, { Application } from "express";
import dummyRoutes from "./routes/dummy-routes";
import userRoutes from "./routes/user-routes";

const app: Application = express();
const port = 5000;

app.use(express.json());
// app.use(cors());
// app.options("*", cors());

// === Add routes here: ===

app.use('/api/dummies', dummyRoutes);
app.use('/api/user', userRoutes);

// ============================

export default app;