import * as React from "react";
import BuyerNavbar from "../../components/shared/BuyerNavbar";
import SearchFilters from "./SearchFilters";
import { PLACEHOLDER_ITEMS } from "../../constants/placeholder-data";
import SearchResultItem from "../../components/shared/SearchResultItem";

const Search: React.FC = () => {
    return (
        <div>
            <BuyerNavbar />
            <div className="content">
                <h3 className="header">Search: T-Shirt</h3>
                <SearchFilters />
                <div className="searchResults">
                    {PLACEHOLDER_ITEMS.map((item) => (
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

export default Search;
