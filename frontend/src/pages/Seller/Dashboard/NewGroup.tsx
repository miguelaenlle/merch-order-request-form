import * as React from "react"
import CustomModal from "../../../components/shared/CustomModal";
import { Input, Button, Spinner, Text } from '@chakra-ui/react'
import { useState } from "react";
import { useAPIHook } from "../../../components/shared/hooks/use-api-hook";
import { AuthContext } from "../../../components/shared/context/AuthContext";
const NewGroup: React.FC<{
    retrieveGroups: () => void;

}> = (props) => {
    const [name, setName] = useState('');
    const nameEntered: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => {
        setIsOpen(false);
    }

    const [error, setError] = React.useState<string | undefined>();
    const [loading, setLoading] = React.useState(false);
    const apiHook = useAPIHook();
    const authContext = React.useContext(AuthContext);

    const addGroup = async (name: string) => {
        setLoading(true);
        setError(undefined);
        if (authContext?.token) {
            try {
                await apiHook.post(
                    `http://localhost:3000/api/groups/`,
                    { name },
                    authContext?.token
                )
                props.retrieveGroups();
                onClose();
            } catch (error: any) {
                try {
                    setError(error.response.data.message as string)
                } catch {
                    setError("Failed to create group")
                }
            }
        }
        setLoading(false);
    }

    return (
        <div>
            <CustomModal
                isOpen={isOpen}
                buttonText="Create New Group"
                content={
                    <div>
                        <br />
                        <strong style={{ fontSize: "30px", fontWeight: "bold" }}>Create Group</strong>
                        <Input
                            placeholder='Name'
                            marginTop='12px'
                            value={name}
                            onChange={nameEntered}
                        />

                        <div style={{ paddingBottom: '15px' }}>
                            <Button onClick={() => {
                                addGroup(name);
                            }} colorScheme='blue' marginTop="80px">
                                Create new group
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
                onOpen={() => setIsOpen(true)}
                onAction={() => { }}
                disableDefaultButtons
                onClose={onClose}
            />
        </div>
    );
}
export default NewGroup