import * as React from "react"
import { Button, useToast } from "@chakra-ui/react";
import "./Navbar.css"
import { useNavigate } from "react-router-dom";
import { FaBox, FaStore } from "react-icons/fa";
import { JHHS_LOGO } from "../../constants/placeholder-data.ts";
import { GrLogin, GrLogout } from "react-icons/gr";
import SignupComponent from "../../pages/Buyer/SignupComponent.tsx";
import LoginComponent from "../../pages/Buyer/LoginComponent.tsx";
import { AuthContext } from "./context/AuthContext.tsx";
import { useAPIHook } from "./hooks/use-api-hook.ts";

const BuyerNavbar: React.FC<{}> = (props) => {
    const navigate = useNavigate();
    const toast = useToast();
    const [numOrders, setNumOrders] = React.useState<number>(0);
    const authContext = React.useContext(AuthContext);
    const apiHook = useAPIHook();

    const handleLoadNumOrders = async () => {
        if (!authContext?.token) {
            return;
        }

        try {
            const response = await apiHook.get(
                'http://localhost:3000/api/orders/my-orders?status=pending',
                authContext?.token
            );

            console.log('response', response);

            setNumOrders(response.orders.length);
        } catch {
            toast({
                title: "Error",
                description: "Failed to load orders",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }

    React.useEffect(() => {
        if (authContext?.userType === "buyer") {
            handleLoadNumOrders();
        }
    }, [authContext?.token, authContext?.userType])


    return (
        <div className="navbar">
            <h3 className="clickableText" onClick={() => {
                navigate("/")
            }}>
                <img src={JHHS_LOGO} alt="Husky Icon" className="image" />
                <strong>Hersey Spiritwear</strong>
            </h3>
            <div className="spacer"></div>
            {authContext?.userType === "buyer" && (
                <Button
                    colorScheme="gray"
                    variant="ghost"
                    onClick={() => {
                        // TODO: This should go to seller lgoin instead
                        navigate("/my-orders")

                    }}
                    fontSize={"sm"}
                >
                    <FaBox style={{ marginRight: "5px" }} /> Orders
                    <div className="orderCount">{numOrders}</div>
                </Button>
            )}
            {/* <Button
                colorScheme="gray"
                variant="ghost"
                onClick={() => {
                    // TODO: This should go to seller lgoin instead
                    navigate("/sample-components")

                }}
                fontSize={"sm"}
            >
                Sample Components
            </Button> */}
            {(!authContext?.isLoggedIn || authContext?.userType === "seller") && (
                <Button
                    colorScheme="gray"
                    variant="ghost"
                    onClick={() => {
                        navigate("/seller-dashboard")
                        // Navigate to seller login

                    }}
                    fontSize={"sm"}
                >
                    <FaStore style={{ marginRight: "5px" }} /> Seller Dashboard
                </Button>
            )}

            {!authContext?.isLoggedIn ? (
                <Button
                    colorScheme="gray"
                    variant="ghost"
                    onClick={() => {
                        authContext?.handleOpenAuthModal("login")
                    }}
                    fontSize={"sm"}
                >
                    <GrLogin style={{ marginRight: "5px" }} /> Sign In
                </Button>
            ) : (
                <Button
                    colorScheme="gray"
                    variant="ghost"
                    onClick={() => {
                        navigate("/")
                        authContext?.logout()
                        toast({
                            title: "Logged out",
                            description: "You have been logged out",
                            status: "success",
                            duration: 3000,
                            isClosable: true,
                        })
                    }}
                    fontSize={"sm"}
                >
                    <GrLogout style={{ marginRight: "5px" }} /> Log Out
                </Button>
            )}
            <SignupComponent
                transparentButton
                isOpen={authContext?.openAuthModal === "signup"}
                toBuyerLogin={() => {
                    authContext?.handleOpenAuthModal("login")
                }}
                onClose={() => {
                    authContext?.handleOpenAuthModal(null)
                }}
            />
            <LoginComponent
                transparentButton
                isOpen={authContext?.openAuthModal === "login"}
                toBuyerSignup={() => {
                    authContext?.handleOpenAuthModal("signup")
                }}
                onClose={() => {
                    authContext?.handleOpenAuthModal(null)
                }}
            />
        </div>
    );
}
export default BuyerNavbar