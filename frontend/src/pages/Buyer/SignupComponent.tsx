import * as React from "react"
import CustomModal from "../../components/shared/CustomModal";
const SignupComponent: React.FC<{}> = (props) => {
    return (
        <CustomModal
            buttonText="Buyer Sign Up"
            content={<div>
                <p>Signup</p>
            </div>}
            onAction={() => {}}
            disableDefaultButtons
        />
    );
}
export default SignupComponent