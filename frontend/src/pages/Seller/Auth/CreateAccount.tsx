import * as React from "react"
import styles from "./SellerRegister.module.css"
import { Input } from '@chakra-ui/react'
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from '@chakra-ui/react'
import orangeGradient from '../../../assets/orangeGradient.png';
import { FaDoorOpen } from 'react-icons/fa';
import { ChakraProvider } from "@chakra-ui/react";

const CreateAccount: React.FC<{}> = (props) => {
    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const nameEntered: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(event.target.value);
    };

    const userEntered: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    };

    const passwordEntered: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    return (

        <div className={`${styles.content} flexbox`}>
            <div className={`${styles.container} flexItem`}>
                <h1>
                    Create New Account

                </h1>
                <div>
                    <Input
                        value={fullName}
                        placeholder='Full Name'
                        size='md'
                        width='large'
                        onChange={nameEntered}>
                    </Input>
                </div>

                <div>
                    <Input
                        value={userName}
                        placeholder='Username'
                        size='md'
                        width='large'
                        onChange={userEntered}>
                    </Input>
                </div>

                <div>
                    <Input
                        value={password}
                        placeholder='Password'
                        size='md'
                        width='large'
                        onChange={passwordEntered}>
                    </Input>
                </div>

                <div>
                    <ChakraProvider>
                        <Button
                            leftIcon={<FaDoorOpen />}
                            colorScheme="blue"
                            variant="solid"
                        >
                            Sign Up
                        </Button>
                    </ChakraProvider>

                </div>

                <div className={styles.link}>
                    <Link color='blue.300' href='/seller-login'>
                        <p className={styles.link}>Back to login</p>
                    </Link>
                </div>
            </div>

            <div className="flexItem orangeGradient">

            </div>
        </div>
    );
}
export default CreateAccount