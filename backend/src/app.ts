import express, { Application } from "express";
import dummyRoutes from "./routes/dummy-routes";
import authRoutes from "./routes/auth-routes";

const app: Application = express();
const port = 3000;

app.use(express.json());
// app.use(cors());
// app.options("*", cors());

// === Add routes here: ===

app.use('/api/dummies', dummyRoutes);
app.use('/api/auth', authRoutes);

// ============================

export default app;