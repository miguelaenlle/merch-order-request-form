import * as React from "react"
import "./Navbar.css"
import { Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { JHHS_LOGO } from "../../constants/placeholder-data.ts";
import { FaStore, FaUserCircle } from "react-icons/fa";
import { AuthContext } from "./context/AuthContext.tsx";
import { GrLogout } from "react-icons/gr";


const SellerNavbar: React.FC<{}> = (props) => {
    const navigate = useNavigate();
    const toast = useToast();
    const authContext = React.useContext(AuthContext);

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
                marginRight={10}
                onClick={() => {
                    navigate("/")

                }}
                fontSize={"sm"}
            >
                <FaStore style={{ marginRight: "5px" }} /> For Buyers
            </Button>


            {!authContext?.isLoggedIn ? (
                <></>
            ) : (
                <Button
                    colorScheme="gray"
                    variant="ghost"
                    onClick={() => {
                        authContext?.logout()
                        toast({
                            title: "Logged out",
                            description: "You have been logged out",
                            status: "success",
                            duration: 3000,
                            isClosable: true,
                        })
                        navigate("/");
                    }}
                    fontSize={"sm"}
                >
                    <GrLogout style={{ marginRight: "5px" }} /> Log Out
                </Button>
            )}

        </div >
    );
}
export default SellerNavbar