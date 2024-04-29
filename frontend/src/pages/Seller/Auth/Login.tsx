

import { Box, Button, Flex, Input } from '@chakra-ui/react';
import * as React from "react";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { RiLogoutBoxRLine } from "react-icons/ri";
import './Login.module.css';
import {useAPIHook} from "../../../components/shared/hooks/use-api-hook.ts";
import {useNavigate} from "react-router-dom";

interface LoginProps { }

const Login: React.FC<LoginProps> = () => {
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const apiHook = useAPIHook();
    const navigate = useNavigate();

    const handleLoginUser = async () => {
        const response = await apiHook.post(
            'http://localhost:3000/api/auth/login',
            {
                email: email,
                password: password
            }
        )
        console.log(response);
        if (response.token) {
            localStorage.setItem("token", response.token)
            navigate("/seller-dashboard")
        } else {
            window.location.reload()
        }

    }

    return (
        <Flex className={"flexBox"}>

            <Box p={10} className="loginContainer">
                <h1 className="login-header">Seller Login</h1>
                <p className="login-text"  style={{ paddingBottom: '20px' }}>Continue to Hersey Spiritwear Dashboard</p>


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


                <Button
                    variant="link"
                    onClick={() =>  {
                        console.log('Navigate to Forgot Password');
                        navigate('/forgot-password')
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
