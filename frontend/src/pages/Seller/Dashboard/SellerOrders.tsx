import * as React from "react";
import { Order } from "../../../components/shared/types/Order";
import { PLACEHOLDER_ORDERS } from "../../../constants/placeholder-data";
import DisplayedCustomerOrderItem from "../../Buyer/DisplayedCustomerOrderItem";
import { useAPIHook } from "../../../components/shared/hooks/use-api-hook.ts";
import { AuthContext } from "../../../components/shared/context/AuthContext.tsx";

const SellerOrders: React.FC = () => {
    const [orders, setOrders] = React.useState<Order[]>([]);
    const apiHook = useAPIHook();
    const authContext = React.useContext(AuthContext);
    const fetchOrders = async () => {
        if (!authContext?.token || !authContext?.userId) {
            return;
        }
        try {
            const response = await apiHook.get(`http://localhost:3000/api/orders/my-orders?itemOwnerId=${authContext.userId}&status=pending`, authContext.token);

            console.log('Response Orders', response);

            setOrders(response.orders);
        } catch (error) {

            console.error('Error fetching orders:', error);
        }
    };
    React.useEffect(() => {
        fetchOrders();
    }, [authContext?.token, authContext?.userId]);
    return (
        <div className="subcontent">
            <h3 className="header">Ongoing Orders</h3>
            {orders?.map((order) => (
                <DisplayedCustomerOrderItem
                    key={`order-${order._id}`}
                    order={order}
                    refreshOrderItems={fetchOrders}
                    view="seller"
                />
            ))}
        </div>
    );
}
export default SellerOrders;
