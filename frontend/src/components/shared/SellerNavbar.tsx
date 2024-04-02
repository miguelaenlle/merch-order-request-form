import * as React from "react"
import "./Navbar.css"
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { JHHS_LOGO} from "../../constants/placeholder-data.ts";
import {FaStore, FaUserCircle} from "react-icons/fa";


const SellerNavbar: React.FC<{}> = (props) => {
    const navigate = useNavigate();

    return (
        <div className="navbar">

            <img src={JHHS_LOGO} alt="Husky Icon" className="sellerImage"/>
            <strong>Hersey Spiritwear</strong>

            <div className="spacer"></div>
            <Button
                colorScheme="gray"
                 variant="ghost"
                marginRight={10}
                onClick={() => {
                    navigate("/")

                }}
                fontSize={"sm"}
            >
                <FaStore style={{ marginRight: "5px" }} /> For Buyers
            </Button>

            <FaUserCircle style={{ marginRight: "5px" }} /> John Doe

        </div>
    );
}
export default SellerNavbar