

import * as React from "react";
import { Input, Button, Box, Flex } from '@chakra-ui/react';
import './Login.css'; // Import the shared CSS file

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
    const [newPassword, setNewPassword] = React.useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = React.useState<string>('');

    const handleResetPassword = () => {

        console.log('Resetting password with:', { newPassword, confirmNewPassword });
    };

    return (
        <Flex className="content">

            <Box className="gradient-bg" />


            <Box className="login-container">
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
                >
                    Reset Password
                </Button>


                <Button
                    variant="link"
                    onClick={() => {
                        console.log('Navigate back to login');
                    }}
                    w="100%"
                >
                    Back to Login
                </Button>
            </Box>
        </Flex>
    );
};

export default ForgotPassword;
