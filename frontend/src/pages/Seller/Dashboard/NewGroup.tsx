import * as React from "react"
import CustomModal from "../../../components/shared/CustomModal";
const NewGroup: React.FC<{}> = (props) => {
    return (
        <div>
            <CustomModal
                title="New Group"
                buttonText="Create New Group"
                content={
                    <div>
                        <p>Content</p>
                        <br />
                    </div>
                }
                onAction={() => { }}
                disableDefaultButtons
            />
        </div>
    );
}
export default NewGroup