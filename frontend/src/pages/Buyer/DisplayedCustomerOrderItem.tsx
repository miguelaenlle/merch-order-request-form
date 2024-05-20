import * as React from "react"
import { Order } from "../../components/shared/types/Order";
import OrderedItem from "../Seller/Dashboard/OrderedItem";
import { PLACEHOLDER_ITEMS_ORDERED } from "../../constants/placeholder-data";
import { OrderItem } from "../../components/shared/types/OrderItem";
import { Box, Heading, Text, Image, Divider, Button, useToast } from "@chakra-ui/react";
import { useAPIHook } from "../../components/shared/hooks/use-api-hook.ts";
import { AuthContext } from "../../components/shared/context/AuthContext.tsx";

const DisplayedCustomerOrderItem: React.FC<{
    order: Order;
    refreshOrderItems: () => void;
    view: "buyer" | "seller";
}> = (props) => {


    React.useEffect(() => {
        console.log("order", props.order);
    }, [props.order])


    const [itemsOrdered, setItemsOrdered] = React.useState<OrderItem[]>([]);

    const [orderInfo, setOrderInfo] = React.useState<{ [key: string]: any }>({});


    const apiHook = useAPIHook();
    const authContext = React.useContext(AuthContext);
    const toast = useToast();

    const handleLoadOrderedItems = async () => {
        // Loads the ordered items
        if (!authContext?.token) {
            return;
        }

        try {
            const response = await apiHook.get(
                `http://localhost:3000/api/orders/${props.order._id}/order-items`,
                authContext?.token
            );
            console.log(response)
            if (response.orderItems && response.orderItems.length > 0) {
                setOrderInfo({
                    name: response.orderItems[0].name,
                    sellerName: response.orderItems[0].sellerName,
                    sellerEmail: response.orderItems[0].sellerEmail,
                    pickupLocation: response.orderItems[0].pickupLocation,
                    pickupTime: response.orderItems[0].pickupTime
                })

                setItemsOrdered(response.orderItems)
            }
        } catch {
            toast({
                title: "Error",
                description: "Failed to load order items",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }

    }

    React.useEffect(() => {
        handleLoadOrderedItems()
    }, [props.order._id])

    const handleCompleteOrder = async () => {
        // Completes the order
        if (!authContext?.token) {
            return;
        }
        try {
            const response = await apiHook.post(
                `http://localhost:3000/api/orders/${props.order._id}/complete`,
                {},
                authContext?.token
            );
            toast({
                title: "Success",
                description: "Order completed",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            props.refreshOrderItems();

        } catch {
            toast({
                title: "Error",
                description: "Failed to complete order",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    }

    const handleCancelOrder = async () => {
        // Cancels the order
        if (!authContext?.token) {
            return;
        }
        try {
            const response = await apiHook.post(
                `http://localhost:3000/api/orders/${props.order._id}/cancel`,
                {},
                authContext?.token
            );
            toast({
                title: "Success",
                description: `Order cancelled. Please notify the ${props.view === "buyer" ? "seller" : "buyer"}`,
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            props.refreshOrderItems();

        } catch {
            toast({
                title: "Error",
                description: "Failed to cancel order",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
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
                <Box display={"flex"} flexWrap={"wrap"} width={"100%"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"flex-start"}>

                    {props.view === "seller" ? (
                        <>
                            <Box display={"flex"} width={"100%"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"flex-start"}>
                                <Box flex={1}>
                                    <Heading fontWeight="bold" as="h4" size="md" color={"gray"}>
                                        Customer
                                    </Heading>
                                    <Text fontWeight={"bold"}>{props.order.customerName}</Text>
                                </Box>
                                <Box flex={1}>
                                    <Heading fontWeight="bold" as="h4" size="md" color={"gray"}>
                                        Customer Type
                                    </Heading>
                                    <Text fontWeight={"bold"}>{props.order.customerType}</Text>

                                </Box>
                            </Box>
                            <Box mt={5} display={"flex"} width={"100%"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"flex-start"}>

                                <Box flex={1}>
                                    <Heading fontWeight="bold" as="h4" size="md" color={"gray"}>
                                        Customer Email
                                    </Heading>
                                    <Text fontWeight={"bold"} cursor="pointer" onClick={() => {
                                        window.location.href = `mailto:${props.order.customerEmail}`
                                    }}>
                                        {props.order.customerEmail}
                                    </Text>
                                </Box>
                                <Box flex={1}>
                                    <Heading fontWeight="bold" as="h4" size="md" color={"gray"}>
                                        School
                                    </Heading>
                                    <Text fontWeight={"bold"}>{props.order.school}</Text>
                                </Box>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Box display={"flex"} width={"100%"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"flex-start"}>
                                <Box flex={1}>
                                    <Heading fontWeight="bold" as="h4" size="md" color={"gray"}>
                                        Seller Name
                                    </Heading>
                                    <Text fontWeight={"bold"}>{orderInfo.sellerName}</Text>
                                </Box>
                                <Box flex={1}>
                                    <Heading fontWeight="bold" as="h4" size="md" color={"gray"}>
                                        Seller Email
                                    </Heading>
                                    <Text fontWeight={"bold"} cursor="pointer" onClick={() => {
                                        window.location.href = `mailto:${orderInfo.sellerEmail}`
                                    }}>
                                        {orderInfo.sellerEmail}
                                    </Text>
                                </Box>
                            </Box>
                            <Box mt={5} display={"flex"} width={"100%"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"flex-start"}>
                                <Box flex={1}>
                                    <Heading fontWeight="bold" as="h4" size="md" color={"gray"}>
                                        Pickup Location
                                    </Heading>
                                    <Text fontWeight={"bold"}>{orderInfo.pickupLocation}</Text>
                                </Box>
                                <Box flex={1}>
                                    <Heading fontWeight="bold" as="h4" size="md" color={"gray"}>
                                        Pickup Time
                                    </Heading>
                                    <Text fontWeight={"bold"}>{orderInfo.pickupTime}</Text>
                                </Box>
                            </Box>
                        </>
                    )}
                </Box>
                <Text>
                    {props.view === "buyer" ? (
                        "Please coordinate a time via email with the seller to pick up your order. Come with cash ready."
                    ) : (
                        "Please coordinate a time via email with the buyer to pick up your order. Let them know to come with cash ready."
                    )}
                </Text>
                <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"}>
                    <Heading fontWeight="bold" as="h4" size="md" color={"gray"}>
                        Notes
                    </Heading>
                    <Text textAlign={"start"}>{props.order.notes || "No notes."}</Text>
                </Box>
                <Box display={"flex"} width={"100%"} flexDirection={"column"} alignItems={"flex-start"}>
                    <Heading fontWeight="bold" as="h4" size="md" color={"gray"} pb={3}>
                        Item
                    </Heading>
                    <Box display={"flex"} width={"100%"} flexDirection={"column"} gap={3}>
                        {itemsOrdered.map((itemOrdered) => (
                            <OrderedItem
                                key={`ordered-item-${itemOrdered._id}`}
                                orderedItem={itemOrdered}
                            />
                        ))}
                        {props.view === "seller" && (
                            <Box display={"flex"} justifyContent="space-between" width={"100%"} gap={20}>
                                {/* {props.view === "seller" && ( */}
                                <Button onClick={handleCompleteOrder} backgroundColor={"#3ca46c"} color={"white"} fontWeight={"bold"} display={"flex"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{ width: "30px", height: "25px" }} stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                    Complete
                                </Button>
                                {/* // )} */}
                                <Button onClick={handleCancelOrder} backgroundColor={"#459ce4"} color={"white"} fontWeight={"bold"} display={"flex"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{ width: "30px", height: "25px" }} stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                    Notify Cancellation
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
            <br />
        </div>
    );
}
export default DisplayedCustomerOrderItem;