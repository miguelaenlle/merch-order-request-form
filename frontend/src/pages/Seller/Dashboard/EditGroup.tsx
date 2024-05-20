import * as React from "react"
import CustomModal from "../../../components/shared/CustomModal";
import { useState } from "react";
import { Input, Button, Spinner, Text } from '@chakra-ui/react'
import { Group } from "../../../components/shared/types/Group";
import { useAPIHook } from "../../../components/shared/hooks/use-api-hook";
import { AuthContext } from "../../../components/shared/context/AuthContext";
const EditGroup: React.FC<{
    group: Group;
    isOpen: boolean;
    retrieveGroups: () => void;
    onClose: () => void;
}> = (props) => {
    const apiHook = useAPIHook();
    const authContext = React.useContext(AuthContext);

    const [error, setError] = React.useState<string | undefined>();
    const [loading, setLoading] = React.useState(false);

    const [name, setName] = useState('');

    const nameEntered: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    React.useEffect(() => {
        setName(props.group.name);
    }, [props.group._id])

    const handleSave = async () => {
        setLoading(true);
        setError(undefined);
        if (authContext?.token) {
            try {
                await apiHook.put(
                    `http://localhost:3000/api/groups/${props.group._id}`,
                    { newName: name },
                    authContext?.token
                )
                props.retrieveGroups();
                props.onClose();
            } catch (error: any) {
                // handle error
                try {
                    setError(error.response.data.message as string)
                } catch {
                    setError("Failed to update group")
                }
            }
        }
        setLoading(false);

    }

    const handleDelete = async () => {
        setLoading(true);
        setError(undefined);
        if (authContext?.token) {
            try {
                const response = await apiHook.del(
                    `http://localhost:3000/api/groups/${props.group._id}`,
                    authContext?.token
                )
                console.log('response', response);
                props.retrieveGroups();
                props.onClose();
            } catch (error: any) {
                // handle error
                console.error("error", error);
                try {
                    setError(error.response.data.message as string)
                } catch {
                    setError("Failed to delete group")
                }
            }
        }
        setLoading(false);
    }


    return (
        <div>
            <CustomModal
                isOpen={props.isOpen}
                buttonText="Edit Group"
                content={
                    <div>
                        <br />
                        <strong style={{ fontSize: "30px", fontWeight: "bold" }}>Edit Group</strong>
                        <Input
                            placeholder='Name'
                            marginTop='12px'
                            value={name}
                            onChange={nameEntered}
                        />
                        <div style={{ paddingBottom: '15px' }}>
                            <Button onClick={handleSave} colorScheme='blue' marginTop="80px" width="100px">
                                Save
                            </Button>

                            <Button onClick={handleDelete} colorScheme='red' marginTop="80px" width="100px" marginLeft="200">
                                Delete
                            </Button>
                        </div>


                        {loading && (
                            <Spinner />
                        )}
                        {error && (
                            <Text fontSize='md' color="red" mt={2}> {error}</Text>
                        )}
                        <br />
                    </div>


                }
                onAction={() => {
                }}
                onClose={props.onClose}
                disableDefaultButtons
                transparentButton
            />
        </div>
    );
}
export default EditGroup