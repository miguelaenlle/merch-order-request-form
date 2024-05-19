import { Box, Button, ChakraProvider, Flex, Input, Link, Spinner, Text, useToast } from '@chakra-ui/react';
import * as React from "react";
import { useState } from "react";
import { FaDoorOpen } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useAPIHook } from "../../../components/shared/hooks/use-api-hook.ts";
import styles from "./SellerRegister.module.css";
import { AuthContext } from '../../../components/shared/context/AuthContext.tsx';

const CreateAccount: React.FC<{}> = (props) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | undefined>();

    const [verificationCode, setVerificationCode] = useState(false);
    const [verificationCodeText, setVerificationCodeText] = useState('');

    const apiHook = useAPIHook();
    const navigate = useNavigate();
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
                    group: "seller"
                }
            )

            console.log(response);


            toast({
                title: "Check your email",
                description: "A confirmation email was sent to your email address. Please confirm your email address to continue.",
                status: "success",
                duration: 9000,
                isClosable: true,
            })
            setVerificationCode(true);
            // navigate("/seller-dashboard")
        } catch (error: any) {
            setError(error.response.data.message as string);
        }
        setLoading(false);
    }

    const handleEditVerificationCode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVerificationCodeText(event.target.value);
    }

    const handleConfirmCode = async () => {
        setLoading(true);
        setError(undefined);
        try {
            const response = await apiHook.post(
                `http://localhost:3000/api/auth/confirm-email`,
                {
                    email: email,
                    confirmationCode: verificationCodeText
                }
            )
            toast({
                title: "Account Created",
                description: "Your account has been created. Please login to continue.",
                status: "success",
                duration: 9000,
                isClosable: true,
            })
        } catch (error: any) {
            setError(error.response.data.message as string);
        }

        setLoading(false);

    }


    return (


        <Flex className={"flexBox"}>
            <Box p={10} className="loginContainer">


                <h1 className="login-header">Create New Account</h1>
                <br />
                <Input
                    value={fullName}
                    placeholder='Full Name'
                    onChange={nameEntered}
                    mb={3}>
                </Input>

                <Input
                    value={email}
                    placeholder='Email'
                    onChange={emailEntered}
                    mb={3}>
                </Input>

                <Input
                    value={password}
                    placeholder='Password'
                    onChange={passwordEntered}
                    mb={3}>
                </Input>

                {verificationCode ? (
                    <>
                        <Input
                            value={verificationCodeText}
                            placeholder='Verification Code'
                            onChange={handleEditVerificationCode}
                            mb={3}>
                        </Input>
                        <div>
                            <ChakraProvider>
                                <Button
                                    leftIcon={<FaDoorOpen />}
                                    colorScheme="blue"
                                    variant="solid"
                                    onClick={() => {
                                        handleConfirmCode()
                                    }}
                                >
                                    Confirm Code
                                </Button>
                            </ChakraProvider>
                        </div>
                    </>

                ) : (
                    <div>
                        <ChakraProvider>
                            <Button
                                leftIcon={<FaDoorOpen />}
                                colorScheme="blue"
                                variant="solid"
                                onClick={() => {
                                    handleSignupUser()
                                }}
                            >
                                Sign Up
                            </Button>
                        </ChakraProvider>
                    </div>
                )}


                <Button
                    variant="link"
                    onClick={() => {
                        navigate('/seller-login')
                    }}
                    textAlign={"left"}
                    // leftIcon={<HiMiniQuestionMarkCircle />}
                    mt={2}
                >
                    Back to login
                </Button>

                {error && (
                    <Text fontSize='md' color="red" mt={2}> {error}</Text>
                )}
                {loading && (
                    <Spinner color="gray" mt={2} />
                )}


            </Box>
            <Box className="gradient-bg" />
        </Flex >
    );
}
export default CreateAccount