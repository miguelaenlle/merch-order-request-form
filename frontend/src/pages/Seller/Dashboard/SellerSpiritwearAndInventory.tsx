
import NewSpiritwearItem from "./NewSpiritwearItem";
import { JHHS_SWEATER } from "./imagePaths";
import { Tag } from "@chakra-ui/react";
import "./styles.css";
const SellerSpiritwearAndInventory = () => {
    const schoolName = "JHHS Merch";

    return (
        <div className="subcontent">
            <h3 className="header">My Spiritwear & Inventory</h3>
            <div className="createNewItem">
                <NewSpiritwearItem/>
            </div>
            <div>
                <img className="itemImage" src={JHHS_SWEATER} alt="Husky Sweater" />
            </div>
            <div className="itemDetails" style={{ textAlign: "left" }}>
                <h4 className="itemName">Husky Sweater</h4>
                <p className="cost"> $20 </p>
                <Tag size="md" variant="solid" colorScheme="gray">
                    {schoolName}
                </Tag>
            </div>
        </div>
    );
};

export default SellerSpiritwearAndInventory;
