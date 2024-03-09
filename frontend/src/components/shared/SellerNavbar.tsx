import * as React from "react"
import "./Navbar.css"
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SellerNavbar: React.FC<{}> = (props) => {
    const navigate = useNavigate();

    return (
        <div className="navbar">
            <h3>Hersey Spiritwear (Seller)</h3>
            <div className="spacer"></div>
            <Button
                colorScheme="blue"
                variant="outline"
                onClick={() => {
                    navigate("/")

                }}
                fontSize={"sm"}
            >
                For Buyers
            </Button>
        </div >
    );
}
export default SellerNavbar