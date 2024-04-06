import React from "react";
import CustomModal from "../../../components/shared/CustomModal";



const NewSpiritwearItem: React.FC<{}> = (props) => {
    const handleCreateSpiritwearItem = () => {
        console.log("Created a new spiritwear item.");
    };

    return (
        <div>
            <CustomModal
                title="New Spiritwear Item"
                buttonText= "Create new item"
                content={
                    <div>
                        <p>Content</p>
                        {/* TODO: Get the user's inputs */}
                    </div>
                }
                closeText="Close"
                actionText="Save"
                onAction={handleCreateSpiritwearItem}
            />
        </div>
    );
};

export default NewSpiritwearItem;

