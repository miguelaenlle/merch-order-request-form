import * as React from "react";
import Navbar from "../../../components/shared/SellerNavbar";
import "./Dashboard.css";
import SellerGroups from "./SellerGroups";
import SellerOrders from "./SellerOrders";
import SellerSpiritwearAndInventory from "./SellerSpiritwearAndInventory";
const Dashboard: React.FC<{}> = (props) => {
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