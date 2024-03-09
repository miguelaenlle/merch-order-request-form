import * as React from "react"
import { Button } from "@chakra-ui/react";
import "./Navbar.css"
import { useNavigate } from "react-router-dom";
const BuyerNavbar: React.FC<{}> = (props) => {
    const navigate = useNavigate();

    return (
        <div className="navbar">
            <h3 className="clickableText" onClick={() => {
                navigate("/")
            }}>Hersey Spiritwear (Buyer)</h3>
            <div className="spacer"></div>
            <Button
                colorScheme="blue"
                variant="ghost"
                onClick={() => {
                    // TODO: This should go to seller lgoin instead
                    navigate("/my-orders")

                }}
                fontSize={"sm"}
            >
                Orders
            </Button>
            <Button
                colorScheme="blue"
                variant="ghost"
                onClick={() => {
                    // TODO: This should go to seller lgoin instead
                    navigate("/sample-components")

                }}
                fontSize={"sm"}
            >
                Sample Components
            </Button>
            <Button
                colorScheme="blue"
                variant="outline"
                onClick={() => {
                    // TODO: This should go to seller lgoin instead
                    navigate("/seller-dashboard")

                }}
                fontSize={"sm"}
            >
                For Sellers
            </Button>
        </div>
    );
}
export default BuyerNavbar