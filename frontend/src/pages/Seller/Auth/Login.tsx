// Login.tsx

import * as React from "react";
import { Input, Button, Box, Flex } from '@chakra-ui/react';
import './Login.css'; // Import the new CSS file

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
            {/* Left side */}
            <Box className="gradient-bg" />

            {/* Right side */}
            <Box className="login-container">
                <h1 className="login-header">Seller Login</h1>
                <p className="login-text">Continue to Hersey Spirit wear Dashboard</p>

                {/* Username Input */}
                <Input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    mb={4}
                />

                {/* Password Input */}
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    mb={6}
                />

                {/* Login Button with icon */}
                <Button
                    colorScheme="blue"
                    onClick={handleLogin}
                    w="100%"
                >
                    Log In
                </Button>

                {/* Forgot Password Button */}
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
