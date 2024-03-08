// Login.tsx

import * as React from "react";
import { Input, Button, Box, Flex } from '@chakra-ui/react';
import './Login.module.css'; // Import the new CSS file

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const handleLogin = () => {

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
                    mt={2}
                >
                    Forgot Password
                </Button>
            </Box>
        </Flex>
    );
};

export default Login;
