import * as React from "react";
import SearchResultItem from "../../components/shared/SearchResultItem";
import { Item } from "../../components/shared/types/Item";
import { PLACEHOLDER_ITEMS } from "../../constants/placeholder-data";
import {useAPIHook} from "../../components/shared/hooks/use-api-hook.ts";
import {useEffect} from "react";

const LatestReleases: React.FC<{}> = (props) => {
    const apiHook = useAPIHook();
    const [items, setItems] = React.useState<Item[]>(PLACEHOLDER_ITEMS);

    const handleLoad = async () => {
        const buyerToken = await apiHook.generateBuyerToken();
        try {
            const response = await apiHook.get(
                'http://localhost:3000/api/items/',
                buyerToken);
            console.log(response.items)
            setItems(response.items as Item[]);
        } catch (error) {
            console.log('Server error', error);
        }
    }

    useEffect(() => {
        handleLoad();
    }, [])


    return (
        <div>
            {items.map((item) => (
                <SearchResultItem
                    key={`search-result-item-${item._id}`}
                    item={item}
                />
            ))}
        </div>
    );
}
export default LatestReleases