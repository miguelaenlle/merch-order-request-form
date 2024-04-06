import * as React from "react"
import Navbar from "../../../components/shared/SellerNavbar"
import "./Dashboard.css"
import SellerOrders from "./SellerOrders";
import SellerGroups from "./SellerGroups";
import SellerSpiritwearAndInventory from "./SellerSpiritwearAndInventory";
const Dashboard: React.FC = () => {
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