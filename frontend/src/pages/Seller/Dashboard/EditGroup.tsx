import * as React from "react"
import CustomModal from "../../../components/shared/CustomModal";
const EditGroup: React.FC<{}> = (props) => {
    return (
        <div>
            <CustomModal
                title="Edit Group"
                buttonText="Edit Group"
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
export default EditGroup