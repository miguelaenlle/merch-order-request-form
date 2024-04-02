import * as React from "react"
import { Item } from "../../../types/Item";
import { JHHS_SWEATER } from "./imagePaths";
import { Tag } from "@chakra-ui/react";
const SpiritwearItem: React.FC<{
    item: Item;
}> = (props) => {
    return (
        <div>
            <div>
                <img className="itemImage" src={JHHS_SWEATER} alt="Husky Sweater" />
            </div>
            <div className="itemDetails" style={{ textAlign: "left" }}>
                <h4 className="itemName">{props.item.name}</h4>
                <p className="cost"> ${props.item.price} </p>
                <Tag size="md" variant="solid" colorScheme="gray">
                    {props.item.groupIdName}
                </Tag>
            </div>
        </div>
    );
}
export default SpiritwearItem