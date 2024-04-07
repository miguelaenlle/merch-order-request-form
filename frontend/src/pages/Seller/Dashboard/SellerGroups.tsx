import * as React from "react"
import { Group } from "../../../components/shared/types/Group";
import GroupItem from "./GroupItem";
import { PLACEHOLDER_GROUPS } from "../../../constants/placeholder-data";
import { useAPIHook } from "../../../components/shared/hooks/use-api-hook";

const SellerGroups: React.FC<{}> = (props) => {
    const [groups, setGroups] = React.useState<Group[]>([]);
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
    retrieveGroups()

    return (
        <div className="subcontent">
            <h3 className="header">My Groups</h3>
            {/* TODO: Let the user CREATE new groups */}
            {/* TODO: Make it look like the Figma  */}
            {groups.map((group) => (
                <GroupItem
                    key={`group-${group._id}`}
                    group={group}
                />
            ))}
        </div>
    );
}
export default SellerGroups