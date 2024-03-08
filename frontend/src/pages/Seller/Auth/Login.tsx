// Login.tsx

import * as React from "react";
import { Input, Button, Box, Flex } from '@chakra-ui/react';
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { RiLogoutBoxRLine } from "react-icons/ri";
import './Login.module.css';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const handleLogin = () => {
        // Implement your login logic here
        console.log('Logging in with:', { username, password });
    };

    return (
        <Flex className="content">

            <Box className="gradient-bg" />


            <Box className="login-container">
                <h1 className="login-header">Seller Login</h1>
                <p className="login-text">Continue to Hersey Spirit wear Dashboard</p>


                <Input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    onClick={handleLogin}
                    leftIcon={<RiLogoutBoxRLine />}
                    w="100%"
                >
                    Log In
                </Button>


                <Button
                    variant="link"
                    onClick={() => {
                        // Navigate to the Forgot Password page or handle navigation as needed
                        console.log('Navigate to Forgot Password');
                    }}
                    w="100%"
                    leftIcon={<HiMiniQuestionMarkCircle />}
                    mt={2}
                >
                    Forgot Password
                </Button>
            </Box>
        </Flex>
    );
};

export default Login;
