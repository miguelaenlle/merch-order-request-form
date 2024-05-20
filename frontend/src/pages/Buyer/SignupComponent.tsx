import * as React from "react"
import CustomModal from "../../components/shared/CustomModal";
import { Input, Button, Link, Text, Alert, AlertIcon, Spinner, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useAPIHook } from "../../components/shared/hooks/use-api-hook.ts";
import { AuthContext } from "../../components/shared/context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
const SignupComponent: React.FC<{
    isOpen?: boolean;
    transparentButton?: boolean;
    toBuyerLogin?: () => void;
    onClose?: () => void;
}> = (props) => {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();

    const toast = useToast();

    const nameEntered: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(event.target.value);
    };

    const emailEntered: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const passwordEntered: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const authContext = React.useContext(AuthContext);
    const apiHook = useAPIHook();

    const handleSignupUser = async () => {
        setLoading(true);
        setError(undefined);
        try {
            const response = await apiHook.post(
                'http://localhost:3000/api/auth/signup',
                {
                    name: fullName,
                    email: email,
                    password: password,
                    group: "buyer"
                }
            )

            toast({
                title: "Account created.",
                description: "Your account was successfully created. Please sign in.",
                status: "success",
                duration: 9000,
                isClosable: true,

            })
        } catch (error: any) {
            console.error("Current Error", error);
            setError(error.response.data.message as string);
        }
        setLoading(false);
    }

    return (
        <CustomModal
            isOpen={props.isOpen}
            buttonText="Buyer Sign Up"
            transparentButton={props.transparentButton}
            onClose={props.onClose}
            content={<div className="mainContent">
                <Text color="black"><strong className="strong">Sign Up for a</strong></Text>
                <Text color="black"><strong className="strong">Spiritwear Account</strong></Text>

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
                        type="password"
                    />
                </div>

                <Button colorScheme="blue" size="md" marginTop="15px" onClick={() => { handleSignupUser() }} >Sign Up</Button>
                <Link fontWeight="bold" color="blue.500" mt="2" display="block" onClick={props.toBuyerLogin}>Log into account</Link>
                <Link fontWeight="bold" color="blue.500" display="block" onClick={() => {
                    navigate("/seller-login")
                }}>Go to Seller Login</Link>

                {error && (
                    <Text fontSize='md' color="red" mt={2}> {error}</Text>
                )}
                {loading && (
                    <Spinner color="gray" mt={2} />
                )}


            </div>}
            onAction={() => {
            }}
            disableDefaultButtons
        />
    );
}
export default SignupComponent