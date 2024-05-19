import * as React from "react"
import CustomModal from "../../components/shared/CustomModal";
import { Input, Button, Link, Text, Spinner, useToast } from '@chakra-ui/react'
import { useState } from "react";
import { useAPIHook } from "../../components/shared/hooks/use-api-hook.ts";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/shared/context/AuthContext.tsx";
//import {useNavigate} from "react-router-dom";

const LoginComponent: React.FC<{
    isOpen?: boolean;
    transparentButton?: boolean;
    toBuyerSignup?: () => void;
    onClose?: () => void;
}> = (props) => {

    const authContext = React.useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();

    const toast = useToast();

    const navigate = useNavigate();

    const emailEntered: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const passwordEntered: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const apiHook = useAPIHook();
    //const navigate = useNavigate();

    const handleLoginUser = async () => {
        setLoading(true);
        setError(undefined);
        try {
            const response = await apiHook.post(
                'http://localhost:3000/api/auth/login',
                {
                    email: email,
                    password: password
                }
            )
            if (response.token) {
                localStorage.setItem("token", response.token)

                authContext?.login(
                    response.user.email,
                    response.user.userId,
                    response.token,
                    "buyer",
                    new Date(response.tokenExpirationDate)
                )

                toast({
                    title: "Login Successful",
                    description: "You have successfully logged in.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                })

                props.onClose();
                // window.location.reload()
            }
        } catch (error: any) {
            setError(error.response.data.message as string);
        }
        setLoading(false);
    }

    return (
        <CustomModal
            isOpen={props.isOpen}
            buttonText="Buyer Log In"
            transparentButton={props.transparentButton}
            onClose={props.onClose}
            content={
                <div className="mainContent">

                    <Text color="black">
                        <strong className="strong">Log into your</strong>
                    </Text>

                    <Text color="black">
                        <strong className="strong">Spiritwear Account</strong>
                    </Text>

                    <div>
                        <Input
                            borderColor='gray.500'
                            value={email}
                            placeholder='Email'
                            size='md'
                            width='full'
                            onChange={emailEntered}
                            height='8'
                            marginTop='14px'
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
                            marginTop='6px'
                            type="password"
                        />
                    </div>

                    <Button colorScheme="blue" size="md" marginTop="15px" onClick={() => { handleLoginUser() }} >Log in</Button>

                    <Link fontWeight="bold" color="blue.500" mt="2" display="block" onClick={props.toBuyerSignup}>Create new account</Link>
                    <Link fontWeight="bold" color="blue.500" display="block" onClick={() => {
                        navigate("/seller-login")
                    }}>Go to Seller Login</Link>


                    {error && (
                        <Text fontSize='md' color="red" mt={2}> {error}</Text>
                    )}
                    {loading && (
                        <Spinner color="gray" mt={2} />
                    )}




                </div >
            }
            onAction={() => {
            }}
            disableDefaultButtons
        />
    );
}
export default LoginComponent