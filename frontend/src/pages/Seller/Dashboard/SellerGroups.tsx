import * as React from "react"
import { Group } from "../../../components/shared/types/Group";
import GroupItem from "./GroupItem";
import { PLACEHOLDER_GROUPS } from "../../../constants/placeholder-data";

const SellerGroups: React.FC<{}> = (props) => {
    const [groups, setGroups] = React.useState<Group[]>(PLACEHOLDER_GROUPS);
    // TODO: Fetch groups from our API

    return (
        <div className="subcontent" style={ {display: 'flex', flexDirection: 'row',flexFlow: 'wrap'}}>
            <h3 className="header">My Groups</h3>
            {/* TODO: Let the user CREATE new groups */}
            {/* TODO: Make it look like the Figma  */}
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