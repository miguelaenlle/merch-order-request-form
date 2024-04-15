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
        console.log(response)
        /*const orderData = JSON.parse(response) // this was originally gonna sort data through here but later a proper method was added to backend so its useless. i like this WIP too much so its a comment for fun
        const filteredData = []
        for (const [value] of Object.values(orderData)) {
            if (value.userWhoPlacedOrderId == "65f8eb04ccc06864028d51f6") {
                filteredData.push(value)
            }
        }
        console.log("test")
        console.log(filteredData)*/
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
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
export default OrderManagement