
import * as React from "react";
import CustomModal from "../../../components/shared/CustomModal";
import { Input, Select, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { useAPIHook } from "../../../components/shared/hooks/use-api-hook.ts";
import { AuthContext } from "../../../components/shared/context/AuthContext.tsx";
import { Group } from "../../../components/shared/types/Group.ts";
import LoadError from "../../../components/shared/LoadError.tsx";
import { Item } from "../../../types/Item.ts";
import axios from "axios";


const NewSpiritwearItem: React.FC<{
    retrieveSpiritwearItems: () => void;
}> = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');
    const [groupId, setGroupId] = useState(''); // [1

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);


    const apiHook = useAPIHook();
    const authContext = React.useContext(AuthContext);

    const [error, setError] = React.useState<string | undefined>();
    const [loading, setLoading] = React.useState(false);
    const [groups, setGroups] = useState<Group[] | undefined>(undefined);


    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }
    };


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
                setGroupId(response[0]._id)

            } catch {
                setError("Failed to retrieve groups")
            }
        }
        setLoading(false);
    }

    React.useEffect(() => {
        retrieveGroups();
    }, [authContext?.token])


    const [rows, setRows] = useState([
        { size: 'XXS', amount: '', price: '' },
        { size: 'XS', amount: '', price: '' },
        { size: 'S', amount: '', price: '' },
        { size: 'M', amount: '', price: '' },
        { size: 'L', amount: '', price: '' },
        { size: 'XL', amount: '', price: '' },
        { size: 'XXL', amount: '', price: '' }
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

    const handleInputChange = (index, field, value) => {
        const updatedRows = rows.map((row, idx) => {
            if (idx === index) {
                return { ...row, [field]: value };
            }
            return row;
        });
        setRows(updatedRows);
    };


    const handleCreateSpiritwearItem = async () => {
        setLoading(true);
        setError(undefined);
        if (!authContext?.token) {
            setError("Not authenticated")
            setLoading(false);
            return;
        }
        if (!selectedFile) {
            setError("Image is required")
            setLoading(false);
            return;
        }
        try {
            const inventoryItemData = rows.reduce((acc: any, row) => {
                if (row.amount && row.price) {
                    return {
                        ...acc,
                        [row.size]: {
                            amount: row.amount,
                            price: row.price
                        }
                    }
                }
                return acc;
            }, {} as { [key: string]: { amount: number, price: number } })

            console.log("Create post...")

            const response = await apiHook.post(
                `http://localhost:3000/api/items`,
                {
                    name: name,
                    description: description,
                    pickupLocation: location,
                    pickupTime: time,
                    groupId: groupId,
                    inventoryItemData
                },
                authContext?.token
            );

            const item = response.item as Item;

            const formData = new FormData();
            formData.append('image', selectedFile);

            await axios.postForm(`http://localhost:3000/api/items/${item._id}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${authContext.token}`
                }
            });

            props.retrieveSpiritwearItems();
            onClose();
        } catch (error: any) {
            if (error.response.data.message) {
                setError(error.response.data.message)
            } else {
                setError("Failed to create spiritwear item")
            }
            console.error('Error creating spiritwear item:', error)
        }
        setLoading(false);
    }

    return (
        <div>
            <CustomModal
                isOpen={isOpen}
                buttonText="Create Spiritwear Item"
                content={

                    <div>

                        <div style={{ fontSize: "25px", marginTop: "20px" }}>
                            <strong>New Spiritwear Item</strong>
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

                        <div style={{ marginTop: "20px" }}><strong>Image</strong></div>

                        <input type="file" onChange={handleFileChange} />

                        <div style={{ marginTop: "20px" }}><strong>Group</strong></div>

                        <div style={{ marginTop: "5px", width: "60%" }}>
                            {groups && (
                                <Select
                                    value={groupId}
                                    onChange={(event) => {
                                        setGroupId(event.target.value)
                                    }}>
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
                                        <th style={{}}>Size</th>
                                        <th style={{}}>Amount</th>
                                        <th style={{}}>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row, index) => (
                                        <tr
                                            style={{ border: '1px solid #ccc' }}
                                            key={index}
                                        >
                                            <td>{row.size}</td>
                                            <td>
                                                <input
                                                    style={{ width: "120px" }}
                                                    type="number"
                                                    value={row.amount}
                                                    onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
                                                    placeholder="# of items"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    style={{ width: "120px" }}
                                                    type="number"
                                                    value={row.price}
                                                    onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                                                    placeholder="Price"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>

                        <p style={{ fontSize: "small", marginTop: "10px", fontStyle: "italic" }}>Inventory will auto-update as you sell items.</p>
                        <LoadError
                            error={error}
                            loading={loading}
                        />
                    </div>
                }

                closeText="Cancel"
                actionText="Create Item"
                onOpen={onOpen}
                onClose={onClose}
                onAction={handleCreateSpiritwearItem}
            />
        </div>
    );
}
export default NewSpiritwearItem