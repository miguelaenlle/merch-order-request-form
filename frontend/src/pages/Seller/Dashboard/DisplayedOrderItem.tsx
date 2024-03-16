import * as React from "react"
import { Order } from "../../../components/shared/types/Order";
import { OrderItem } from "../../../components/shared/types/OrderItem";
import OrderedItem from "./OrderedItem";
import { PLACEHOLDER_ITEMS_ORDERED } from "../../../constants/placeholder-data";

const DisplayedOrderItem: React.FC<{
    order: Order;
}> = (props) => {
    const [itemsOrdered, setItemsOrdered] = React.useState<OrderItem[]>(PLACEHOLDER_ITEMS_ORDERED);

    return (
        <div>
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
export default DisplayedOrderItem