import * as React from "react";
import { Input, Button, Box, Flex } from '@chakra-ui/react';
import { FaRegCircleCheck } from 'react-icons/fa6';
import './ForgotPassword.css';

interface ConfirmEmailProps {}

const ConfirmEmail: React.FC<ConfirmEmailProps> = () => {
    const [code, setCode] = React.useState<string>('');

    const handleConfirmEmail = () => {
        console.log('Confirming email with code:', code);
    };

    return (
        <Flex className="content">
            <Box p={10} className="login-container">
                <h1 className="login-header">Confirm Email</h1>
                <p className="medium">
                    An email was sent to your inbox with a code to confirm your email.
                    Input it here.
                </p>

                <Input
                    placeholder="6 digit code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    mb={6}
                />

                <Button
                    colorScheme="blue"
                    onClick={handleConfirmEmail}
                    mb={4}
                    w="100%"
                    leftIcon={<FaRegCircleCheck />}
                >
                    Confirm
                </Button>
            </Box>
            <Box className="gradient-bg" />
        </Flex>
    );
};

export default ConfirmEmail;
