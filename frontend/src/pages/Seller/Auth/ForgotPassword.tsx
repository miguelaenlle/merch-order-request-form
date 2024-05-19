

import * as React from "react";
import { Input, Button, Box, Flex } from '@chakra-ui/react';
import { SlActionUndo } from 'react-icons/sl';
import { FaRegCircleCheck } from 'react-icons/fa6';
import './ForgotPassword.css';
import { useNavigate } from "react-router-dom";


interface ForgotPasswordProps { }

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
    const [newPassword, setNewPassword] = React.useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = React.useState<string>('');

    const navigate = useNavigate();
    const handleResetPassword = () => {
        console.log('Resetting password with:', { newPassword, confirmNewPassword });
    };

    return (
        <Flex>

            <Box p={10} className="login-container">

                <h1 className="login-header">Forgot Password</h1>



                <Input
                    placeholder="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    mb={4}
                />


                <Input
                    placeholder="Confirm New Password"
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    mb={6}
                />


                <Button
                    colorScheme="blue"
                    onClick={handleResetPassword}
                    mb={4}
                    w="100%"
                    leftIcon={<FaRegCircleCheck />}
                >
                    Reset Password
                </Button>


                <Button
                    variant="link"
                    onClick={() => {
                        console.log('Navigate back to login');
                        navigate('/seller-login')
                    }}
                    w="100%"
                    leftIcon={<SlActionUndo />}
                >
                    Back to Login
                </Button>
            </Box>
            <Box className="gradient-bg" />
        </Flex>
    );
};

export default ForgotPassword;
