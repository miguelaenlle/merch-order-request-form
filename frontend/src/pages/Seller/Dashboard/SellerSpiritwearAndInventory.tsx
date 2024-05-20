
import { useContext, useEffect, useState } from "react";
import { Item } from "../../../types/Item";
import NewSpiritwearItem from "./NewSpiritwearItem";
import "./styles.css";
import SpiritwearItem from "./SpiritwearItem";
import { useAPIHook } from "../../../components/shared/hooks/use-api-hook.ts";
import EditSpiritwearItem from "../../../modals/Seller/EditSpiritwearItem.tsx";
import { AuthContext } from "../../../components/shared/context/AuthContext.tsx";

const SellerSpiritwearAndInventory = () => {
    const apiHook = useAPIHook();
    const authContext = useContext(AuthContext);
    const [spiritwearItems, setSpiritwearItems] = useState<Item[]>([

    ]);

    const handleLoad = async () => {
        try {
            if (!authContext?.token) {
                return;
            }
            const response = await apiHook.get(
                'http://localhost:3000/api/items/my-items/',
                authContext?.token
            );
            console.log(response)
            setSpiritwearItems(response as Item[]);
        } catch (error) {
            console.log('Server error', error);
        }
    }

    useEffect(() => {
        handleLoad();
    }, [authContext?.token])

    return (
        <div className="subcontent">
            <h3 className="header">My Spiritwear & Inventory</h3>
            <div className="createNewItem">
                <NewSpiritwearItem retrieveSpiritwearItems={handleLoad} />
            </div>
            <div className="grid">
                {spiritwearItems.map((item) => (
                    <SpiritwearItem
                        key={`spiritwear-${item._id}`}
                        item={item}
                        refreshItems={handleLoad}
                        modalToOpen="edit"
                    />
                ))}
            </div>
        </div>
    );
};

export default SellerSpiritwearAndInventory;
