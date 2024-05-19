import * as React from "react"
import { OrderItem } from "../../../components/shared/types/OrderItem";
import { Box, Heading, Text, Image, Divider, Button } from "@chakra-ui/react";
const OrderedItem: React.FC<{
    orderedItem: OrderItem
}> = (props) => {
    return ( 
        <Box display={"flex"} width={"100%"} justifyContent={"space-between"} flexWrap={"wrap"} gap="2">
        <Box display={"flex"} alignItems={"center"} flexWrap="wrap" gap="2" justifyContent={"center"}>
            <Image width={50} height={50} objectFit={"cover"} borderRadius={"10px"} backgroundColor={"lightgray"} src={"https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"} alt="image" />
            <Heading px={10} size="sm" fontWeight="bold">
                {props.orderedItem.name}
            </Heading>                                
            <Heading backgroundColor={"#e4ecf4"} px={10} size="sm" borderRadius={"5px"}>
                {props.orderedItem.tag}
            </Heading>
        </Box>
        <Box display={"flex"} width={{base: "100%", sm: "30%", md: "20%"}} alignItems={"center"} flexWrap="wrap" gap="4" justifyContent={"center"}>
            <Text>{props.orderedItem.size}</Text>
            <Text>x{props.orderedItem.numOrdered}</Text>
            <Text>${props.orderedItem.price}</Text>
        </Box>
    </Box>
    );
}
export default OrderedItem