import * as React from "react"
import styles from "./SellerRegister.module.css"
import { Input } from '@chakra-ui/react'
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from '@chakra-ui/react'
import orangeGradient from '../../../assets/orangeGradient.png';
import { FaDoorOpen } from 'react-icons/fa';
import { ChakraProvider } from "@chakra-ui/react";
import { useAPIHook } from "../../../components/shared/hooks/use-api-hook.ts";
import {useNavigate} from "react-router-dom";

const CreateAccount: React.FC<{}> = (props) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const apiHook = useAPIHook();
    const navigate = useNavigate();

    const nameEntered: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(event.target.value);
    };

    const emailEntered: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const passwordEntered: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSignupUser = async () => {
        const response = await apiHook.post(
            'http://localhost:3000/api/auth/signup',
            {
                name: fullName,
                email: email,
                password: password,
                group: "seller"
            }
        )
        console.log(response);
        navigate("/seller-dashboard")
    }

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
                        value={email}
                        placeholder='Email'
                        size='md'
                        width='large'
                        onChange={emailEntered}>
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
                            onClick={() => {
                                handleSignupUser()
                            }}
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