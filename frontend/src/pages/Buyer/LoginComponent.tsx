import * as React from "react"
import CustomModal from "../../components/shared/CustomModal";
const LoginComponent: React.FC<{}> = (props) => {
    return (
        <CustomModal
            buttonText="Buyer Log In"
            content={
                <div>
                    <p>Your content goes here</p>
                </div>
            }
            onAction={() => { }}
            disableDefaultButtons
        />
    );
}
export default LoginComponent