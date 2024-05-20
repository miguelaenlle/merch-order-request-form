import * as React from "react"
import { InventoryItem } from "../../types/InventoryItem";
const InventorySpiritwearItem: React.FC<{
    inventoryItem: InventoryItem;
}> = (props) => {

    const [inventoryChange, setInventoryChange] = React.useState(0);
    const [price, setPrice] = React.useState(0);

    React.useEffect(() => {
        setPrice(props.inventoryItem.price);
    }, [props.inventoryItem._id])

    return (
        <tr
            style={{ border: '1px solid #ccc' }}
        >
            <td>{row.size}</td>
            <td>
                <input
                    style={{ width: "120px" }}
                    type="number"
                    value={inventoryChange}
                    onChange={(e) => setInventoryChange(e.target.value)}
                    placeholder="2"
                />
            </td>
            <td>{props.inventoryItem.amount}</td>
            <td>
                <input
                    style={{ width: "120px" }}
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                />
            </td>
        </tr>
    );
}
export default InventorySpiritwearItem