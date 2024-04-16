import * as React from "react"
import { Button } from "@chakra-ui/react";
import "./Navbar.css"
import { useNavigate } from "react-router-dom";
import { FaBox, FaStore } from "react-icons/fa";
import { JHHS_LOGO } from "../../constants/placeholder-data.ts";

const BuyerNavbar: React.FC<{}> = (props) => {
    const navigate = useNavigate();


    const [numOrders, setNumOrders] = React.useState<number>(0);

    const handleLoad = async () => {

    }

    React.useEffect(() => {
        handleLoad()
    }, [])

    return (
        <div className="navbar">
            <h3 className="clickableText" onClick={() => {
                navigate("/")
            }}>
                <img src={JHHS_LOGO} alt="Husky Icon" className="image" />
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
                <div className="orderCount">{numOrders}</div>
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