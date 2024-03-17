import * as React from "react"
import BuyerNavbar from "../../components/shared/BuyerNavbar"
import SearchFilters from "./SearchFilters";
import { PLACEHOLDER_ITEMS } from "../../constants/placeholder-data";
import { Item } from "../../components/shared/types/Item";
import SearchResultItem from "../../components/shared/SearchResultItem";
const Search: React.FC<{}> = (props) => {
    const [items, setItems] = React.useState<Item[]>(PLACEHOLDER_ITEMS);

    return (
        <div>
            <BuyerNavbar />
            <div className="content">
                <h3 className="header">Search: [ITEM]</h3>
                <SearchFilters />
                <div className="searchResults">
                    {items.map((item) => (
                        <SearchResultItem
                            key={`search-result-item-${item._id}`}
                            item={item}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Search