import * as React from "react";
import { Item } from "./types/Item";
import SellerSpiritwearAndInventory from "../../../pages/Seller/Dashboard/SellerSpiritwearAndInventory";
import { JHHS_SWEATER } from "./imagePaths";

const SearchResultItem: React.FC<{
    item: Item;
}> = (props) => {
    return (
        <div>
            <SellerSpiritwearAndInventory />
            <div>
                <img className="itemImage" src={JHHS_SWEATER} alt="Husky Sweater" />
            </div>
            <div className="itemDetails" style={{ textAlign: "left" }}>
                <h4 className="itemName">{props.item.name}</h4>
                <p className="cost">{props.item.price}</p>
                <Tag size="md" variant="solid" colorScheme="gray">
                    {props.item.schoolName}
                </Tag>
            </div>
        </div>
    );
}

export default SearchResultItem;
