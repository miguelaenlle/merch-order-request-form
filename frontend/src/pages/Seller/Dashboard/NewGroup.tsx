import * as React from "react"
import CustomModal from "../../../components/shared/CustomModal";
import { Input, Button } from '@chakra-ui/react'
import {useState} from "react";
const NewGroup: React.FC<{}> = (props) => {
    const [name, setName] = useState('');
    const nameEntered: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    return (
        <div>
            <CustomModal
                buttonText="Create New Group"
                content={
                    <div>
                        <br/>
                        <strong style={{fontSize: "30px", fontWeight: "bold"}}>Create Group</strong>
                        <Input
                            placeholder='Name'
                            marginTop='12px'
                            value={name}
                            onChange={nameEntered}
                        />

                        <div style={{paddingBottom: '15px'}}>
                        <Button colorScheme='blue' marginTop="80px">
                            Create new group
                        </Button>
                            </div>
                    </div>
                }
                onAction={() => { }}
                disableDefaultButtons
            />
        </div>
    );
}
export default NewGroup