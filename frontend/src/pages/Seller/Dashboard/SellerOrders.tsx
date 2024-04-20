import * as React from "react";
import { Order } from "../../../components/shared/types/Order";
import { PLACEHOLDER_ORDERS } from "../../../constants/placeholder-data";
import DisplayedCustomerOrderItem from "../../Buyer/DisplayedCustomerOrderItem";
import {useAPIHook} from "../../../components/shared/hooks/use-api-hook.ts";

const SellerOrders: React.FC = () => {
    const [orders, setOrders] = React.useState<Order[]>(PLACEHOLDER_ORDERS);
    const apiHook = useAPIHook();
    React.useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await apiHook.get(`http://localhost:3000/api/orders?itemOwnerId=65f8eb04ccc06864028d51f6`);
                setOrders(response.data.orders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, [apiHook]);
    return (
        <div className="subcontent">
            <h3 className="header">Ongoing Orders</h3>
            {orders?.map((order) => (
                <DisplayedCustomerOrderItem
                    key={`order-${order._id}`}
                    order={order}
                />
            ))}
        </div>
    );
}
export default SellerOrders;
