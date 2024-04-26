import * as React from "react"
import CustomModal from "../../components/shared/CustomModal";
const EditSpiritwearItem: React.FC<{}> = (props) => {
    return (
        <div>

            <CustomModal
                buttonText="Edit Spiritwear Item"
                content={<div>
                    <p>Edit Spiritwear Item</p>
                </div>}
                closeText="Cancel"
                actionText="Create Item"
                onAction={() => { }}
                disableDefaultButtons
            />
        </div>
    );
}
export default EditSpiritwearItem