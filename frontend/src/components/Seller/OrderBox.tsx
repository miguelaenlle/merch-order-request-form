import { Box, Heading, Text, Image, Divider, Button } from "@chakra-ui/react";
import { Order } from "../shared/types/Order";

import * as React from "react"
const OrderBox: React.FC<{
    order: Order
}> = (props) => {
    return (
        <Box border={"1px solid gray"} borderRadius={"5px"} display={"flex"}  p={"15"} flexDirection={"column"} alignItems={"flex-start"} gap={10}>
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
                <Text fontWeight={"bold"}>Student</Text>
                </Box>
                <Box>
                <Heading fontWeight="bold" as="h4" size="md" color={"gray"}>
                    Customer Type
                </Heading>
                <Text fontWeight={"bold"}>Jane Doe</Text>

                </Box>
                <Box>
                <Heading fontWeight="bold" as="h4" size="md" color={"gray"}>
                    School
                </Heading>
                <Text fontWeight={"bold"}>JHHS</Text> 
                </Box>
            </Box>  
            <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"}>
                <Heading fontWeight="bold" as="h4" size="md" color={"gray"}>
                    Notes
                </Heading>
                <Text textAlign={"start"}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error dolor deleniti laborum quam, aspernatur officiis distinctio dicta harum facere ullam!</Text>
            </Box>
            <Box display={"flex"} width={"100%"}  flexDirection={"column"} alignItems={"flex-start"}>
                <Heading fontWeight="bold" as="h4" size="md" color={"gray"} pb={10}>
                    Items
                </Heading>
                <Box display={"flex"} width={"100%"} flexDirection={"column"} gap={10}> 
                <Box display={"flex"} width={"100%"} justifyContent={"space-between"} flexWrap={"wrap"}>
                    <Box display={"flex"} alignItems={"center"} gap={10}>
                        <Image width={50} height={50} objectFit={"cover"} borderRadius={"10px"} backgroundColor={"lightgray"} src={"https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"} alt="image" />
                        <Text fontWeight={"bold"} fontSize={"20px"}>Item #1</Text>
                        <Box backgroundColor={"#e4ecf4"} px={10} borderRadius={"5px"}>
                            JHHS Merch
                        </Box>
                    </Box>
                    <Box display={"flex"} gap={20} alignItems={"center"}>
                        <Text>Small</Text>
                        <Text>x1</Text>
                        <Text>$24.00</Text>
                    </Box>
                </Box>
                <Box display={"flex"} width={"100%"} justifyContent={"space-between"} flexWrap={"wrap"}>
                    <Box display={"flex"} alignItems={"center"} gap={10}>
                        <Image width={50} height={50} objectFit={"cover"} borderRadius={"10px"} backgroundColor={"lightgray"} src={"https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"} alt="image" />
                        <Text fontWeight={"bold"} fontSize={"20px"}>Item #1</Text>
                        <Box backgroundColor={"#e4ecf4"} px={10} borderRadius={"5px"}>
                            JHHS Merch
                        </Box>
                    </Box>
                    <Box display={"flex"} gap={20} alignItems={"center"}>
                    <Box display={"flex"} gap={20} alignItems={"center"}>
                        <Text>Small</Text>
                        <Text>x1</Text>
                        <Text>$24.00</Text>
                    </Box>
                    </Box>
                    </Box>
                    <Divider border={"1px solid lightgray"}/>
                    <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
                        <Text fontWeight={"bold"}>Total</Text>
                        <Box display={"flex"} gap={20}>
                            <Text fontWeight={"bold"}>x2</Text>
                            <Text fontWeight={"bold"}>$25.00</Text>
                        </Box>
                    </Box> 
                    <Box display={"flex"} flexWrap={"wrap"} width={"100%"} gap={20}>
                        <Button backgroundColor={"#e54545"} color={"white"} fontWeight={"bold"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke-width="1.5" stroke="currentColor" style={{width: "30px", height: "25px"}}>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
                            </svg>
                            Send Message
                        </Button>
                        <Button backgroundColor={"#3ca46c"} color={"white"} fontWeight={"bold"} display={"flex"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{width: "30px", height: "25px"}} stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            Complete
                        </Button>
                        <Button backgroundColor={"#459ce4"} color={"white"} fontWeight={"bold"} display={"flex"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{width: "30px", height: "25px"}} stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
export default OrderBox
