

import React from "react";
import { Item } from "./types/Item";
import SpiritwearItem from "../../pages/Seller/Dashboard/SpiritwearItem";

const SearchResultItem: React.FC<{
    item: Item;
}> = (props) => {
    return (
        <SpiritwearItem item={props.item} modalToOpen="view" />
    );
}
export default SearchResultItem;
