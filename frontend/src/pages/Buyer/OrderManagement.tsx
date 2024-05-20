// OrderManagement.tsx

import * as React from "react";
import BuyerNavbar from "../../components/shared/BuyerNavbar";
import OrderComponent from "./OrderComponent"; // Import OrderComponent
import { Order } from "../../components/shared/types/Order";
import DisplayedCustomerOrderItem from "./DisplayedCustomerOrderItem";
import { useAPIHook } from "../../components/shared/hooks/use-api-hook.ts";
import { AuthContext } from "../../components/shared/context/AuthContext.tsx";
import { Spinner, useToast } from "@chakra-ui/react";
import { useLoadErrorHook } from "../../components/shared/hooks/use-load-error-hook.ts";

const OrderManagement: React.FC<{}> = (props) => {
    const [orders, setOrders] = React.useState<Order[]>([]);
    const [selectedStatus, setSelectedStatus] = React.useState<string>("pending"); // State for status dropdown

    const authContext = React.useContext(AuthContext);
    const apiHook = useAPIHook();
    const toast = useToast();
    const loadErrorHook = useLoadErrorHook();

    const retrieveOrders = async () => {
        loadErrorHook.handleStartLoading();
        if (!authContext?.token) {
            loadErrorHook.handleStopLoading();
            return;
        }
        try {

            let url = `http://localhost:3000/api/orders/my-orders`;

            if (selectedStatus !== "all") {
                url += `?status=${selectedStatus}`;
            }

            const response = await apiHook.get(
                url,
                authContext?.token
            );
            setOrders(response.orders);
        } catch {
            toast({
                title: "Error",
                description: "Failed to load orders",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        loadErrorHook.handleStopLoading();
    }

    React.useEffect(() => {
        retrieveOrders();
    }, [authContext?.token, selectedStatus]);

    return (
        <div className="dashboard">
            <BuyerNavbar />
            <div className="content">
                <div className="subcontent">
                    <h3 className="header">My Orders</h3> {/* My Orders header */}
                    {/* Status Dropdown */}
                    <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="denied">Cancelled</option>
                    </select>
                    {/* Orders List */}
                    <br />
                    <br />
                    {loadErrorHook.loading && (
                        <>
                            <Spinner />
                        </>
                    )}
                    {orders?.map((order) => (
                        <DisplayedCustomerOrderItem
                            key={`order-${order._id}`}
                            order={order}
                            refreshOrderItems={retrieveOrders}
                            view="buyer"
                        />
                    ))}
                </div>
            </div>
            {/* Display OrderComponent */}
        </div>
    );
}
export default OrderManagement;
