import * as React from "react"
import { Item } from "../../../types/Item";
import { JHHS_SWEATER } from "./imagePaths";
import { Image, Tag } from "@chakra-ui/react";
import EditSpiritwearItem from "../../../modals/Seller/EditSpiritwearItem";
import ItemModal from "../../Buyer/ItemModal";
const SpiritwearItem: React.FC<{
    item: Item;
    modalToOpen: "edit" | "view";
    refreshItems?: () => void;
}> = (props) => {
    const [openModal, setOpenModal] = React.useState<"edit" | "view" | null>(null);

    const onClick = () => {
        setOpenModal(props.modalToOpen);
    }
    const onClose = () => {
        if (openModal === "edit" && props.refreshItems) {
            props.refreshItems();
        }
        setOpenModal(null);
    };

    React.useEffect(() => {
        console.log("Item", props.item);
    }, [props.item._id])


    const url = props.item.filename ? `http://localhost:3000/api/items/${props.item._id}/image` : JHHS_SWEATER

    return (
        <div className="clickable" onClick={onClick}>
            <div>
                <Image height={"250px"} objectFit={"cover"} borderRadius={"10px"} className="itemImage" src={url}
                    border="3px solid #E2E8F0" onError="this.src='../resources/images/none.jpg'" />
            </div>
            <div className="itemDetails" style={{ textAlign: "left" }}>
                <h4 className="itemName">{props.item.name}</h4>
                <p className="cost"> ${props.item.price} </p>
                <Tag size="md" variant="solid" colorScheme="gray">
                    {props.item.groupIdName}
                </Tag>
            </div>
            <EditSpiritwearItem item={props.item} isOpen={openModal === "edit"} onClose={onClose} />
            <ItemModal
                item={props.item}
                isOpen={openModal === "view"}
                onClose={onClose}
                itemId={props.item._id}
            />
        </div>
    );
}
export default SpiritwearItem