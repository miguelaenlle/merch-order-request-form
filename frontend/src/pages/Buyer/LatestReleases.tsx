

import React, { useState } from "react";
import SearchResultItem from "../../components/shared/SearchResultItem";
import { Item } from "../../components/shared/types/Item";
import { PLACEHOLDER_ITEMS } from "../../constants/placeholder-data";

const LatestReleases: React.FC = () => {
    const [items] = useState<Item[]>(PLACEHOLDER_ITEMS);

    return (
        <div>
            <h1>Latest Releases</h1>
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
