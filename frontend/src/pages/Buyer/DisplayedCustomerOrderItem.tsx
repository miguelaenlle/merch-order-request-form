import * as React from "react"
import { Order } from "../../components/shared/types/Order";
import OrderedItem from "../Seller/Dashboard/OrderedItem";
import { PLACEHOLDER_ITEMS_ORDERED } from "../../constants/placeholder-data";
import { OrderItem } from "../../components/shared/types/OrderItem";

const DisplayedCustomerOrderItem: React.FC<{
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
export default DisplayedCustomerOrderItem;