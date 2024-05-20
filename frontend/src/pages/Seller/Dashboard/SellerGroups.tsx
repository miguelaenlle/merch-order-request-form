import * as React from "react"
import { Group } from "../../../components/shared/types/Group";
import GroupItem from "./GroupItem";
import { useAPIHook } from "../../../components/shared/hooks/use-api-hook";
import NewGroup from "./NewGroup";
import EditGroup from "./EditGroup";
import { PLACEHOLDER_GROUPS } from "../../../constants/placeholder-data";
import "./SellerGroups.css"
import { AuthContext } from "../../../components/shared/context/AuthContext";
import { Spinner, Text } from "@chakra-ui/react";

const SellerGroups: React.FC<{}> = (props) => { //have fun with this frontend team cause i have zero idea on these random errors that seem to cause nothing
    const [groups, setGroups] = React.useState<Group[]>([]);
    const authContext = React.useContext(AuthContext)
    // TODO: Fetch groups from our API

    const apiHook = useAPIHook();

    const [error, setError] = React.useState<string | undefined>();
    const [loading, setLoading] = React.useState(false);

    const retrieveGroups = async () => {
        setLoading(true);
        if (authContext?.token) {
            try {
                const response = await apiHook.get(
                    `http://localhost:3000/api/groups/`,
                    authContext?.token
                );
                console.log(response)
                setGroups(response)
            } catch {
                setError("Failed to retrieve groups")
            }
        }
        setLoading(false);
    }

    React.useEffect(() => {
        retrieveGroups()
    }, [authContext?.token])

    return (
        <div className="subcontent" >
            <h3 className="header">My Groups</h3>
            <NewGroup
                retrieveGroups={retrieveGroups}
            />
            <div className="sellerGroups">
                {groups.map((group) => (
                    <GroupItem
                        key={`group-${group._id}`}
                        group={group}
                        retrieveGroups={retrieveGroups}
                    />
                ))}
            </div>
            {loading && (
                <Spinner />
            )}
            {error && (
                <Text fontSize='md' color="red" mt={2}> {error}</Text>
            )}
        </div>
    );
}
export default SellerGroups