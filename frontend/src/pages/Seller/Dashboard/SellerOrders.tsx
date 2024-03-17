import * as React from "react";
import { Order } from "../../../components/shared/types/Order";
import DisplayedOrderItem from "./DisplayedOrderItem";
import { PLACEHOLDER_ORDERS } from "../../../constants/placeholder-data";

const SellerOrders: React.FC<{}> = (props) => {
    const [orders, setOrders] = React.useState<Order[]>(PLACEHOLDER_ORDERS);

    // TODO: Fetch orders from our API

    return (
        <div className="subcontent">
            <h3 className="header">Ongoing Orders</h3>
            {orders?.map((order) => (
                <DisplayedOrderItem
                    key={`order-${order._id}`}
                    order={order}
                />
            ))}
        </div>
    );
}
export default SellerOrders