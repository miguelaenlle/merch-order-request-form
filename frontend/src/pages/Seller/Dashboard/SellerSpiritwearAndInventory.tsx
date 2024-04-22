
import { useEffect, useState } from "react";
import { Item } from "../../../types/Item";
import NewSpiritwearItem from "./NewSpiritwearItem";
import "./styles.css";
import SpiritwearItem from "./SpiritwearItem";
import { useAPIHook } from "../../../components/shared/hooks/use-api-hook.ts";
import EditSpiritwearItem from "../../../modals/Seller/EditSpiritwearItem.tsx";

const SellerSpiritwearAndInventory = () => {
    const apiHook = useAPIHook();
    const [spiritwearItems, setSpiritwearItems] = useState<Item[]>([

    ]);

    const handleLoad = async () => {
        const sellerToken = await apiHook.generateSellerToken();
        try {
            const response = await apiHook.get(
                'http://localhost:3000/api/items/my-items/',
                sellerToken);
            console.log(response)
            setSpiritwearItems(response as Item[]);
        } catch (error) {
            console.log('Server error', error);
        }
    }

    useEffect(() => {
        handleLoad();
    }, [])

    return (
        <div className="subcontent">
            <h3 className="header">My Spiritwear & Inventory</h3>
            <div className="createNewItem">
                <NewSpiritwearItem />
                <EditSpiritwearItem />
            </div>
            <div className="grid">
                {spiritwearItems.map((item) => (
                    <SpiritwearItem
                        key={`spiritwear-${item._id}`}
                        item={item}
                    />
                ))}
            </div>
        </div>
    );
};

export default SellerSpiritwearAndInventory;
