import NewSpiritwearItem from "./NewSpiritwearItem";
import { JHHS_SWEATER } from "./imagePaths";
import "./styles.css";

const SellerSpiritwearAndInventory = () => {
    return (
        <div className="subcontent">
            <h3 className="header">My Spiritwear & Inventory</h3>
            <div className="createNewItem">
                <NewSpiritwearItem />
            </div>
            <div className="imageContainer">
                <img className="itemImage" src={JHHS_SWEATER} alt="Husky Sweater" />
            </div>
            <div className="itemDetails">
                <h4 className="itemName">Husky Sweater</h4>
                <p className="cost">Price: $20.00</p>
                <p className="school"> JHHS Merch</p>
            </div>
        </div>
    );
};

export default SellerSpiritwearAndInventory;
