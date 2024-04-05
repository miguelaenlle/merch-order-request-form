import "./GroupItem.css"
import * as React from "react"
import { Group } from "../../../components/shared/types/Group";
const GroupItem: React.FC<{
    group: Group;
}> = (props) => {

    // TODO: Improve the UI of this component

    return (
        <div className={"groupItem"}>
            <p>{props.group.name}</p>
            <p>4 products</p>
            <p> 42 Sales</p>
        </div>
    );
}
export default GroupItem