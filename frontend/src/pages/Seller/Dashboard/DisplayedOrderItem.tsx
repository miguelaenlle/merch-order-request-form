import * as React from "react"
import { Order } from "../../../components/shared/types/Order";
import { OrderItem } from "../../../components/shared/types/OrderItem";
import OrderedItem from "./OrderedItem";
import { PLACEHOLDER_ITEMS_ORDERED } from "../../../constants/placeholder-data";
import {useAPIHook} from "../../../components/shared/hooks/use-api-hook.ts";

const DisplayedOrderItem: React.FC<{ order: Order; }> = (props) => {
    const [itemsOrdered, setItemsOrdered] = React.useState<OrderItem[]>(PLACEHOLDER_ITEMS_ORDERED);
    const apiHook = useAPIHook();
    React.useEffect(() => {
        const fetchOrderItems = async () => {
            try {
                const response = await apiHook.get(`http://localhost:3000/api/orders/${props.order._id}/items`);
                setItemsOrdered(response.data.orderItems);
            } catch (error) {
                console.error('Error fetching order items:', error);
            }
        };
        fetchOrderItems();
    }, [apiHook, props.order]);
    return (
        <div style={{ marginBottom: "10px" }}>
            <h3>{props.order.customerName}</h3>
            {itemsOrdered.map((itemOrdered) => (
                <OrderedItem
                    key={`ordered-item-${itemOrdered._id}`}
                    orderedItem={itemOrdered}
                />
            ))}
        </div>
    );
}
export default DisplayedOrderItem;