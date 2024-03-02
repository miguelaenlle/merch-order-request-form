import * as React from "react";
import { Input, Button, Heading, Box } from '@chakra-ui/react';

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
    const [newPassword, setNewPassword] = React.useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = React.useState<string>('');

    const handleResetPassword = () => {
        console.log('Resetting password with:', { newPassword, confirmNewPassword });
    };

    return (
        <Box p={4} maxW="md" mx="auto">
            <Heading as="h2" size="xl" textAlign="center" mb={6}>
                Forgot Password
            </Heading>


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
                onClick={() => {
                    console.log('Navigate back to login');
                }}
                w="100%"
            >
                Back to Login
            </Button>
        </Box>
    );
};

export default ForgotPassword;
