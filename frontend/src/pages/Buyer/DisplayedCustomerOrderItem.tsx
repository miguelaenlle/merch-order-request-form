import * as React from "react"
import { Order } from "../../components/shared/types/Order";
import OrderedItem from "../Seller/Dashboard/OrderedItem";
import { PLACEHOLDER_ITEMS_ORDERED } from "../../constants/placeholder-data";
import { OrderItem } from "../../components/shared/types/OrderItem";
import { Box, Heading, Text, Image, Divider, Button } from "@chakra-ui/react";
import {useAPIHook} from "../../components/shared/hooks/use-api-hook.ts";

const DisplayedCustomerOrderItem: React.FC<{
    order: Order;
    refreshOrderItems: () => void;
}> = (props) => {
    const [itemsOrdered, setItemsOrdered] = React.useState<OrderItem[]>([]);

    const apiHook = useAPIHook();

    const handleLoadOrderedItems = async () => {
        // Loads the ordered items
        const buyerToken = await apiHook.generateBuyerToken();
        const response = await apiHook.get(
            `http://localhost:3000/api/orders/${props.order._id}/order-items`,
            buyerToken
        );

        console.log(response)

        setItemsOrdered(response.orderItems)
    }

    React.useEffect(() => {
        handleLoadOrderedItems()
    }, [props.order._id])

    const handleCompleteOrder = async () => {
        // Completes the order
    }

    const handleCancelOrder = async () => {
        // Cancels the order
    }

    return (
        <div style={{
            marginBottom: "10px"
        }}>
            <Box border={"1px solid gray"} borderRadius={"5px"} display={"flex"} p={"15"} flexDirection={"column"} alignItems={"flex-start"} gap={10}>
                <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"}>
                    <Heading as="h4" size="md" color={"gray"}>
                        Order {props.order.orderNumber}
                    </Heading>
                </Box>
                <Box display={"flex"} flexWrap={"wrap"} width={"100%"} flexDirection={"row"} justifyContent={"space-around"} alignItems={"flex-start"}>
                    <Box>
                        <Heading fontWeight="bold" as="h4" size="md" color={"gray"}>
                            Customer
                        </Heading>
                        <Text fontWeight={"bold"}>{props.order.customerName}</Text>
                    </Box>
                    <Box>
                        <Heading fontWeight="bold" as="h4" size="md" color={"gray"}>
                            Customer Type
                        </Heading>
                        <Text fontWeight={"bold"}>{props.order.customerType}</Text>

                    </Box>
                    <Box>
                        <Heading fontWeight="bold" as="h4" size="md" color={"gray"}>
                            School
                        </Heading>
                        <Text fontWeight={"bold"}>{props.order.school}</Text>
                    </Box>
                </Box>
                <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"}>
                    <Heading fontWeight="bold" as="h4" size="md" color={"gray"}>
                        Notes
                    </Heading>
                    <Text textAlign={"start"}>{props.order.notes}</Text>
                </Box>
                <Box display={"flex"} width={"100%"} flexDirection={"column"} alignItems={"flex-start"}>
                    <Heading fontWeight="bold" as="h4" size="md" color={"gray"} pb={10}>
                        Items
                    </Heading>
                    <Box display={"flex"} width={"100%"} flexDirection={"column"} gap={10}>
                        {itemsOrdered.map((itemOrdered) => (
                            <OrderedItem
                                key={`ordered-item-${itemOrdered._id}`}
                                orderedItem={itemOrdered}
                            />
                        ))}
                        <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
                            <Text fontWeight={"bold"}>Total</Text>
                            <Box display={"flex"} gap={20}>
                                <Text fontWeight={"bold"}>x2</Text>
                                {/* TODO: Sum */}
                                <Text fontWeight={"bold"}>$25.00</Text>
                                {/* TODO: Calculate */}
                            </Box>
                        </Box>
                        <Box display={"flex"} flexWrap={"wrap"} width={"100%"} gap={20}>
                            <Button onClick={handleCompleteOrder} backgroundColor={"#3ca46c"} color={"white"} fontWeight={"bold"} display={"flex"}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{ width: "30px", height: "25px" }} stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                                Complete
                            </Button>
                            <Button onClick={handleCancelOrder} backgroundColor={"#459ce4"} color={"white"} fontWeight={"bold"} display={"flex"}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{ width: "30px", height: "25px" }} stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <br />
        </div>
    );
}
export default DisplayedCustomerOrderItem;