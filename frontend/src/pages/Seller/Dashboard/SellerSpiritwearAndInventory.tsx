
import { useEffect, useState } from "react";
import { Item } from "../../../types/Item";
import NewSpiritwearItem from "./NewSpiritwearItem";
import "./styles.css";
import SpiritwearItem from "./SpiritwearItem";
import { useAPIHook } from "../../../components/shared/hooks/use-api-hook.ts";

const SellerSpiritwearAndInventory = () => {
    const apiHook = useAPIHook();
    const [spiritwearItems, setSpiritwearItems] = useState<Item[]>([
        {
            _id: "1",
            name: "(DUMMY) Husky Sweater",
            price: 25,
            groupIdName: "JHHS"
        },
        {
            _id: "2",
            name: "(DUMMY) Husky T-Shirt",
            price: 15,
            groupIdName: "JHHS"
        },
        {
            _id: "3",
            name: " (DUMMY) Husky Hoodie",
            price: 35,
            groupIdName: "JHHS"
        } // Remove the placeholder data when you confirm this works
    ]);

    const handleLoad = async () => {
        const sellerToken = await apiHook.generateSellerToken();
        try {
            const response = await apiHook.get(
                'https://localhost:3000/api/my-items/',
                sellerToken);
            setSpiritwearItems(response.data);
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
