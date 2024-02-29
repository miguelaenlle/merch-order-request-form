import * as React from "react"
import styles from "./SellerRegister.module.css";
import { Input } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react'
import {useState} from "react";
import { Link } from '@chakra-ui/react'
import orangeGradient from'../../../assets/orangeGradient.png';
import { ExternalLinkIcon } from '@chakra-ui/icons'

const CreateAccount: React.FC<{}> = (props) => {
   const [fullName, setFullName] = useState('');
   const [userName, setUserName] = useState('');
   const [password, setPassword] = useState('');

   function nameEntered() {
       setFullName(target.value);
   }

    function userEntered() {
        setUserName(target.value);
    }

    function passwordEntered() {
        setPassword(target.value);
    }


    return (

        <div className={styles.content}>

            <h1>
                Create New Account

            </h1>
            <div>
                <Input
                    value={fullName}
                    placeholder='Full Name'
                    size='md'
                    width='large'
                    onChange={nameEntered}
                />
            </div>
            <div>
                <Input
                       value={userName}
                       placeholder='Username'
                       size='md'
                       width='large'
                       onChange={userEntered}
                />
            </div>

            <div>

                <Input
                    value={password}
                    placeholder='Password'
                    size='md'
                    width='large'
                    onChange={passwordEntered}
                />

            </div>

            <div>
                <Button colorScheme='blue'>Sign Up</Button>
            </div>

            <div className={styles.link}>
            <Link color='blue.300' href='/seller-login'>
                <p className={styles.link}>Back to login</p>
            </Link>
                </div>

            <div className={styles.container}>
                <img src={orangeGradient} alt="gradient" className={styles.image}/>
            </div>
        </div>


    )
        ;
}
export default CreateAccount