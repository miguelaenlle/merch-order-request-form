

import React from "react";
import SearchResultItem from "../../components/shared/SearchResultItem";
import { Item } from "../../components/shared/types/Item";
import { PLACEHOLDER_ITEMS } from "../../constants/placeholder-data";
import "./LatestReleases.css";

const LatestReleases: React.FC = () => {
    const items: Item[] = PLACEHOLDER_ITEMS;

    return (
        <div className="latest-releases-container">
            <h1 className="header">Latest Releases</h1>
            <div className="grid-container">
                {items.map((item) => (
                    <SearchResultItem
                        key={`search-result-item-${item._id}`}
                        item={item}
                    />
                ))}
            </div>
        </div>
    );
}

export default LatestReleases;
