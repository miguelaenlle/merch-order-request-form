import * as React from "react"
import { Item } from "./types/Item";
const SearchResultItem: React.FC<{
    item: Item;
}> = (props) => {
    return (
        <div>
            <p>{props.item.name}</p>
        </div>
    );
}
export default SearchResultItem