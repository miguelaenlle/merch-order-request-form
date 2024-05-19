import * as React from "react"
import { Group } from "../../../components/shared/types/Group";
import GroupItem from "./GroupItem";
import { useAPIHook } from "../../../components/shared/hooks/use-api-hook";
import NewGroup from "./NewGroup";
import EditGroup from "./EditGroup";
import { PLACEHOLDER_GROUPS } from "../../../constants/placeholder-data";

const SellerGroups: React.FC<{}> = (props) => { //have fun with this frontend team cause i have zero idea on these random errors that seem to cause nothing
    const [groups, setGroups] = React.useState<Group[]>(PLACEHOLDER_GROUPS);
    // TODO: Fetch groups from our API

    const apiHook = useAPIHook();
    const retrieveGroups = async () => {
        const sellerToken = await apiHook.generateSellerToken();

        const response = await apiHook.get(
            `http://localhost:3000/api/groups/`,
            sellerToken
        );
        console.log(response)
        setGroups(response)
    }

    React.useEffect(() => {
        // retrieveGroups()
    }, [])

    return (
        <div className="subcontent" >
            <h3 className="header">My Groups</h3>
            {/* TODO: Let the user CREATE new groups */}
            {/* TODO: Make it look like the Figma  */}
            <NewGroup />
            <EditGroup />
            {groups.map((group) => (
                <GroupItem
                    key={`group-${group._id}`}
                    group={group}
                    style={{margin: '25px'}}
                />
            ))}
        </div>
    );
}
export default SellerGroups