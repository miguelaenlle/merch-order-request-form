

import { Box, Button, Flex, Input, Spinner, Text } from '@chakra-ui/react';
import * as React from "react";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { RiLogoutBoxRLine } from "react-icons/ri";
import './Login.module.css';
import { useAPIHook } from "../../../components/shared/hooks/use-api-hook.ts";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../../components/shared/context/AuthContext.tsx';

interface LoginProps { }

const Login: React.FC<LoginProps> = () => {
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | undefined>();

    const apiHook = useAPIHook();
    const navigate = useNavigate();

    const authContext = React.useContext(AuthContext);


    const handleLoginUser = async () => {
        setLoading(true);
        try {
            const response = await apiHook.post(
                'http://localhost:3000/api/auth/login',
                {
                    email: email,
                    password: password
                }
            )
            console.log(response);
            if (response.token) {
                localStorage.setItem("token", response)
                if (authContext) {
                    authContext.login(
                        response.user.email,
                        response.user.userId,
                        response.token,
                        "seller",
                        new Date(response.tokenExpirationDate)
                    )
                }
                navigate("/seller-dashboard")
            } else {
                window.location.reload()
            }
        } catch (error: any) {
            console.error(error);
            try {
                setError(error.response.data.message as string);
            } catch {
                setError("An error occurred. Please try again later.")
            }

        }
        setLoading(false);

    }

    return (
        <Flex className={"flexBox"}>

            <Box p={10} className="loginContainer">
                <h1 className="login-header">Seller Login</h1>
                <p className="login-text" style={{ paddingBottom: '20px' }}>Continue to Hersey Spiritwear Dashboard</p>


                <Input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    mb={4}
                />


                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    mb={6}
                />


                <Button
                    colorScheme="blue"
                    leftIcon={<RiLogoutBoxRLine />}
                    w="100%"
                    onClick={() => {
                        handleLoginUser()
                    }}
                >
                    Log In
                </Button>


                {/* <Button
                    variant="link"
                    onClick={() => {
                        console.log('Navigate to Forgot Password');
                        navigate('/forgot-password')
                    }}
                    w="100%"
                    leftIcon={<HiMiniQuestionMarkCircle />}
                    mt={2}
                >
                    Forgot Password
                </Button> */}
                <Button
                    variant="link"
                    onClick={() => {
                        console.log('Navigate to Forgot Password');
                        navigate('/seller-register')
                    }}
                    w="100%"
                    // leftIcon={<HiMiniQuestionMarkCircle />}
                    mt={2}
                >
                    Create new account instead
                </Button>


                <Button
                    variant="link"
                    onClick={() => {
                        console.log('Navigate to Forgot Password');
                        navigate('/')
                    }}
                    w="100%"
                    // leftIcon={<HiMiniQuestionMarkCircle />}
                >
                    Back to Homepage
                </Button>

                {error && (
                    <Text fontSize='md' color="red" mt={2}> {error}</Text>
                )}
                {loading && (
                    <Spinner color="gray" mt={2} />
                )}


            </Box>
            <Box className="gradient-bg" />
        </Flex>
    );
};

export default Login;
