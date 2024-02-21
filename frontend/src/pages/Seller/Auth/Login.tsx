import * as React from "react"
import { Input } from '@chakra-ui/react'
import styles from "./Login.module.css";

const Login: React.FC<{}> = (props) => {
    return (
        <div className={styles.content}>
            <h1>Login</h1>
            <Input placeholder='Username' />
            <Input placeholder='Password' />
        </div>
    );
}
export default Login