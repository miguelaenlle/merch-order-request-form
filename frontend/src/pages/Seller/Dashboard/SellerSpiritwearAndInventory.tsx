import * as React from "react"
import NewSpiritwearItem from "./NewSpiritwearItem";
const SellerSpiritwearAndInventory: React.FC<{}> = (props) => {
    return (
        <div className="subcontent">
            <h3 className="header">My Spiritwear and Inventory</h3>
            <NewSpiritwearItem />
        </div>
    );
}
export default SellerSpiritwearAndInventory