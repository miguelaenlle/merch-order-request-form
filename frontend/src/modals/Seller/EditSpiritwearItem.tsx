import * as React from "react"
import CustomModal from "../../components/shared/CustomModal";
import { useState, useContext } from "react";
import { Input, Select, Textarea, Button, Icon } from "@chakra-ui/react";
import { AiOutlineClose } from 'react-icons/ai';
import { BsChevronRight } from 'react-icons/bs';
import { useLoadErrorHook } from "../../components/shared/hooks/use-load-error-hook";
import { AuthContext } from "../../components/shared/context/AuthContext";
import { useAPIHook } from "../../components/shared/hooks/use-api-hook";
import { Item } from "../../types/Item";
import { Group } from "../../components/shared/types/Group";
import LoadError from "../../components/shared/LoadError";
import { InventoryItem } from "../../types/InventoryItem";
import axios from "axios";

const EditSpiritwearItem: React.FC<{
    item: Item;
    isOpen: boolean;

    onClose: () => void;
}> = (props) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');
    const [groupId, setGroupId] = useState('');

    React.useEffect(() => {
        setName(props.item.name);
        setDescription(props.item.description);
        setLocation(props.item.pickupLocation);
        setTime(props.item.pickupTime);
        setGroupId(props.item.groupId);
    }, [props.item._id, props.isOpen])


    const apiHook = useAPIHook();
    const authContext = useContext(AuthContext)
    const loadErrorHook = useLoadErrorHook();


    const [groups, setGroups] = useState<Group[] | undefined>(undefined);
    const [inventoryItems, setInventoryItems] = useState<InventoryItem[] | undefined>();

    const retrieveGroups = async () => {
        loadErrorHook.handleStartLoading();
        if (authContext?.token) {
            try {
                const response = await apiHook.get(
                    `http://localhost:3000/api/groups/`,
                    authContext?.token
                );
                console.log(response)
                setGroups(response)
                loadErrorHook.handleStopLoading();
            } catch {
                loadErrorHook.handleError("An error occurred");
            }
        }
    }

    React.useEffect(() => {
        retrieveGroups();
    }, [])



    const [rows, setRows] = useState<InventoryItem[]>([
        // { size: 'XXS', amount: '', price: '', change: '' },
        // { size: 'XS', amount: '', price: '', change: '' },
        // { size: 'S', amount: '', price: '', change: '' },
        // { size: 'M', amount: '', price: '', change: '' },
        // { size: 'L', amount: '', price: '', change: '' },
        // { size: 'XL', amount: '', price: '', change: '' },
        // { size: 'XXL', amount: '', price: '', change: '' }
    ]);

    const nameEntered: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const descriptionEntered: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const locationEntered: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(event.target.value);
    };


    const timeEntered: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTime(event.target.value);
    };

    const handleInputChange = (index: any, field: any, value: any) => {
        const updatedRows = rows.map((row, idx) => {
            if (idx === index) {
                return { ...row, [field]: value };
            }
            return row;
        });
        setRows(updatedRows);
    };

    const handleLoadInventoryItems = async () => {
        loadErrorHook.handleStartLoading();
        try {
            if (!authContext?.token) {
                loadErrorHook.handleError("You are not authenticated");
                return;
            }
            const response = await apiHook.get(
                `http://localhost:3000/api/inventory-items?itemId=${props.item._id}`,
                authContext?.token
            );


            console.log("Inventory Items", response);

            setRows(response.inventoryItems.map((response: InventoryItem) => ({
                ...response,
                change: response.amount
            })));
            loadErrorHook.handleStopLoading();
        } catch (error) {
            console.error(error);
            loadErrorHook.handleError("An error occurred");
        }
    }

    React.useEffect(() => {
        handleLoadInventoryItems();
    }, [props.item._id, authContext?.token, props.isOpen])

    const handleSave = async () => {
        loadErrorHook.handleStartLoading();
        if (!authContext?.token) {
            loadErrorHook.handleError("You are not authenticated");
            return;
        }
        try {
            const response = await apiHook.put(
                `http://localhost:3000/api/items/${props.item._id}`,
                {
                    newName: name,
                    newDescription: description,
                    newPickupLocation: location,
                    newPickupTime: time,
                    groupId
                },
                authContext?.token
            );

            const response2 = await apiHook.patch(
                `http://localhost:3000/api/inventory-items?itemId=${props.item._id}`,
                {
                    updatedInventoryItems: rows.map(row => ({
                        inventoryItemId: row._id,
                        changeInInventory: row.change,
                        newPrice: row.price
                    }))
                }
            )

            if (selectedFile) {
                const formData = new FormData();
                formData.append('image', selectedFile);

                await axios.postForm(`http://localhost:3000/api/items/${props.item._id}/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "Authorization": `Bearer ${authContext.token}`
                    }
                });
            }

            // Reset inputs
            setName('');
            setDescription('');
            setLocation('');
            setTime('');

            setRows([]);

            loadErrorHook.handleStopLoading();
            props.onClose();
        } catch (error: any) {

            console.error("error", error);

            try {
                loadErrorHook.handleError(error.response.data.message);
            } catch {
                loadErrorHook.handleError("An error occurred");
            }
        }
    }


    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUploadFile = async () => {
        loadErrorHook.handleStartLoading();
        if (!selectedFile) {
            loadErrorHook.handleError("Image is required")
            return;
        }
        if (!authContext) {
            loadErrorHook.handleError("You are not authenticated");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('image', selectedFile);

            await axios.postForm(`http://localhost:3000/api/items/${props.item._id}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${authContext.token}`
                }
            });
        } catch {
            loadErrorHook.handleError("An error occurred");
        }
        loadErrorHook.handleStopLoading();

    }



    return (
        <div>

            <CustomModal
                buttonText="Edit Spiritwear Item"
                isOpen={props.isOpen}
                onClose={props.onClose}
                transparentButton
                content={<div>

                    <div style={{ fontSize: "25px", marginTop: "20px" }}>
                        <strong>Edit Spiritwear Item</strong>
                    </div>

                    <Input
                        padding='8px'
                        marginTop='10px'
                        height='23px'
                        placeholder='Name'
                        value={name}
                        onChange={nameEntered}
                    />

                    <Textarea
                        style={{ marginTop: "5px", height: "80px", width: "100%", border: "1px solid #ccc" }}
                        placeholder='Description'
                        value={description}
                        onChange={descriptionEntered}
                    />

                    <div>
                        <Input
                            padding='8px'
                            marginTop="5px"
                            width="50%"
                            height="23px"
                            placeholder="Pickup Location"
                            value={location}
                            onChange={locationEntered}
                        />

                        <Input
                            padding='8px'
                            marginTop="5px"
                            width="50%"
                            height="23px"
                            placeholder="Pickup Time"
                            value={time}
                            onChange={timeEntered}
                        />
                    </div>
                    <div style={{ marginTop: "20px" }}><strong>New Image</strong></div>
                    <input type="file" onChange={handleFileChange} />

                    <div style={{ marginTop: "20px" }}><strong>Group</strong></div>

                    <div style={{ marginTop: "5px", width: "60%" }}>
                        {groups && (
                            <Select
                                placeholder="Select group"
                                value={groupId}
                                onChange={(e) => setGroupId(e.target.value)}
                            >
                                {groups.map((group) => (
                                    <option value={group._id}>{group.name}</option>
                                ))}
                            </Select>
                        )}
                    </div>

                    <div style={{ marginTop: "20px" }}><strong>Inventory</strong></div>

                    <div>
                        <table className="my-table">
                            <thead>
                                <tr style={{ border: '1px solid #ccc', fontWeight: 'bold', textAlign: 'left' }}>
                                    <th>Size</th>
                                    <th>Current #</th>
                                    <th className="inventory">Updated #</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, index) => (
                                    <tr
                                        style={{ border: '1px solid #ccc' }}
                                        key={index}
                                    >
                                        <td>{row.size}</td>
                                        <td>{row.amount || 0}</td>
                                        <td>
                                            <input
                                                style={{ width: "120px" }}
                                                type="number"
                                                value={row.change}
                                                onChange={(e) => {

                                                    console.log("Value", e.target.value, typeof (e.target.value));

                                                    handleInputChange(index, 'change', parseInt(e.target.value))
                                                }}
                                                placeholder={0}
                                            />
                                        </td>
                                        {/* <td>{row.amount + (row.change || 0)}</td> */}
                                        <td>
                                            <input
                                                style={{ width: "120px" }}
                                                type="number"
                                                value={row.price}
                                                onChange={(e) => handleInputChange(index, 'price', parseInt(e.target.value))}
                                                placeholder="Price"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* <p style={{ fontSize: "small", marginTop: "10px", fontStyle: "italic" }}>Inventory will */}
                    {/* auto-update as you sell items.</p> */}

                    <div style={{ marginTop: "40px", marginBottom: "20px" }}>
                        <Button onClick={props.onClose} color="blue.400" variant="unstyled" leftIcon={<Icon as={AiOutlineClose} />}>Cancel</Button>
                        <Button onClick={handleSave} colorScheme='blue' style={{ marginLeft: "160px" }} rightIcon={<Icon as={BsChevronRight} />}>Save Changes</Button>
                    </div>

                    <LoadError
                        error={loadErrorHook.error}
                        loading={loadErrorHook.loading}
                    />
                </div>}
                closeText="Cancel"
                actionText="Create Item"
                onAction={() => {
                }}
                disableDefaultButtons
            />
        </div>
    );
}
export default EditSpiritwearItem