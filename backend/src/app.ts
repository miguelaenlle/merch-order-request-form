import express, { Application } from "express";
import dummyRoutes from "./routes/dummy-routes";
import authRoutes from "./routes/auth-routes";
import imageRoutes from "./routes/image-routes"
import inventoryItem from "./routes/inventory-item-routes";

const app: Application = express();

app.use(express.json());
// app.use(cors());
// app.options("*", cors());

// === Add routes here: ===

app.use('/api/dummies', dummyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/items', imageRoutes)
app.use('/api/inventory-items', inventoryItem)
// ============================

export default app;