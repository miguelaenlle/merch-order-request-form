import * as React from "react";
import Navbar from "../../../components/shared/SellerNavbar";
import "./Dashboard.css";
import SellerGroups from "./SellerGroups";
import SellerOrders from "./SellerOrders";
import SellerSpiritwearAndInventory from "./SellerSpiritwearAndInventory";
import { AuthContext } from "../../../components/shared/context/AuthContext";
import { useNavigate } from "react-router-dom";
const Dashboard: React.FC<{}> = (props) => {
    const authContext = React.useContext(AuthContext);
    const navigate = useNavigate();

    const handleLoadUserStatus = () => {
        if (!authContext?.isLoggedIn && authContext?.loaded) {
            navigate("/seller-login");
        }
    }

    React.useEffect(() => {
        handleLoadUserStatus();
    }, [authContext?.loaded])

    return (
        <div className="dashboard">
            <Navbar />
            <div className="content">
                <SellerOrders />
                <SellerGroups />
                <SellerSpiritwearAndInventory />
            </div>
        </div>
    );
}
export default Dashboard