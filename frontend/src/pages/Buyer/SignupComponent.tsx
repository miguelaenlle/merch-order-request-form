import * as React from "react"
import CustomModal from "../../components/shared/CustomModal";
import {Input, Button, Link} from "@chakra-ui/react";
import {useState} from "react";
import {useAPIHook} from "../../components/shared/hooks/use-api-hook.ts";
const SignupComponent: React.FC<{}> = (props) => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const nameEntered: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(event.target.value);
    };

    const emailEntered: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const passwordEntered: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const apiHook = useAPIHook();

    const handleSignupUser = async () => {
        const response = await apiHook.post(
            'http://localhost:3000/api/auth/signup',
            {
                name: fullName,
                email: email,
                password: password,
                group: "buyer"
            }
        )
        console.log(response);
        window.location.reload()
    }

    return (
        <CustomModal
            buttonText="Buyer Sign Up"
            content={<div className="mainContent">
                <div><strong className="strong">Sign Up for a</strong></div>
                <div><strong className="strong">Spiritwear Account</strong></div>

                <div>
                    <Input
                        borderColor='gray.500'
                        value={fullName}
                        placeholder='Full Name'
                        size='md'
                        width='full'
                        onChange={nameEntered}
                        height='8'
                        marginTop='20px'
                    />
                </div>

                <div>
                    <Input
                        borderColor='gray.500'
                        value={email}
                        placeholder='Email'
                        size='md'
                        width='full'
                        onChange={emailEntered}
                        height='8'
                        marginTop='12px'
                    />
                </div>

                <div>
                    <Input
                        borderColor='gray.500'
                        value={password}
                        placeholder='Password'
                        size='md'
                        width='full'
                        onChange={passwordEntered}
                        height='8'
                        marginTop='12px'
                    />
                </div>

                <Button colorScheme="blue" size="md" marginTop="15px" onClick={() => { handleSignupUser() }} >Sign Up</Button>
                <Link fontWeight="bold" color="blue.500" mt="2" display="block" href="/">Log into account</Link>
            </div>}
            onAction={() => {
            }}
            disableDefaultButtons
        />
    );
}
export default SignupComponent