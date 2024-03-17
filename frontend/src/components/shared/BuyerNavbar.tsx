import * as React from "react"
import { Button } from "@chakra-ui/react";
import "./Navbar.css"
import { useNavigate } from "react-router-dom";
import huskyIcon from '../../assets/huskyIcon.png';
import { FaBox, FaStore } from "react-icons/fa";
const BuyerNavbar: React.FC<{}> = (props) => {
    const navigate = useNavigate();

    return (
        <div className="navbar">
            <h3 className="clickableText" onClick={() => {
                navigate("/")
            }}>
                <img src={huskyIcon} alt="Husky Icon" className="image"/>
                <strong>Hersey Spiritwear</strong>
            </h3>
            <div className="spacer"></div>
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
                <div className="orderCount">1</div>
            </Button>
            <Button
                colorScheme="gray"
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
                colorScheme="gray"
                 variant="ghost"
                onClick={() => {
                    // TODO: This should go to seller lgoin instead
                    navigate("/seller-dashboard")

                }}
                fontSize={"sm"}
            >
                <FaStore style={{ marginRight: "5px" }} /> For Sellers
            </Button>
        </div>
    );
}
export default BuyerNavbar