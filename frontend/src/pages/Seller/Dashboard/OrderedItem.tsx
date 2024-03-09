import * as React from "react"
import { OrderItem } from "../../../components/shared/types/OrderItem";
const OrderedItem: React.FC<{
    orderedItem: OrderItem
}> = (props) => {
    return (
        <div>
            <p>Ordered Item -- {props.orderedItem.name}</p>
        </div>
    );
}
export default OrderedItem