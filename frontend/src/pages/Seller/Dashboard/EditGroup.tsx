import * as React from "react"
import CustomModal from "../../../components/shared/CustomModal";
import {useState} from "react";
import { Input, Button } from '@chakra-ui/react'
const EditGroup: React.FC<{}> = (props) => {

    const [name, setName] = useState('');
    const nameEntered: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    return (
        <div>
            <CustomModal

                buttonText="Edit Group"
                content={
                    <div>
                        <br/>
                        <strong style={{fontSize: "30px", fontWeight: "bold"}}>Edit Group</strong>
                        <Input
                            placeholder='Name'
                            marginTop='12px'
                            value={name}
                            onChange={nameEntered}
                        />
                        <div style={{paddingBottom: '15px'}}>
                            <Button colorScheme='blue' marginTop="80px" width="100px">
                                Save
                            </Button>

                            <Button colorScheme='red' marginTop="80px" width="100px" marginLeft="200">
                                Delete
                            </Button>
                        </div>
                    </div>


                }
                onAction={() => {
                }}
                disableDefaultButtons
            />
        </div>
    );
}
export default EditGroup