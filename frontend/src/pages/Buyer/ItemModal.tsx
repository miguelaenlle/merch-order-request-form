import * as React from "react"
import CustomModal from "../../components/shared/CustomModal";
const ItemModal: React.FC<{}> = (props) => {
    return (
        <CustomModal
            buttonText="Single Item View"
            content={<div>
                <p>Item Modal</p>
            </div>}
            onAction={() => {}}
            disableDefaultButtons
            extraLong
        />
    );
}
export default ItemModal