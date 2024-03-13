import * as React from "react"
import BuyerNavbar from "../../components/shared/BuyerNavbar";
import { Order } from "../../components/shared/types/Order";
import { PLACEHOLDER_ORDERS } from "../../constants/placeholder-data";
import DisplayedCustomerOrderItem from "./DisplayedCustomerOrderItem";
const OrderManagement: React.FC<{}> = (props) => {
    const [orders, setOrders] = React.useState<Order[]>(PLACEHOLDER_ORDERS);

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
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
export default OrderManagement