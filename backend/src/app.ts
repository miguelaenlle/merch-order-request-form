import express, { Application } from "express";
import dummyRoutes from "./routes/dummy-routes";
import authRoutes from "./routes/auth-routes";
import groupRoutes from "./routes/groups-routes";
import imageRoutes from "./routes/image-routes"
import inventoryItem from "./routes/inventory-item-routes";
import orderRoutes from "./routes/order-routes";
import itemRoutes from "./routes/items-routes";
import cors from "cors";

const app: Application = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.options("*", cors());

// === Add routes here: ===

app.use('/api/dummies', dummyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/inventory-items', inventoryItem)
app.use('/api/orders', orderRoutes)
// ============================

export default app;