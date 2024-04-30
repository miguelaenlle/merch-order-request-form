// OrderManagement.tsx

import * as React from "react";
import BuyerNavbar from "../../components/shared/BuyerNavbar";
import OrderComponent from "./OrderComponent"; // Import OrderComponent
import { Order } from "../../components/shared/types/Order";
import DisplayedCustomerOrderItem from "./DisplayedCustomerOrderItem";
import { useAPIHook } from "../../components/shared/hooks/use-api-hook.ts";

const OrderManagement: React.FC<{}> = (props) => {
    const [orders, setOrders] = React.useState<Order[]>([]);
    const [selectedStatus, setSelectedStatus] = React.useState<string>("All"); // State for status dropdown

    const apiHook = useAPIHook();

    const retrieveOrders = async () => {
        const buyerToken = await apiHook.generateBuyerToken();
        const response = await apiHook.get(
            `http://localhost:3000/api/orders/my-orders`,
            buyerToken
        );
        setOrders(response.orders);
    }

    React.useEffect(() => {
        retrieveOrders();
    }, []);

    return (
        <div className="dashboard">
            <BuyerNavbar />
            <div className="content">
                <div className="subcontent">
                    <h3 className="header">My Orders</h3> {/* My Orders header */}
                    {/* Status Dropdown */}
                    <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    {/* Orders List */}
                    {orders?.map((order) => (
                        <DisplayedCustomerOrderItem
                            key={`order-${order._id}`}
                            order={order}
                            refreshOrderItems={retrieveOrders}
                        />
                    ))}
                </div>
            </div>
            {/* Display OrderComponent */}
            <OrderComponent />
        </div>
    );
}
export default OrderManagement;
