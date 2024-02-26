import * as React from "react"
import styles from "./SellerRegister.module.css";
import { Input } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react'
import {useState} from "react";
import { Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
// @ts-ignore
const CreateAccount: React.FC<{}> = (props) => {
   const [fullName, updatedFullName] = useState('');
   const [userName, updatedUserName] = useState('');
   const [password, updatedPassword] = useState('');
    return (
        <div className={styles.content}>
            <h1>
                <br></br>
                <br></br>
                <br></br>
                Create New Account

            </h1>
            <div>
                <Input
                    value={fullName}
                    placeholder='Full Name'
                    size='md'
                    width='large'
                />
            </div>
            <div>
                <Input
                       value={userName}
                       placeholder='Username'
                       size='md'
                       width='large'
                />
            </div>
            <div>
                <Input
                       value={password}
                       placeholder='Password'
                       size='md'
                       width='large'/>
            </div>
            <div>
                <Button colorScheme='blue'>Sign Up</Button>
            </div>
            <div className={styles.link}>

            <Link color='blue.300' href='http://localhost:5173/seller-login'>

                <p>back to login</p>
            </Link>
                </div>
            <body>
            <div className={styles.gradient}>

            </div>
            </body>



        </div>


    )
        ;
}
export default CreateAccount