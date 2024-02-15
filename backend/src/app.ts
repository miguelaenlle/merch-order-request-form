import express, { Application } from "express";
import dummyRoutes from "./routes/dummy-routes";
import dummy2Routes from "./routes/dummy-2-routes";

const app: Application = express();
const port = 5000;

app.use(express.json());
// app.use(cors());
// app.options("*", cors());

// === Add routes here: ===

app.use('/api/dummies', dummyRoutes);
app.use('/api/dummies2', dummy2Routes);

// ============================

export default app;