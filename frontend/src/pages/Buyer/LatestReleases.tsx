

import React, { useState } from "react";
import SearchResultItem from "../../components/shared/SearchResultItem";
import { Item } from "../../components/shared/types/Item";
import { PLACEHOLDER_ITEMS } from "../../constants/placeholder-data";
import "./LatestReleases.css";
import { useAPIHook } from "../../components/shared/hooks/use-api-hook.ts";
import { useEffect } from "react";
import { Spinner } from "@chakra-ui/react";

const LatestReleases: React.FC<{}> = (props) => {
    const apiHook = useAPIHook();
    const [items, setItems] = React.useState<Item[]>([]);
    const [loading, setLoading] = useState(false);

    const handleLoad = async () => {
        setLoading(true);
        try {
            const response = await apiHook.get(
                'http://localhost:3000/api/items/search'
            );
            setItems(response.findItems as Item[]);
        } catch (error) {
            console.log('Server error', error);
        }
        setLoading(false);
    }

    useEffect(() => {
        handleLoad();
    }, [])


    return (
        <div className="latest-releases-container">
            <h1 className="largeHeader">Latest Releases</h1>
            <div className="grid-container">
                {loading && (
                    <Spinner />
                )}
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
