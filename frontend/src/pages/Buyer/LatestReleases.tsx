import React, { useState } from "react";
import { Item } from "../../components/shared/types/Item";
import SearchResultItem from "../../components/shared/SearchResultItem";
import { PLACEHOLDER_ITEMS } from "../../constants/placeholder-data";

const LatestReleases: React.FC = () => {
    const [items] = useState<Item[]>(PLACEHOLDER_ITEMS);

    return (
        <div>
            <h2>Latest Releases</h2>
            {items.map((item) => (
                <SearchResultItem
                    key={`search-result-item-${item._id}`}
                    item={item}
                />
            ))}
        </div>
    );
}

export default LatestReleases;
