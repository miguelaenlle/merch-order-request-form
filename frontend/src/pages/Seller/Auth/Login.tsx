import * as React from "react";
import { Input, Button } from '@chakra-ui/react';
import styles from './Login.module.css';

interface LoginPageProps {}

const Login: React.FC<LoginPageProps> = () => {
    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const handleLogin = () => {
        // Implement login logic here
        console.log('Logging in with:', { username, password });
    };

    return (
        <div className={styles.content}>
            <h1>Seller Login</h1>
            <p>Continue to Hersey Spirit wear Dashboard</p>


            <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />


            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />


            <Button
                colorScheme="blue"
                onClick={handleLogin}
            >
                Login
            </Button>
        </div>
    );
};

export default Login;
