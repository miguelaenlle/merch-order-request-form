import express, { Application } from "express";
import dummyRoutes from "./routes/dummy-routes";
import authRoutes from "./routes/auth-routes";
import groupRoutes from "./routes/groups-routes";
import imageRoutes from "./routes/image-routes"
import inventoryItem from "./routes/inventory-item-routes";
import orderRoutes from "./routes/order-routes";

const app: Application = express();

app.use(express.json());
// app.use(cors());
// app.options("*", cors());

// === Add routes here: ===

app.use('/api/dummies', dummyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/items', imageRoutes)
app.use('/api/inventory-items', inventoryItem)
app.use('/api/orders', orderRoutes)
// ============================

export default app;