

import { Box, Button, Flex, Input } from '@chakra-ui/react';
import * as React from "react";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { RiLogoutBoxRLine } from "react-icons/ri";
import './Login.module.css';

interface LoginProps { }

const Login: React.FC<LoginProps> = () => {
    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    return (
        <Flex className={"flexBox"}>

            <Box p={10} className="login-container">
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
                    leftIcon={<RiLogoutBoxRLine />}
                    w="100%"
                >
                    Log In
                </Button>


                <Button
                    variant="link"
                    onClick={() => {
                        console.log('Navigate to Forgot Password');
                    }}
                    w="100%"
                    leftIcon={<HiMiniQuestionMarkCircle />}
                    mt={2}
                >
                    Forgot Password
                </Button>
            </Box>
            <Box className="gradient-bg" />
        </Flex>
    );
};

export default Login;
