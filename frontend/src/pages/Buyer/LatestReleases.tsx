import * as React from "react"
import { Item } from "../../components/shared/types/Item";
import SearchResultItem from "../../components/shared/SearchResultItem";
import { PLACEHOLDER_ITEMS } from "../../constants/placeholder-data";

const LatestReleases: React.FC<{}> = (props) => {
    const [items, setItems] = React.useState<Item[]>(PLACEHOLDER_ITEMS);

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