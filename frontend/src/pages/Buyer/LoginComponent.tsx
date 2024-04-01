import * as React from "react"
import CustomModal from "../../components/shared/CustomModal";
import { Input, Button, Link } from '@chakra-ui/react'
import {useState} from "react";

const LoginComponent: React.FC<{}> = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const emailEntered: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const passwordEntered: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    return (
        <CustomModal
            buttonText="Buyer Log In"
            content={
                <div className="mainContent">

                    <div>
                        <strong className="strong">Log into your</strong>
                    </div>

                    <div>
                        <strong className="strong">Spiritwear Account</strong>
                    </div>

                    <div>
                        <Input
                            borderColor='gray.500'
                            value={email}
                            placeholder='Email'
                            size='md'
                            width='full'
                            onChange={emailEntered}
                            height='8'
                            marginTop='14px'
                        />
                    </div>

                    <div>
                        <Input
                            borderColor='gray.500'
                            value={password}
                            placeholder='Password'
                            size='md'
                            width='full'
                            onChange={passwordEntered}
                            height='8'
                            marginTop='6px'
                        />
                    </div>

                    <Button colorScheme="blue" size="md" marginTop="15px">Log in</Button>

                    <Link fontWeight = "bold" color="blue.500" mt="2" display="block" href="/">Create new account</Link>

                </div>
            }
            onAction={() => {
            }}
            disableDefaultButtons
        />
    );
}
export default LoginComponent