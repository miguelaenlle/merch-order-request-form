import * as React from "react"
import BuyerNavbar from "../../components/shared/BuyerNavbar";
import { Order } from "../../components/shared/types/Order";
//import { PLACEHOLDER_ORDERS } from "../../constants/placeholder-data";
import DisplayedCustomerOrderItem from "./DisplayedCustomerOrderItem";
import { useAPIHook } from "../../components/shared/hooks/use-api-hook.ts";
const OrderManagement: React.FC<{}> = (props) => {
    const [orders, setOrders] = React.useState<Order[]>([]);

    const apiHook = useAPIHook();

    const retrieveOrders = async () => {
        const buyerToken = await apiHook.generateBuyerToken();

        const response = await apiHook.get(
            `http://localhost:3000/api/orders/my-orders`,
            buyerToken
        );
        
        setOrders(response.orders)
    }

    React.useEffect(() => {
        retrieveOrders()
    }, [])

    return (
        <div className="dashboard">
            <BuyerNavbar />
            <div className="content">
                <div className="subcontent">
                    <h3 className="header">Orders</h3>
                    {orders?.map((order) => (
                        <DisplayedCustomerOrderItem
                            key={`order-${order._id}`}
                            order={order}
                            refreshOrderItems={retrieveOrders}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
export default OrderManagement