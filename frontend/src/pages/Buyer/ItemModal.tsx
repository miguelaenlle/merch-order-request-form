import * as React from "react"
import CustomModal from "../../components/shared/CustomModal";
import { Select, Button, Input, Text, VStack, useToast, Textarea, Image } from "@chakra-ui/react";
import { Item } from "../../types/Item";
import { AuthContext } from "../../components/shared/context/AuthContext";
import { useAPIHook } from "../../components/shared/hooks/use-api-hook";
import { InventoryItem } from "../../types/InventoryItem";
import { useLoadErrorHook } from "../../components/shared/hooks/use-load-error-hook";
import LoadError from "../../components/shared/LoadError";
import { useNavigate } from "react-router-dom";
import { JHHS_SWEATER } from "../../constants/placeholder-data";

const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const ItemModal: React.FC<{
    item: Item;
    isOpen: boolean;
    onClose: () => void;
    itemId: string;
}> = (props) => {

    const navigate = useNavigate();

    const [inputsExpanded, setInputsExpanded] = React.useState(false);
    const [myName, setMyName] = React.useState("");
    const [myEmail, setMyEmail] = React.useState("");

    const [mySchool, setMySchool] = React.useState("");
    const [myNotes, setMyNotes] = React.useState("");

    const [myCustomerType, setMyCustomerType] = React.useState("");
    const [numShirts, setNumShirts] = React.useState<number | undefined>(undefined);
    const [selectedShirtSize, setSelectedShirtSize] = React.useState<string>("" as string);
    const [inventoryItems, setInventoryItems] = React.useState<InventoryItem[] | undefined>();
    const [availableSizes, setAvailableSizes] = React.useState<string[]>([]);

    const displayedPrice = React.useMemo(() => {
        if (props.isOpen && selectedShirtSize) {
            if (inventoryItems) {
                const inventoryItem = inventoryItems.find((item) => item.size === selectedShirtSize);
                if (inventoryItem && inventoryItem.price) {

                    console.log('inventoryItem', inventoryItem);

                    return inventoryItem.price.toFixed(2);
                }
            }
        }
        if (props.item.price) {
            return props.item.price.toFixed(2);
        }
    }, [inventoryItems, props.isOpen, selectedShirtSize])


    const loadErrorHook = useLoadErrorHook();

    const toast = useToast();

    const authContext = React.useContext(AuthContext);

    const apiHook = useAPIHook();

    const handleExpandInputs = () => {
        setInputsExpanded(true);
    }

    const handleCloseInputs = () => {
        setInputsExpanded(false);
    }

    const handleRedirectToLogin = () => {
        authContext?.handleOpenAuthModal("signup");
        props.onClose();
    }

    const handleLoadAvailableSizes = async () => {
        try {
            const response = await apiHook.get(`http://localhost:3000/api/inventory-items?itemId=${props.itemId}&minimumAmount=1`)
            setInventoryItems(response.inventoryItems as InventoryItem[]);

            // console.log('response.inventoryItems', response.inventoryItems);

            setAvailableSizes(response.inventoryItems.map((item: InventoryItem) => item.size))
        } catch (error) {
            console.error("Size error", error);
            toast({
                title: "Error",
                description: "Failed to load available sizes; please reload",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }

    React.useEffect(() => {
        if (props.isOpen) {
            handleLoadAvailableSizes();
        }
    }, [props.isOpen])


    const handleOrder = async () => {
        // validate that all fields are filled. Add to the error message if any is not filled.

        if (!authContext?.token) {
            toast({
                title: "Error",
                description: "You must be logged in to place an order",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }
        let errorMessage = "";

        if (!myName) {
            errorMessage += "Name is required. ";
        }

        if (!myEmail) {
            errorMessage += "Email is required. ";
        } else if (!validateEmail(myEmail)) {
            errorMessage += "Email is not valid. ";
        }

        if (!myCustomerType) {
            errorMessage += "Customer Type is required. ";
        }

        if (!numShirts) {
            errorMessage += "Number of shirts is required. (Previous page)";
        }

        if (!selectedShirtSize) {
            errorMessage += "Shirt size is required. (Previous page)";
        }

        if (!mySchool) {
            errorMessage += "School is required. ";
        }

        if (!myNotes) {
            errorMessage += "Notes are required. ";
        }

        loadErrorHook.handleError(errorMessage);

        if (!errorMessage) {
            try {
                const response = await apiHook.post(
                    `http://localhost:3000/api/orders`,
                    {
                        customerName: myName,
                        customerEmail: myEmail,
                        customerType: myCustomerType,
                        school: mySchool, // TODO: Add
                        notes: myNotes, // TODO: Add,
                        itemOwnerId: props.item.itemOwnerId,
                        orderedItems: [
                            {
                                itemId: props.itemId,
                                size: selectedShirtSize,
                                numOrdered: numShirts
                            }
                        ]
                    },
                    authContext?.token
                )
                toast({
                    title: "Success",
                    description: "Order placed successfully!",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                navigate("/my-orders")

            } catch {
                toast({
                    title: "Error",
                    description: "Failed to place order; please try again",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }

        }
    }


    const url = props.item.filename ? `http://localhost:3000/api/items/${props.item._id}/image` : JHHS_SWEATER


    return (
        <CustomModal
            buttonText="Single Item View"
            isOpen={props.isOpen}
            onClose={props.onClose}
            content={<div className="modalContent">

                <div className="img">

                    <Image width="100%" height={"100%"} objectFit={"cover"} borderRadius={"10px"} className="itemImage" src={url}
                        border="3px solid #E2E8F0" />
                </div>

                <div className="container">
                    <strong className="strong">{props.item.name}</strong>


                    {props.item.groupIdName && (
                        <p style={{ marginTop: '10px', backgroundColor: '#d3e0e8', padding: '5px', borderRadius: '6px', width: 'fit-content', fontSize: 'small' }}>{props.item.groupIdName}</p>
                    )}


                    <p style={{ paddingTop: '15px', paddingBottom: '15px' }}>Sold by <strong>{props.item.itemOwnerName || "Anonymous User"}</strong> at {props.item.pickupLocation} - {props.item.pickupTime}</p>

                    <p>{props.item.description}</p>

                    <strong style={{ fontSize: 'xx-large' }}>${displayedPrice}/ea</strong>

                    {(!authContext?.isLoggedIn || authContext.userType === "seller") ? (
                        <>
                            <VStack py={6} bg="gray.100" px={6} borderRadius={10} mt={5}>
                                {authContext?.userType === "seller" ? (
                                    <Text fontWeight={600} mb={0} w={"100%"}>
                                        You cannot place an order as a seller. Please create an alternate account to place an order.
                                    </Text>
                                ) : (
                                    <>
                                        <Text fontWeight={600} mb={0} w={"100%"}>
                                            An account is required to place a merch order.
                                        </Text>
                                        <Button onClick={handleRedirectToLogin} colorScheme='blue' width='full'>Create an account now</Button>
                                    </>

                                )}
                            </VStack>
                        </>

                    ) : (

                        <>
                            {!inputsExpanded && (
                                <>
                                    <div style={{ marginTop: '20px', width: '350px' }}>
                                        <Select value={selectedShirtSize} placeholder='Size' width='full' onChange={(e) => {
                                            setSelectedShirtSize(e.target.value)
                                        }}>
                                            {availableSizes.map((size) => {
                                                return <option key={size} value={size}>{size}</option>
                                            })}
                                        </Select>
                                    </div>
                                    <div style={{ marginTop: '10px', width: '350px' }}>
                                        <Input
                                            value={numShirts}
                                            placeholder="Number of Shirts"
                                            size="md"
                                            onChange={(e) => {
                                                setNumShirts(parseFloat(e.target.value) || undefined)
                                            }}
                                            min={0}
                                        />
                                    </div>
                                </>
                            )}

                            {inputsExpanded && (
                                <>
                                    <div style={{ marginTop: '20px', width: '350px' }}>
                                        <Input
                                            value={myName}
                                            placeholder="Name"
                                            size="md"
                                            onChange={(e) => {
                                                setMyName(e.target.value)
                                            }}
                                        />
                                    </div>

                                    <div style={{ marginTop: '10px', width: '350px' }}>
                                        <Input
                                            value={myEmail}
                                            placeholder="Email"
                                            size="md"
                                            onChange={(e) => {
                                                setMyEmail(e.target.value)
                                            }}
                                        />
                                    </div>

                                    <div style={{ marginTop: '10px', width: '350px' }}>
                                        <Input
                                            value={mySchool}
                                            placeholder="School"
                                            size="md"
                                            onChange={(e) => {
                                                setMySchool(e.target.value)
                                            }}
                                        />
                                    </div>

                                    <div style={{ marginTop: '10px', width: '350px' }}>
                                        <Textarea
                                            value={myNotes}
                                            placeholder="Notes"
                                            size="md"
                                            onChange={(e) => {
                                                setMyNotes(e.target.value)
                                            }}
                                        />
                                    </div>


                                    <div style={{ marginTop: '10px', width: '350px' }}>
                                        <Select value={myCustomerType} placeholder='Customer Type' width='full' onChange={(e) => {
                                            setMyCustomerType(e.target.value)
                                        }}>
                                            <option value='Student'>Student</option>
                                            <option value='Alumni'>Alumni</option>
                                            <option value='Parent'>Parent</option>
                                            <option value='Teacher'>Teacher</option>
                                        </Select>
                                    </div>
                                </>
                            )}

                            {inputsExpanded ? (
                                <>
                                    <div style={{ "display": "flex", width: '350px', gap: "5px" }}>
                                        <Button onClick={handleCloseInputs} colorScheme='blue' variant="outline" width='full' marginTop='10px'>Back</Button>
                                        <Button onClick={handleOrder} colorScheme='blue' width='full' marginTop='10px' isDisabled={
                                            !myName ||
                                            !myEmail ||
                                            !myCustomerType ||
                                            !numShirts ||
                                            !selectedShirtSize ||
                                            !mySchool ||
                                            !myNotes
                                        }>Place Order</Button>
                                    </div>
                                    <LoadError
                                        error={loadErrorHook.error}
                                        loading={loadErrorHook.loading}
                                    />

                                </>
                            ) : (
                                <div style={{ width: '350px' }}>
                                    <Button
                                        onClick={handleExpandInputs}
                                        colorScheme='blue'
                                        width='full'
                                        marginTop='10px'
                                        isDisabled={
                                            !numShirts ||
                                            !selectedShirtSize
                                        }

                                    >Continue</Button>
                                </div>
                            )}
                        </>
                    )}

                </div>

            </div>}
            onAction={() => {
            }}
            disableDefaultButtons
            extraLong
            transparentButton
        />
    );
}
export default ItemModal