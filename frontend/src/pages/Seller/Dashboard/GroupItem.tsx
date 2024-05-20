import "./GroupItem.css"
import * as React from "react"
import { Group } from "../../../components/shared/types/Group";
import { IconButton } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import EditGroup from "./EditGroup";
const GroupItem: React.FC<{
    group: Group;
    retrieveGroups: () => void;
}> = (props) => {
    const [editing, setEditing] = React.useState(false);

    return (
        <>

            <div className={"groupItem"}>
                <p className="name">{props.group.name}</p>
                <div className="buttons">
                    <IconButton
                        icon={<EditIcon />}
                        aria-label="Edit"
                        variant="unstyled"
                        p={0}
                        size={"sm"}
                        onClick={() => {
                            setEditing(true);
                        }}
                    />
                </div>
            </div>
            <EditGroup
                group={props.group}
                isOpen={editing}
                retrieveGroups={props.retrieveGroups}
                onClose={() => {
                    setEditing(false);
                }}
            />
        </>
    );
}
export default GroupItem