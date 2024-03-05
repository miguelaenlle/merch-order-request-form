// ForgotPassword.tsx

import * as React from "react";
import { Input, Button, Box, Flex } from '@chakra-ui/react';
import './Login.css'; // Import the shared CSS file

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
    const [newPassword, setNewPassword] = React.useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = React.useState<string>('');

    const handleResetPassword = () => {
        // Implement your reset password logic here
        console.log('Resetting password with:', { newPassword, confirmNewPassword });
    };

    return (
        <Flex className="content">
            {/* Left side */}
            <Box className="gradient-bg" />

            {/* Right side */}
            <Box className="login-container">
                <h1 className="login-header">Forgot Password</h1>

                {/* New Password Input */}
                <Input
                    placeholder="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    mb={4}
                />

                {/* Confirm New Password Input */}
                <Input
                    placeholder="Confirm New Password"
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    mb={6}
                />

                {/* Reset Password Button */}
                <Button
                    colorScheme="blue"
                    onClick={handleResetPassword}
                    mb={4}
                    w="100%"
                >
                    Reset Password
                </Button>

                {/* Back to Login Button */}
                <Button
                    variant="link"
                    onClick={() => {
                        // Navigate back to the login page or handle navigation as needed
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
