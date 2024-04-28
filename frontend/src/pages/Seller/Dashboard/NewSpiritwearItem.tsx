
import * as React from "react";
import CustomModal from "../../../components/shared/CustomModal";
import { Input, Select, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import {useAPIHook} from "../../../components/shared/hooks/use-api-hook.ts";


const NewSpiritwearItem: React.FC<{}> = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');

    const apiHook = useAPIHook();

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
        try{
            const sellerToken = await apiHook.generateSellerToken();
            const response = await apiHook.post(
                `http://localhost:3000/api/items`,
                {
                    name: name,
                    description: description,
                    pickupLocation: location,
                    pickupTime: time,
                    price: 100
                },
                sellerToken
            );
        }catch (error){
            console.error('Error creating spiritwear item:', error)
        }
    }

    return (
        <div>
            <CustomModal

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
                            style={{marginTop: "5px", height: "80px", width: "100%", border: "1px solid #ccc"}}
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

                        <div style={{ marginTop: "20px" }}><strong>Group</strong></div>

                        <div style={{ marginTop: "5px", width: "60%" }}>
                            <Select>
                                <option value='option1'>Hersey Hack Club</option>
                            </Select>
                        </div>

                        <div style={{ marginTop: "20px" }}><strong>Inventory</strong></div>

                        <div>
                            <table className="my-table">
                                <thead>
                                <tr style={{border: '1px solid #ccc', fontWeight: 'bold', textAlign: 'left'}}>
                                    <th style={{}}>Size</th>
                                    <th style={{}}>Amount</th>
                                    <th style={{}}>Price</th>
                                </tr>
                                </thead>
                                <tbody>
                                {rows.map((row, index) => (
                                    <tr
                                        style={{border: '1px solid #ccc'}}
                                        key={index}
                                    >
                                        <td>{row.size}</td>
                                        <td>
                                            <input
                                                style={{width: "120px"}}
                                                type="number"
                                                value={row.amount}
                                                onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
                                                placeholder="# of items"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                style={{width: "120px"}}
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

                    </div>
                }

                closeText="Cancel"
                actionText="Create Item"
                onAction={handleCreateSpiritwearItem}
            />
        </div>
    );
}
export default NewSpiritwearItem